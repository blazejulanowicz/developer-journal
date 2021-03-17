const React = require('react');
const client = require('../client');
const {FontAwesomeIcon} = require('@fortawesome/react-fontawesome');
const {faPlus} = require('@fortawesome/free-solid-svg-icons');

class EntryDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleProjectChange = this.handleProjectChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.projectRef = React.createRef();
        this.contentRef = React.createRef();
        this.iconRef = React.createRef();

        this.state = {
            isExpanded: false,
            commitSHAInput: false,
            selectedProject: {},
        }
    }

    getCurrentDate() {
        let currentDate = new Date();
        let month = currentDate.getMonth() < 9 ? '0'+(currentDate.getMonth()+1) : currentDate.getMonth()+1;
        let day = currentDate.getDate() < 10 ? '0'+currentDate.getDate() : currentDate.getDate();
        let hours = currentDate.getHours() < 10 ? '0'+currentDate.getHours() : currentDate.getHours();
        let minutes = currentDate.getMinutes() < 10 ? '0'+currentDate.getMinutes() : currentDate.getMinutes();
        let seconds = currentDate.getSeconds() < 10 ? '0'+currentDate.getSeconds() : currentDate.getSeconds();
        return currentDate.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }

    handleSubmit(event) {
        event.preventDefault();
        const newEntry = {};

        newEntry['content'] = this.contentRef.current.value.trim();
        newEntry['timestamp'] = this.getCurrentDate();
        newEntry['project'] = this.projectRef.current.value;

        //TODO: THIS IS ONLY TEMPORARY, MAKE SOMEKIND OF ALERT
        if(newEntry['content'] === '' || newEntry['project'] === '')
            return;

        this.props.onCreate(newEntry);
        this.contentRef.current.value = '';
        this.iconRef.current.click();
    }

    handleExpand(event) {
        event.preventDefault();
        event.currentTarget.childNodes[0].classList.toggle('rotate');
        let mainDiv = event.currentTarget.parentNode;
        mainDiv.classList.toggle('new-entry-nexpanded');
        this.setState({...this.state, isExpanded: !this.state.isExpanded})
    }

    handleProjectChange(event) {
        let selectedProject = this.props.projects.find(project => project.entity._links.self.href === event.currentTarget.value);

        if(selectedProject.githubRepoName !== null)
            this.setState({commitSHAInput: true, selectedProject: selectedProject});
        else
            this.setState({commitSHAInput: false});
    }

    handleBlur(event) {
        event.preventDefault();
        let currentTarget= event.currentTarget;
        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement) && this.state.isExpanded) {
                this.iconRef.current.click();
            }},0);
    }

    render() {
        return (
            <div onBlur={this.handleBlur} id="createEntry" className="entry new-entry-nexpanded">
                    <div ref={this.iconRef} onClick={this.handleExpand}><FontAwesomeIcon className='expand-icon' icon={faPlus}/></div>
                    <div className='animated'>
                        <h1>Create new entry</h1>
                        <form id='new-entry-form'>
                            <textarea placeholder='Enter content...' ref={this.contentRef} className="input-field"/>
                            <div className="additional-options">
                                <select defaultValue={'DISABLED'} onChange={this.handleProjectChange} id='project-dropdown' className='dropdown' ref={this.projectRef}>
                                    <option value={'DISABLED'} disabled>Choose project...</option>
                                    {this.props.projects.map(project => <option key={project.entity._links.self.href} value={project.entity._links.self.href}>{project.entity.name}</option>)}
                                </select>
                            </div>
                            <button className='button submit-button' onClick={(event) => {
                                event.preventDefault();
                                this.iconRef.current.click();
                            }}>CANCEL</button>
                            <button className='button submit-button' onClick={this.handleSubmit}>SUBMIT</button>
                        </form>
                    </div>
            </div>
        )
    }
}

module.exports = EntryDialog;
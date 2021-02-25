const React = require('react')

class EntryDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formRefs = []
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

        newEntry['content'] = this.formRefs['content'].current.value.trim();
        newEntry['timestamp'] = this.getCurrentDate();
        newEntry['project'] = this.formRefs['project'].current.value;

        //TODO: THIS IS ONLY TEMPORARY, MAKE SOMEKIND OF ALERT
        if(newEntry['content'] === '' || newEntry['project'] === '')
            return;

        this.props.onCreate(newEntry);
        this.formRefs['content'].current.value = '';
    }

    render() {
        this.formRefs['content'] = React.createRef();
        this.formRefs['project'] = React.createRef();

        return (
            <div id="createEntry" className="entry">
                <div>
                    <h2>Create new entry</h2>
                    <form id='new-entry-form'>
                        <input type="text" placeholder='content' ref={this.formRefs['content']} className="entry-input-field"/>
                        <label htmlFor='project-dropdown'>Project: </label>
                        <select id='project-dropdown' ref={this.formRefs['project']}>
                            {this.props.projects.map(project => <option key={project.entity._links.self.href} value={project.entity._links.self.href}>{project.entity.name}</option>)}
                        </select>
                        <button onClick={this.handleSubmit}>ADD</button>
                    </form>
                </div>
            </div>
        )
    }
}

module.exports = EntryDialog;
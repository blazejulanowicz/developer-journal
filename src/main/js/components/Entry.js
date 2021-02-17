const React = require('react');
const client = require('../client');

class Entry extends React.Component {

    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
        console.log(props);
        this.state = {
            user: {},
            project: {}
        }
    }

    handleDelete(event) {
        this.props.onDelete(this.props.entry)
    }

    componentDidMount() {
        this.loadAdditionalInfo().catch(error => console.error(error))
    }

    async loadAdditionalInfo() {
        let user = client({
            method: 'GET',
            path: this.props.entry._links.user.href
        });

        let project = client({
            method: 'GET',
            path: this.props.entry._links.project.href
        });

       [user, project] = await Promise.all([user, project]);
        console.log(user);
        console.log(project);

        this.setState({
           user: user.entity,
           project: project.entity
        });
    }

    render() {
        return (
            <div className='entry'>
                <div className='info'>
                    <div className='left-info'>
                        <h2 className='username'>{this.state.user.login}</h2>
                    </div>
                    <div className='right-info'>
                        <h4 className='project-name'>{this.state.project.name}</h4>
                        <h4 className='timestamp'>{this.props.entry.timestamp}</h4>
                    </div>
                </div>
                <div className='contentbox'>
                    <p>{this.props.entry.content}</p>
                </div>
                <button className='button' onClick={this.handleDelete}>DELETE</button>
            </div>
        )
    }
}

module.exports = Entry;
const React = require('react');

class Entry extends React.Component {

    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(event) {
        this.props.onDelete(this.props.entry.entity)
    }

    render() {
        return (
            <div className='entry'>
                <div className='info'>
                    <div className='left-info'>
                        <h2 className='username'>{this.props.entry.entity.user.login}</h2>
                    </div>
                    <div className='right-info'>
                        <h4 className='project-name'>{this.props.entry.entity.project.name}</h4>
                        <h4 className='timestamp'>{this.props.entry.entity.timestamp}</h4>
                    </div>
                </div>
                <div className='contentbox'>
                    <p>{this.props.entry.entity.content}</p>
                </div>
                <button className='button' onClick={this.handleDelete}>DELETE</button>
            </div>
        )
    }
}

module.exports = Entry;
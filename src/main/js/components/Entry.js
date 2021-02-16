const React = require('react')

class Entry extends React.Component {

    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(event) {
        this.props.onDelete(this.props.entry)
    }

    render() {
        return (
            <div className='entry'>
                <div className='info'>
                    <div className='left-info'>
                        <span className='username'>USERNAME</span>
                    </div>
                    <div className='right-info'>
                        <div className='project-name'>PROJECT NAME</div>
                        <div className='timestamp'>{this.props.entry.timestamp}</div>
                    </div>
                </div>
                <div className='contentbox'>
                    <p>{this.props.entry.content}</p>
                </div>
                <button onClick={this.handleDelete}>DELETE</button>
            </div>
        )
    }
}

module.exports = Entry;
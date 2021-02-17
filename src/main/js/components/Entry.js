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
                        <h2 className='username'>USERNAME</h2>
                    </div>
                    <div className='right-info'>
                        <h4 className='project-name'>PROJECT NAME</h4>
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
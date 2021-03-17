const React = require('react');
const {CSSTransition} = require('react-transition-group');

class Entry extends React.Component {

    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
        this.entryRef = null;
        this.state = {
            isMounted: false
        }
    }

    handleDelete(event) {
        this.props.onDelete(this.props.entry.entity)
    }

    componentDidMount() {
        this.state.isMounted = true;
    }

    componentWillUnmount() {

    }

    render() {

        this.entryRef = React.createRef();

        return (
                <div ref={this.entryRef}>
                    <div className='info'>
                        <div className='left-info'>
                            <h2 className='username'>{this.props.entry.entity.user.username}</h2>
                        </div>
                        <div className='right-info'>
                            <h4 className='entry-project-name'>{this.props.entry.entity.project.name}</h4>
                            <h4 className='timestamp'>{this.props.entry.entity.timestamp}</h4>
                        </div>
                    </div>
                    <div className='text-content'>
                        <p>{this.props.entry.entity.content}</p>
                    </div>
                    <button className='button' onClick={this.handleDelete}>DELETE</button>
                </div>
        )
    }
}

module.exports = Entry;
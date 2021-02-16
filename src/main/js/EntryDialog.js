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
        newEntry['user'] = 'http://localhost:8080/api/users/0';
        newEntry['project'] = 'http://localhost:8080/api/project/0'

        this.props.onCreate(newEntry);
        this.formRefs['content'].current.value = '';
    }

    render() {
        this.formRefs['content'] = React.createRef();

        return (
            <div>
                <a href="#createEntry">Create new entry</a>
                <div id="createEntry" className="modal dialog">
                    <div>
                        <a href="#" title="Close">X</a>

                        <h2>Create new entry</h2>

                        <form>
                            <p>
                                <input type="text" placeholder='content' ref={this.formRefs['content']} className="entry-input-field"/>
                            </p>
                            <button onClick={this.handleSubmit}>ADD</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = EntryDialog;
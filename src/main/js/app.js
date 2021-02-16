const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const regeneratorRuntime = require("regenerator-runtime");
const EntryList = require('./components/EntryList');
const follow = require('./api/follow')

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {entries: []};
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }

    async loadFromServer(pageSize) {
        const root = '/api';

        const entryCollection = await follow(client, root)
    }

    render() {
        return (
            <EntryList entries={this.state.entries}/>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)
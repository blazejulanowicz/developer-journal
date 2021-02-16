const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const regeneratorRuntime = require("regenerator-runtime");
const EntryList = require('./components/EntryList');
const follow = require('./api/follow')
const EntryDialog = require('./EntryDialog')

const root = '/api';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {entries: [], attributes: [], pageSize: 2, links: []};
    }

    async componentDidMount() {
        await this.loadFromServer(this.state.pageSize);
    }

    async loadFromServer(pageSize) {

        const entryCollection = await follow(
                client,
                root,
                [{rel: 'entries', params: {size: pageSize}}]);
        console.log(entryCollection);
        const entrySchema = await client({
                method: 'GET',
                path: entryCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}});

        this.setState({
            entries: entryCollection.entity._embedded.entries,
            attributes: Object.keys(entrySchema.entity.properties),
            pageSize: pageSize,
            links: entryCollection.entity._links
        });
    }

    async onCreate(newEntry) {
        const entriesCollection = await follow(client, root, ['entries']);
        console.log(newEntry)
        await client({
            method: 'POST',
            path: entriesCollection.entity._links.self.href,
            entity: newEntry,
            headers: {'Content-Type': 'application/json'}
        });

        const response = await follow(client, root, [{rel: 'entries', params: {'size': this.state.pageSize}}]);
    }

    render() {
        return (
            <div>
                <EntryDialog attributes={this.state.attributes} onCreate={this.onCreate.bind(this)}/>
                <EntryList entries={this.state.entries}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)
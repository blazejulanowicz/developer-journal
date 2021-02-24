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
        this.state = {entries: [], pageSize: 2, links: []};
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize).catch(error => console.log(error));
    }

    async loadFromServer(pageSize) {

        let entryCollection = await follow(
                client,
                root,
                [{rel: 'entries', params: {size: pageSize, sort: 'timestamp,desc'}}]);

        this.links = entryCollection.entity._links;

        entryCollection = await Promise.all(entryCollection.entity._embedded.entries.map(entry =>
            client({
                method: 'GET',
                path: entry._links.self.href,
                params: {projection: 'fullDetails'}
            })
        ));

        this.setState({
            entries: entryCollection,
            pageSize: pageSize,
            links: this.links
        });
    }

    async onNavigate(naviUri) {
        let entryCollection = await client({
            method: 'GET',
            path: naviUri
        });

        this.setState({
            entries: entryCollection.entity._embedded.entries,
            pageSize: this.state.pageSize,
            links: entryCollection.entity._links
        });
    }

    async onCreate(newEntry) {
        const entriesCollection = await follow(client, root, ['entries']);
        await client({
            method: 'POST',
            path: entriesCollection.entity._links.self.href,
            entity: newEntry,
            headers: {'Content-Type': 'application/json'}
        });

        this.loadFromServer(this.state.pageSize);
    }

    onDelete(entry) {
        client({
            method: 'DELETE',
            path: entry._links.self.href
        })
            .done(response => this.loadFromServer(this.state.pageSize))
    }

    render() {
        return (
            <div>
                <div className='top-bar'></div>
                <div className='content'>
                    <EntryDialog onCreate={this.onCreate.bind(this)}/>
                    <EntryList entries={this.state.entries} onDelete={this.onDelete.bind(this)} loadMore={() => this.loadFromServer(this.state.pageSize + 2)}/>
                </div>
                <div className='sidebar'>
                    <h1>Developer journal</h1>
                    <ProjectList />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)
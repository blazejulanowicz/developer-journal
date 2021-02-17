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

    componentDidMount() {
        this.loadFromServer(this.state.pageSize).catch(error => console.log(error));
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

    async onNavigate(naviUri) {
        let entryCollection = await client({
            method: 'GET',
            path: naviUri
        });

        this.setState({
            entries: entryCollection.entity._embedded.entries,
            attributes: this.state.attributes,
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

        const response = await follow(client, root, [{rel: 'entries', params: {'size': this.state.pageSize}}]);

        if(typeof response.entity._links.last !== 'undefined')
            await this.onNavigate(response.entity._links.last.href);
        else
            await this.onNavigate(response.entity._links.self.href);
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
                    <EntryDialog attributes={this.state.attributes} onCreate={this.onCreate.bind(this)}/>
                    <EntryList entries={this.state.entries} onDelete={this.onDelete.bind(this)}/>
                </div>
                <div className='sidebar'><h1>Developer journal</h1></div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)
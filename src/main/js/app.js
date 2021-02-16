const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const regeneratorRuntime = require("regenerator-runtime");
const EntryList = require('./components/EntryList');
const follow = require('./api/follow')

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
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const regeneratorRuntime = require("regenerator-runtime");

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {entries: []};
    }

    async componentDidMount() {
        let response = await client({method: 'GET', path: '/api/entries'});
        this.setState({entries: response.entity._embedded.entries});
        console.log(this.state.entries)
    }

    render() {
        return (
            <div>SIEMANO KOLANO</div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)
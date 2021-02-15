const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');
const regeneratorRuntime = require("regenerator-runtime");

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    async componentDidMount() {
        const response = await axios.get("http://localhost:8080/api/entries");
        console.log(response.data);
        this.setState({users: response.data._embedded.users});
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
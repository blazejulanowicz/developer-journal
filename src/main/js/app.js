const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    async componentDidMount() {
        const response = await axios.get("http://localhost:8080/api/users");
        console.log(response.data);
    }
}
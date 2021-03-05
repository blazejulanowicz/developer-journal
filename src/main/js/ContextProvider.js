const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./App');
const Settings = require('./Settings');
const {BrowserRouter, Switch, Route} = require('react-router-dom');
const Navbar = require('./components/Navbar')

const ContextProvider = () => {


    return (
      <BrowserRouter>
          <Navbar/>
          <Switch>
              <Route path="/" exact component={App}/>
              <Route path="/settings" component={Settings}/>
          </Switch>
      </BrowserRouter>
    );

}

ReactDOM.render(
    <React.StrictMode>
        <ContextProvider />
    </React.StrictMode>,
    document.getElementById('react')
);
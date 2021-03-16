const {Link} = require('react-router-dom');
const React = require('react');
const UserPanel = require('./UserPanel');
const client = require('../client');

const Navbar = () => {

    const [userDetails, setUserDetails] = React.useState("");
    const root = '/api/';

    React.useEffect(() => {
        loadUserDetails()
            .catch(error => console.log(error));
    },[])

    const loadUserDetails = async () => {
        let userDetails = await client({
            method: 'GET',
            path: root + 'user'
        });

        setUserDetails(userDetails.entity);
    }

    const onLogout = async () => {
        await client({
            method: 'POST',
            path: '/logout'
        });
        window.location.reload(false);
    }

    return (
        <div className='nav'>
            <Link to='/'><h1 className="logo">Developer journal</h1></Link>
            <UserPanel loggedUser={userDetails} onLogout={onLogout}/>
        </div>
    )
}

module.exports = Navbar;
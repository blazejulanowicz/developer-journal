const React = require('react');
const client = require('./client');

const Settings = () => {

    const [userDetails, setUserDetails] = React.useState("");

    React.useEffect(() => {
        loadUserDetails()
            .catch(error => console.log(error));
    },[])

    const loadUserDetails = async () => {
        let userDetails = await client({
            method: 'GET',
            path: '/user/logDetails'
        });

        setUserDetails(userDetails.entity);
    }

    return (
            <div className='page-content content'>
                <h1>Settings</h1>
                <ul>
                    <li>
                        <h3>Username</h3>
                        <span>{userDetails.username}</span>
                        <span><a>Change username</a></span>
                    </li>
                </ul>
            </div>
    );
}

module.exports = Settings;
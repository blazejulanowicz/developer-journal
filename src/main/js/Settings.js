const React = require('react');
const client = require('./client');

const Settings = () => {

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

    return (
            <div className='page-content settings-content'>
                <h1>Settings</h1>
                <ul className='settings-list'>
                    <li className='settings-element'>
                        <h3 className='setting-name'><strong>Username</strong></h3>
                        <span className='setting-change'><a>Edit</a></span>
                        <span className='setting-value'>{userDetails.username}</span>
                    </li>
                </ul>
            </div>
    );
}

module.exports = Settings;
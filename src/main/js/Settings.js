const React = require('react');
const client = require('./client');
const ModalDialog = require('./components/ModalDialog');

const Settings = () => {

    const [userDetails, setUserDetails] = React.useState("");
    const [dialogProps, setDialogProps] = React.useState({
        dialogName: '',
        inputOptions: [],
        onSubmit: null,
        isVisible: false
    });
    const root = '/api/user';

    React.useEffect(() => {
        loadUserDetails()
            .catch(error => console.log(error));
    },[])

    const loadUserDetails = async () => {
        let userDetails = await client({
            method: 'GET',
            path: root
        });

        setUserDetails(userDetails.entity);
    }

    const handleUsernameChange = (event) => {
        let dialogInfo = {
            dialogName: 'Edit username',
            inputOptions: [{
                placeholder: 'New username',
                type: 'text'
            }],
            onSubmit: (newUsername) => updateUserDetails({username: newUsername}),
            isVisible: true
        };

        setDialogProps(dialogInfo);
    }

    const updateUserDetails = async (userDetails) => {
        let response = await client({
            method: 'PATCH',
            path: root,
            entity: userDetails
        });
        console.debug(response);
        loadUserDetails().catch(error => console.log(error));
    }

    return (
            <div className='page-content settings-content'>
                <h1>Settings</h1>
                <ul className='settings-list'>
                    <li className='settings-element'>
                        <h3 className='setting-name'><strong>Username</strong></h3>
                        <span className='setting-change'><a onClick={handleUsernameChange}>Edit</a></span>
                        <span className='setting-value'>{userDetails.username}</span>
                    </li>
                    <li className='settings-element'>
                        <h3 className='setting-name'><strong>Password</strong></h3>
                        <span className='setting-change'><a>Edit</a></span>
                        <span className='setting-value'>••••••••••</span>
                    </li>
                    <li className='settings-element'>
                        <h3 className='setting-name'><strong>Github Access Token</strong></h3>
                        <span className='setting-change'><a>Edit</a></span>
                        <span className='setting-value'>{userDetails.githubAccessToken ? userDetails.githubAccessToken : <i>Github account not connected</i>}</span>
                    </li>
                </ul>
                <ModalDialog dialogName={dialogProps.dialogName} inputOptions={dialogProps.inputOptions} onSubmit={dialogProps.onSubmit} isVisible={dialogProps.isVisible}/>
            </div>
    );
}

module.exports = Settings;
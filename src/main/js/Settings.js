const React = require('react');
const client = require('./client');
const ModalDialog = require('./components/ModalDialog');

const Settings = () => {

    const [userDetails, setUserDetails] = React.useState("");
    const [githubUsername, setGithubUsername] = React.useState("");
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
    },[]);

    const loadUserDetails = async () => {
        let userDetails = await client({
            method: 'GET',
            path: root
        });

        setUserDetails(userDetails.entity);

        if(userDetails.entity.githubAccessToken !== null) {
            let githubUser = await client({
                method: 'GET',
                path: 'https://api.github.com/user',
                headers: {
                    'Authorization': 'token ' + userDetails.entity.githubAccessToken,
                    'Accept': 'application/json'
                }
            });
            setGithubUsername(githubUser.entity.login);
        }
    }

    const handleUsernameChange = (event) => {
        let dialogInfo = {
            dialogName: 'Change username',
            inputOptions: [{
                placeholder: 'New username',
                type: 'text'
            }],
            onSubmit: (newUsername) => {
                setDialogProps({...dialogProps, isVisible: false});
                updateUserDetails({username: newUsername[0]})
                    .then(r => window.location.reload(false));
            },
            isVisible: true
        };

        setDialogProps(dialogInfo);
    }

    const handlePasswordChange = (event) => {
        let dialogInfo = {
            dialogName: 'Change password',
            inputOptions: [{
                placeholder: 'New password',
                type: 'password'
            }],
            onSubmit: (newPassword) => {
                setDialogProps({...dialogProps, isVisible: false});
                updateUserDetails({password: newPassword[0]})
                    .then(r => window.location.reload(false));
            },
            isVisible: true
        };

        setDialogProps(dialogInfo);
    }

    const handleGATChange = (event) => {
        let dialogInfo = {
            dialogName: 'Edit Github Access Token',
            inputOptions: [{
                inputType: 'manual',
                placeholder: 'New Github Access Token',
                type: 'text'
            }],
            onSubmit: (newGAT) => {
                setDialogProps({...dialogProps, isVisible: false});
                if(newGAT[0] === '') {
                    updateUserDetails({githubAccessToken: null})
                        .catch(error => console.error(error));
                    return;
                }
                client({
                    method: 'GET',
                    path: 'https://api.github.com/user',
                    headers: {
                        'Authorization': 'token ' + newGAT
                    }
                }).then(response => {
                    updateUserDetails({githubAccessToken: newGAT[0]})
                        .catch(error => console.error(error));
                }).catch(error => {
                    //TODO: Proper user prompting
                    if(error.status.code === 401)
                        console.log('BAD TOKEN');
                })
            },
            isVisible: true
        };

        setDialogProps(dialogInfo);
    }

    const updateUserDetails = async (userDetails) => {
        let response = await client({
            method: 'PATCH',
            path: root,
            headers: {
                'Content-Type': 'application/json'
            },
            entity: userDetails
        });

        await loadUserDetails();
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
                        <span className='setting-change'><a onClick={handlePasswordChange}>Edit</a></span>
                        <span className='setting-value'>••••••••••</span>
                    </li>
                    <li className='settings-element'>
                        <h3 className='setting-name'><strong>Github Access Token</strong></h3>
                        <span className='setting-change'><a onClick={handleGATChange}>{userDetails.githubAccessToken ? 'Edit' : 'Add integration'}</a></span>
                        <span className='setting-value'>{userDetails.githubAccessToken ? githubUsername : <i>Github account not connected</i>}</span>
                    </li>
                </ul>
                <ModalDialog dialogName={dialogProps.dialogName} inputOptions={dialogProps.inputOptions} onSubmit={dialogProps.onSubmit} isVisible={dialogProps.isVisible}/>
            </div>
    );
}

module.exports = Settings;
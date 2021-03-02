const React = require('react');
const {FontAwesomeIcon} = require('@fortawesome/react-fontawesome')
const {faSignOutAlt, faCog} = require('@fortawesome/free-solid-svg-icons');

const UserPanel = ({ loggedUser, onLogout }) => {

    const onLogoutClick = (event) => {
        onLogout();
    }

    return (
        <div className="user-panel">
            <div className='min-user-panel'>
                <span className='user-panel-username'>{loggedUser.username}</span>
                <span className='user-panel-options'>
                    <span><FontAwesomeIcon icon={faCog}/></span>
                    <span onClick={onLogoutClick}><FontAwesomeIcon icon={faSignOutAlt}/></span>
                </span>
            </div>
        </div>
    );
}

module.exports = UserPanel;
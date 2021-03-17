const React = require('react');
const {FontAwesomeIcon} = require('@fortawesome/react-fontawesome')
const {faSignOutAlt, faCog} = require('@fortawesome/free-solid-svg-icons');
const {Link} = require('react-router-dom');

const UserPanel = ({ loggedUser, onLogout }) => {

    const onLogoutClick = (event) => {
        onLogout();
    }

    return (
        <div className="user-panel">
            <div className='min-user-panel'>
                <span className='user-panel-username panel-element'>{loggedUser.username}</span>
                <span className='user-panel-options'>
                    <span className='panel-element'><Link to="/settings"><FontAwesomeIcon icon={faCog}/></Link></span>
                    <span className='panel-element' onClick={onLogoutClick}><FontAwesomeIcon icon={faSignOutAlt}/></span>
                </span>
            </div>
        </div>
    );
}

module.exports = UserPanel;
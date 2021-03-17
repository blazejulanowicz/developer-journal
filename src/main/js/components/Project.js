const React = require('react');
const client = require('../client');
const {FontAwesomeIcon} = require('@fortawesome/react-fontawesome')
const {faAngleDown, faAngleUp} = require('@fortawesome/free-solid-svg-icons');

function Project({ isActive, project, onDelete, onFilterChange, onIntegrationAdd }) {

    const detailsRef = React.createRef();
    const nameRef = React.createRef();
    const [entryCount, setEntryCount] = React.useState(0);
    const [detailsOn, setDetailsOn] = React.useState(false);

    React.useEffect(() => {
        console.debug(project);
        isActive ? nameRef.current.classList.add('active') : nameRef.current.classList.remove('active');
        getEntriesCount();
    });

    const handleDetailsClick = (event) => {
        detailsRef.current.classList.toggle('hidden');
        setDetailsOn(!detailsOn);
    };

    const handleFilterClick = (event) => {
        nameRef.current.classList.toggle('active')
        onFilterChange(project);
    }

    const getEntriesCount = () => {
        client({
            method: 'GET',
            path: project.entity._links.entries.href.split('{')[0]
        }).then(response => {
            setEntryCount(response.entity._embedded.entries.length)
        }).catch(error => console.error(error))
    }

    const handleDeleteButton = () => {
        onDelete(project)
    }

    return (
        <div className='project-info'>
            <div ref={nameRef} className={'project-name'}>
                <a onClick={handleFilterClick}>{project.entity.name}</a>
                <FontAwesomeIcon className={'details-icon'} icon={detailsOn ? faAngleUp : faAngleDown} onClick={handleDetailsClick}/>
            </div>
            <div ref={detailsRef} className='detail-view hidden'>
                <p>Entries: {entryCount}</p>
                {onIntegrationAdd === null ? null : <p>Github project: {project.entity.githubRepoName != null ? project.entity.githubRepoName : <a onClick={() => onIntegrationAdd(project)}>Connect project</a>}</p>}
                <a onClick={handleDeleteButton} className='button'>DELETE PROJECT</a>
            </div>
        </div>
    );
}

module.exports = Project;
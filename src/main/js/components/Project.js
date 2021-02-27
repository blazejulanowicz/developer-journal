const React = require('react');
const client = require('../client');

function Project({ isActive, project, onDelete, onFilterChange }) {

    const detailsRef = React.createRef();
    const nameRef = React.createRef();
    const [entryCount, setEntryCount] = React.useState(0);

    React.useEffect(() => {
        isActive ? nameRef.current.classList.add('active') : nameRef.current.classList.remove('active');
        getEntriesCount();
    },[])

    const handleDetailsClick = (event) => {
        detailsRef.current.classList.toggle('hidden');
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
            console.log(response)
            setEntryCount(response.entity._embedded.entries.length)
        }).catch(error => console.log(error))
    }

    const handleDeleteButton = () => {
        onDelete(project)
    }

    return (
        <div className='project-info'>
            <div ref={nameRef} className={'project-name'}>
                <span><a onClick={handleFilterClick}>{project.entity.name}</a></span>
                <span><a onClick={handleDetailsClick}>  [+]</a></span>
            </div>
            <div ref={detailsRef} className='detail-view hidden'>
                <p>Entries: {entryCount}</p>
                <a onClick={handleDeleteButton} className='button'>DELETE PROJECT</a>
            </div>
        </div>
    );
}

module.exports = Project;
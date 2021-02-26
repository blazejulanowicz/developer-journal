const React = require('react');
const client = require('../client');

function Project({ isActive, project, onDelete, onFilterChange }) {

    const detailsRef = React.createRef();
    const nameRef = React.createRef();
    const [entryCount, setEntryCount] = React.useState(0);


    const handleDetailsClick = (event) => {
        if(detailsRef.current.style.display === 'none') {
            getEntriesCount();
            detailsRef.current.style.display = 'flex';
        }
        else
            detailsRef.current.style.display = 'none';

        onFilterChange(project)
    };

    const handleFilterClick = (event) => {
        isActive ? nameRef.current.classList.add('active') : nameRef.current.classList.remove('active');
        onFilterChange(project)
    }

    const getEntriesCount = () => {
        client({
            method: 'GET',
            path: project.entity._links.entries.href.split('{')[0]
        }).then(response => {
            setEntryCount(response.entity._embedded.entries.length)
        }).catch(error => console.log(error))
    }

    const handleDeleteButton = () => {
        onDelete(project)
    }

    return (
        <div className='project-info'>
            <a ref={nameRef} className={'project-name'} onClick={handleFilterClick}><p>{project.entity.name}</p></a>
            <a onClick={handleDetailsClick}><h4>+</h4></a>
            <div ref={detailsRef} className='detail-view'>
                <p>Entries: {entryCount}</p>
                <a onClick={handleDeleteButton} className='button'>DELETE PROJECT</a>
            </div>
        </div>
    );
}

module.exports = Project;
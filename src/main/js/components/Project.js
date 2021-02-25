const React = require('react');
const client = require('../client');

function Project({ project, onDelete }) {

    const detailsRef = React.createRef();
    const [entryCount, setEntryCount] = React.useState(0);


    const handleDetailsClick = (event) => {
        if(detailsRef.current.style.display === 'none') {
            getEntriesCount();
            detailsRef.current.style.display = 'flex';
        }
        else
            detailsRef.current.style.display = 'none';
    };

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
            <a onClick={handleDetailsClick}><p>{project.entity.name}</p></a>
            <div ref={detailsRef} className='detail-view'>
                <p>Entries: {entryCount}</p>
                <a onClick={handleDeleteButton} className='button'>DELETE PROJECT</a>
            </div>
        </div>
    );
}

module.exports = Project;
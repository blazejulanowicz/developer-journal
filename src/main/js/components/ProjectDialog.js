const React = require('react')

function ProjectDialog({onCreate}) {

    const nameRef = React.createRef();
    const dialogRef = React.createRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        let newProject = {name: nameRef.current.value};
        nameRef.current.value = '';
        dialogRef.current.style.display = 'none';
        onCreate(newProject);
    }

    const showDialog = (event) => {
        dialogRef.current.style.display = 'block';
    }

    return (
        <div className='new-project'>
            <a onClick={showDialog} className='button'>Add new project</a>
            <div ref={dialogRef} className='dialog-modal'>
                <form id='modal-dialog-form'>
                    <h4>Add new project</h4>
                    <input placeholder="Project name" type="text" ref={nameRef}/>
                    <button className='button' onClick={handleSubmit}>Add project</button>
                </form>
            </div>
        </div>
    )
}

module.exports = ProjectDialog;
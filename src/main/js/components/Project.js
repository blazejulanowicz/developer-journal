const React = require('react')

function Project({ project }) {

    return (
        <div>
            <p>{project.entity.name}</p>
        </div>
    );
}

module.exports = Project;
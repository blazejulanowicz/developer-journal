const React = require('react')

function Project({ project }) {

    return (
        <div>
            <a>{project.entity.name}</a>
        </div>
    );
}

module.exports = Project;
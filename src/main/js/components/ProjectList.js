const React = require('react')
const Project = require('./Project')

function ProjectList({ projects, onDelete }) {

    return (
        <div>
            {projects.map(project => <Project key={project.entity._links.self.href} project={project} onDelete={onDelete}/>)}
        </div>
    );
}

module.exports = ProjectList;
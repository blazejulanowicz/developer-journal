const React = require('react')
const Project = require('./Project')

function ProjectList({ projects }) {

    return (
        <div>
            {projects.map(project => <Project key={project.entity._links.self.href} project={project}/>)}
        </div>
    );
}

module.exports = ProjectList;
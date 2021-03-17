const React = require('react')
const Project = require('./Project')

function ProjectList({ projects, activeFilter, onDelete, onFilterChange, onIntegrationAdd }) {

    const isProjectInFilter = (project) => {

        for(let i = 0; i < activeFilter.length; i++) {
            if(activeFilter[i].entity._links.self.href === project.entity._links.self.href) {
                return true;
            }
        }

        return false;
    }

    return (
        <div>
            <h4 id='all-projects-topic'>All projects</h4>
            {projects.map(project => <Project key={project.entity._links.self.href} isActive={isProjectInFilter(project)} project={project} onDelete={onDelete} onFilterChange={onFilterChange} onIntegrationAdd={onIntegrationAdd}/>)}
        </div>
    );
}

module.exports = ProjectList;
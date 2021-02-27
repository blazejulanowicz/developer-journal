const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const regeneratorRuntime = require("regenerator-runtime");
const EntryList = require('./components/EntryList');
const follow = require('./api/follow')
const EntryDialog = require('./components/EntryDialog')
const ProjectList = require('./components/ProjectList')
const ProjectDialog = require('./components/ProjectDialog')

const root = '/api';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {entries: [], pageSize: 2, links: [],
        projects: [], projPageSize: 6, projLinks: [],
        activeProjects: []};
    }

    componentDidMount() {
        this.loadProjects(this.state.projPageSize)
            .then(response => this.loadFromServer(this.state.pageSize, this.state.projects))
        .catch(error => console.log(error));
    }

    async loadProjects(projPageSize) {
        let projectCollection = await follow(
            client,
            root,
            [{rel: 'projects', params: {size: projPageSize}}]
        );
        this.projLinks = projectCollection.entity._links;

        projectCollection = await Promise.all(projectCollection.entity._embedded.projects.map(project =>
            client({
                method: 'GET',
                path: project._links.self.href
            })
        ));

        this.setState({
            ...this.state,
            projects: projectCollection,
            projPageSize: projPageSize,
            projLinks: this.projLinks,
        });
    }

    async loadFromServer(pageSize, activeProjects) {

        let entryCollection = await follow(
                client,
                root,
                ["entries", "search", {rel: 'findByProjectIn',
                    params: { size: pageSize,
                        sort: 'timestamp,desc',
                        projects: activeProjects.map(project => project.entity._links.self.href)}}]);

        console.log(entryCollection);

        this.links = entryCollection.entity._links;



        entryCollection = await Promise.all(entryCollection.entity._embedded.entries
            .map(entry =>
            client({
                method: 'GET',
                path: entry._links.self.href,
                params: {projection: 'fullDetails'}
            })
        ));

        this.setState({
            ...this.state,
            entries: entryCollection,
            pageSize: pageSize,
            links: this.links,
        });
    }

    async onNavigate(naviUri) {
        let entryCollection = await client({
            method: 'GET',
            path: naviUri
        });

        this.setState({
            entries: entryCollection.entity._embedded.entries,
            pageSize: this.state.pageSize,
            links: entryCollection.entity._links
        });
    }

    async onCreate(newEntry) {
        const entriesCollection = await follow(client, root, ['entries']);
        await client({
            method: 'POST',
            path: entriesCollection.entity._links.self.href,
            entity: newEntry,
            headers: {'Content-Type': 'application/json'}
        });

        this.loadFromServer(this.state.pageSize, this.state.projPageSize);
    }

    onDelete(entry) {
        client({
            method: 'DELETE',
            path: entry._links.self.href
        })
            .done(response => this.loadFromServer(this.state.pageSize, this.state.projPageSize))
    }

    async onProjectCreate(newProject) {
        const projectCollection = await follow(client, root, ['projects']);
        await client({
            method: 'POST',
            path: projectCollection.entity._links.self.href,
            entity: newProject,
            headers: {'Content-Type': 'application/json'}
        });

        this.loadFromServer(this.state.pageSize, this.state.projPageSize)
    }

    onProjectDelete(project) {
        client({
            method: 'DELETE',
            path: project.entity._links.self.href
        })
            .done(response => this.loadFromServer(this.state.pageSize, this.state.projPageSize))
    }

    onProjectFilterChange(project) {
        for(let i = 0; i < this.state.activeProjects.length; i++) {
            if(this.state.activeProjects[i].entity._links.self.href === project.entity._links.self.href) {
                this.state.activeProjects.splice(i, 1);
                return;
            }
        }
        this.state.activeProjects.push(project);
    }

    render() {
        return (
            <div>
                <div className='top-bar'></div>
                <div className='content'>
                    <EntryDialog onCreate={this.onCreate.bind(this)}  projects={this.state.projects}/>
                    <EntryList entries={this.state.entries} onDelete={this.onDelete.bind(this)} loadMore={() => this.loadFromServer(this.state.pageSize + 2)}/>
                </div>
                <div className='sidebar'>
                    <h1>Developer journal</h1>
                    <ProjectList projects={this.state.projects} activeFilter={this.state.activeProjects} onDelete={this.onProjectDelete.bind(this)} onFilterChange={this.onProjectFilterChange.bind(this)}/>
                    <ProjectDialog onCreate={this.onProjectCreate.bind(this)}/>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)
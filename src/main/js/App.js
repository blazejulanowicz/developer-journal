const React = require('react');
const client = require('./client');
const regeneratorRuntime = require("regenerator-runtime");
const EntryList = require('./components/EntryList');
const follow = require('./api/follow');
const EntryDialog = require('./components/EntryDialog');
const ProjectList = require('./components/ProjectList');
const ProjectDialog = require('./components/ProjectDialog');
const ModalDialog = require('./components/ModalDialog');

const root = '/api/';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {entries: [], pageSize: 2, links: [],
        projects: [], projPageSize: 6, projLinks: [],
        activeProjects: [], userDetails: "", modalDialog: {}};
        this.state.modalDialog = {
            dialogName: '',
            inputOptions: [],
            onSubmit: null,
            isVisible: false
        }
    }

    componentDidMount() {
        this.loadUserDetails().catch(error => console.log(error));
        this.loadProjects(this.state.projPageSize)
        .catch(error => console.log(error));
    }

    async loadUserDetails() {
        let userDetails = await client({
            method: 'GET',
            path: root + 'user'
        });

        this.setState({
            ...this.state,
            userDetails: userDetails.entity
        })
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
            activeProjects: Object.assign([], projectCollection)
        });

        await this.loadFromServer(this.state.pageSize);
    }

    async loadFromServer(pageSize) {

        let entryCollection = await follow(
                client,
                root,
                ["entries", "search", {rel: 'findByProjectIn',
                    params: { size: pageSize,
                        sort: 'timestamp,desc',
                        projects: this.state.activeProjects.map(project => project.entity._links.self.href)}}]);

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
            links: this.links
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

        this.loadFromServer(this.state.pageSize);
    }

    onDelete(entry) {
        client({
            method: 'DELETE',
            path: entry._links.self.href
        })
            .done(response => this.loadFromServer(this.state.pageSize))
    }

    async onProjectCreate(newProject) {
        const projectCollection = await follow(client, root, ['projects']);
        await client({
            method: 'POST',
            path: projectCollection.entity._links.self.href,
            entity: newProject,
            headers: {'Content-Type': 'application/json'}
        });

        this.loadProjects(this.state.projPageSize).catch(error => console.error(error));
    }

    onProjectDelete(project) {
        client({
            method: 'DELETE',
            path: project.entity._links.self.href
        })
            .done(response => this.loadProjects(this.state.projPageSize))
            .catch(error => console.error(error));
    }

    onProjectFilterChange(project) {
        for(let i = 0; i < this.state.activeProjects.length; i++) {
            if (this.state.activeProjects[i].entity._links.self.href === project.entity._links.self.href) {
                this.state.activeProjects.splice(i, 1);
                console.debug(this.state.projects);
                this.loadFromServer(this.state.pageSize).catch(error => console.error(error))
                return;
            }
        }
        this.state.activeProjects.push(project);
        this.loadFromServer(this.state.pageSize).catch(error => console.error(error))
    }

    async onIntegrationAdd(project) {

        let response = await client({
            method: 'GET',
            path: 'https://api.github.com/user/repos',
            headers: {
                'Authorization': 'token ' + this.state.userDetails.githubAccessToken
            }
        });

        this.setState({
            ...this.state,
            modalDialog: {
                dialogName: 'Choose Github repository',
                inputOptions: [
                    {
                        inputType: 'dropdown',
                        options: response.entity.map(element => {
                            return({
                                key: element.url,
                                value: element.full_name,
                                text: element.full_name
                            })
                        })
                    }
                ],
                onSubmit: (repoName) => {
                    client({
                        method: 'PUT',
                        path: project.entity._links.self.href,
                        entity: {
                            ...project.entity,
                            githubRepoName: repoName[0]
                        },
                        headers: {
                            'Authorization': 'token ' + this.state.userDetails.githubAccessToken,
                            'Content-Type': 'application/json'
                        }
                    }).catch(error => console.error(error));
                    this.setState({
                        ...this.state,
                        modalDialog: {
                            ...this.state.modalDialog,
                            isVisible: false
                        }
                        }
                    )
                },
                isVisible: true
            }
        })
    }

    render() {
        return (
            <div className='page-content'>
                <div className='content'>
                    <EntryDialog onCreate={this.onCreate.bind(this)}  projects={this.state.projects}/>
                    <EntryList entries={this.state.entries} onDelete={this.onDelete.bind(this)} loadMore={() => this.loadFromServer(this.state.pageSize + 2)}/>
                </div>
                <div className='sidebar'>
                    <ProjectList projects={this.state.projects} activeFilter={this.state.activeProjects} onDelete={this.onProjectDelete.bind(this)} onFilterChange={this.onProjectFilterChange.bind(this)} onIntegrationAdd={this.onIntegrationAdd.bind(this)}/>
                    <ProjectDialog onCreate={this.onProjectCreate.bind(this)}/>
                </div>
                <ModalDialog dialogName={this.state.modalDialog.dialogName}
                             inputOptions={this.state.modalDialog.inputOptions}
                             onSubmit={this.state.modalDialog.onSubmit}
                             isVisible={this.state.modalDialog.isVisible}/>
            </div>
        )
    }
}

module.exports = App;
const React = require('react')
const Entry = require('./Entry')

class EntryList extends React.Component {
    render() {
      const entries = this.props.entries.map(entry => <Entry key={entry._links.self.href} entry={entry} onDelete={this.props.onDelete}/>);

        return (
            <div className='entry-list'>
                {entries}
            </div>
        )
    };
}

module.exports = EntryList;
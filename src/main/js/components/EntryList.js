const React = require('react');
const Entry = require('./Entry');
const client = require('../client');

class EntryList extends React.Component {

    render() {
        console.log(this.props.entries);
      const entries = this.props.entries.map(entry => {
          return <Entry key={entry._links.self.href} entry={entry} onDelete={this.props.onDelete}/>
      });

        return (
            <div className='entry-list'>
                {entries}
            </div>
        )
    };
}

module.exports = EntryList;
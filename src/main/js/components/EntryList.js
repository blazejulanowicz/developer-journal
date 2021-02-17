const React = require('react');
const Entry = require('./Entry');
const client = require('../client');

class EntryList extends React.Component {

    constructor(props) {
        super(props);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    handleLoadMore(e) {
        e.preventDefault();
        this.props.loadMore();
    }

    render() {


      const entries = this.props.entries.map(entry => {
          return <Entry key={entry._links.self.href} entry={entry} onDelete={this.props.onDelete}/>
      });

        return (
            <div className='entry-list'>
                {entries}
                <button key='last' onClick={this.handleLoadMore}>LOAD MORE</button>
            </div>
        )
    };
}

module.exports = EntryList;
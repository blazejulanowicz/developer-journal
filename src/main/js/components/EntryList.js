const React = require('react');
const Entry = require('./Entry');
const client = require('../client');
const {TransitionGroup, CSSTransition} = require('react-transition-group');

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
          return (<CSSTransition
                  key={entry.entity._links.self.href}
              timeout={500}
              classNames="entry"
              unmountOnExit
          ><Entry key={entry.entity._links.self.href} entry={entry} onDelete={this.props.onDelete}/>
          </CSSTransition>
          )
      });

        return (
            <div className='entry-list'>
                <TransitionGroup className='entry-list'>
                    {entries}
                </TransitionGroup>
                {this.props.isMoreEntries ? <button className='button' key='last' onClick={this.handleLoadMore}>LOAD MORE</button>
                    : <h2 className='grayer-text'>No more entries to load :(</h2> }
            </div>
        )
    };
}

module.exports = EntryList;
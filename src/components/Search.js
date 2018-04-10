import React from 'react';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom'

class Search extends React.Component {

  state = {
    query: ''
  };

  componentDidMount() {
    this.setState({query: this.props.searchFilter || ''});
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.searchFilter !== nextProps.searchFilter)
      this.setState({query: nextProps.searchFilter || ''});
  }

  onInputChange = ({currentTarget}) => {
    this.setState({query: currentTarget.value}, () => console.log('query', `'${this.state.query}'`))
  };

  search = () => {
    const safeInput = this.state.query.toLocaleLowerCase();
    this.props.onSearch(safeInput)
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search for pizza"
          onChange={this.onInputChange}
          value={this.state.query} />

        <Button
          tag={Link}
          to='/pizzas'
          onClick={this.search}
          disabled={!this.state.query}>Search</Button>
      </div>
    );
  }
}

Search.defaultProps = {
  onSearch: (q) => {
    console.warn('no search handler defined.', q)
  }
}

Search.propTypes = {
  onSearch: (query) => {},
  searchFilter: ''
};

export default Search;

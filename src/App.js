import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const isSearch = (searchTerm) => (item) =>
    !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
// ES5
// function isSearch(searchTerm) {
//   return function(item) {
//     return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list  : null,
      searchTerm : DEFAULT_QUERY
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setTopStories(list) {
    this.setState({list});
  }

  fetchTopStories(searchTerm) {
    const path = PATH_BASE + PATH_SEARCH + '?' + PARAM_SEARCH + searchTerm;
    fetch(path)
    .then(response => response.json())
    .then(list => this.setTopStories(list))
    .catch(err => err);
  }

  componentDidMount() {
      const { searchTerm } = this.state;
      this.fetchTopStories(searchTerm);
  }

  onSearchSubmit(event) {
      const { searchTerm } = this.state;
      this.fetchTopStories(searchTerm);
      event.preventDefault();
  }
  onSearch(event) {
    this.setState({searchTerm: event.target.value});
  }
  onDismiss(id) {
      const uList = this.state.list.hits.filter(item => item.objectID !== id);
      // ES5 object.assign
      // this.setState({list : Object.assign({},this.state.list,{hits: uList })});
      this.setState({ list : { ...this.state.list, hits: uList}});
  }

  render() {
    const { list,searchTerm } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value = {searchTerm} onChange = {this.onSearch} onSubmit = {this.onSearchSubmit}> search </Search>
        </div>
        { list && <Table list = {list.hits} onDismiss = {this.onDismiss} /> }
      </div>
    );
  }
}

const Search = ({value,onSubmit,onChange,children}) => {
   return (
     <form onSubmit = {onSubmit}>
       <input type="text" onChange = { onChange } value = {value} />
       <button type = "submit">{children}</button>
     </form>
   );
};

const Table = ({list, onDismiss}) => {
  return (
    <div className = "table">
      { list.map(item =>
        <div key = {item.objectID} className = "table-row">
          <span style={{ width: '40%' }}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={{ width: '30%' }}>
            {item.author}
          </span>
          <span style={{ width: '10%' }}>
            {item.num_comments}
          </span>
          <span style={{ width: '10%' }}>
            {item.points}
          </span>
          <span style={{ width: '10%' }}>
            <Button
              onClick={() => onDismiss(item.objectID)} className="button-inline">
              Dismiss
            </Button>
          </span>
        </div>
      )}
    </div>
  );
};

const Button = ({ onClick, className = '', children }) =>  {
  return(
      <button onClick={onClick} className = {className} type="button" > {children} </button>
  );
};

export default App;

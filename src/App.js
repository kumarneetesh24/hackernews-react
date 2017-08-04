import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

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
      list,
      searchTerm : ''
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(event) {
    this.setState({searchTerm: event.target.value});
  }
  onDismiss(id) {
      const uList = this.state.list.filter(item => item.objectID !== id);
      this.setState({list : uList});
  }

  render() {
    const { list,searchTerm } = this.state;
    return (
      <div className="App">
        <Search value = {searchTerm} onChange = {this.onSearch} > search </Search>
        <Table list = {list} term = {searchTerm} onDismiss = {this.onDismiss} />
      </div>
    );
  }
}

class Search extends Component {
   render() {
     const {value,onChange,children} = this.props;
     return (
       <form>
         {children}<input type="text" onChange = { onChange } value = {value} />
       </form>
     );
   }
}

class Table extends Component {
  render() {
    const{list, term, onDismiss} = this.props;
    return (
      <div>
        { list.filter(isSearch(term)).map(item =>
          <div key = {item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span><button onClick = { () => onDismiss(item.objectID) }>Dismiss</button></span>
          </div>
        )}
      </div>
    );
  }
}

export default App;

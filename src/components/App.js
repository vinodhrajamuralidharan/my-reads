import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as BooksApiService from '../data/BooksApiService';
import '../css/App.css';
import BookList from './BookList';
import { Link } from 'react-router-dom';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksApiService.getAll().then(books => this.setState({ books }));
  }

  changeShelf = (changedBook, shelf) => {
    BooksApiService.update(changedBook, shelf).then(response => {
      changedBook.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books
          .filter(book => book.id !== changedBook.id)
          .concat(changedBook)
      }));
    });
  };

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            render={() => (
              <Search books={books} changeShelf={this.changeShelf} />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <BookList books={books} changeShelf={this.changeShelf} />
                <div className="open-search">
                  <Link to="/search">Search</Link>
                </div>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;

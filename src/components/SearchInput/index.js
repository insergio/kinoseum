import React, { Component } from 'react';
import './styles.css';

class SearchInput extends Component {

    state={
      value: ''
    }

    render() {
      const {onWrite, onSubmit} = this.props;
      return (
        <form onSubmit={onSubmit}>
          <input 
            className="movie-input" 
            placeholder="Escribe"
            onChange={onWrite}
          ></input>
        </form>
      );
    }
  }

  export default SearchInput;
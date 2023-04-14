import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    srcArt: '',
    findBtnDisable: true,
  };

  verifyInput = () => {
    const { srcArt } = this.state;
    const minChars = 2;
    if (srcArt.length >= minChars) {
      this.setState({
        findBtnDisable: false,
      });
    } else {
      this.setState({
        findBtnDisable: true,
      });
    }
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      srcArt: value,
    }, this.verifyInput);
  };

  render() {
    const { findBtnDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>
          Search
        </h1>
        <div>
          <input
            type="text"
            name="srcArt"
            id="findArt"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            onChange={ this.onInputChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ findBtnDisable }
          >
            Procurar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;

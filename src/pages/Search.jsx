import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import SearchAlbuns from '../components/SearchAlbuns';
import Loading from './Loading';

class Search extends Component {
  state = {
    srcArt: '',
    findBtnDisable: true,
    resultAlbumSrc: [],
    isLoading: false,
    artist: '',
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

  onSrcClick = async () => {
    const { srcArt } = this.state;
    this.setState({
      isLoading: true,
    });
    const dataAlbumsAPI = await searchAlbumsAPI(srcArt);
    this.setState({
      srcArt: '',
      resultAlbumSrc: dataAlbumsAPI,
      isLoading: false,
      artist: srcArt,
    });
  };

  render() {
    const {
      srcArt,
      findBtnDisable,
      resultAlbumSrc,
      isLoading,
      artist } = this.state;
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
            value={ srcArt }
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            onChange={ this.onInputChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ findBtnDisable }
            onClick={ this.onSrcClick }
          >
            Procurar
          </button>
          {artist && (
            <span>
              {`Resultado de álbuns de: ${artist}`}
            </span>)}
          {
            resultAlbumSrc.length <= 0 ? <p> Nenhum álbum foi encontrado </p>
              : (<SearchAlbuns resultAlbumSrc={ resultAlbumSrc } />)
          }
          { isLoading && <Loading /> }
        </div>
      </div>
    );
  }
}

export default Search;

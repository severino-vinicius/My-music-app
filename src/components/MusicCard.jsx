import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isFavorite: false,
    isLoading: false,
  };

  componentDidMount() {
    this.resultFetchLS();
  }

  resultFetchLS = async () => {
    const favoriteSongsFromLS = await getFavoriteSongs();
    const { trackId } = this.props;
    this.setState({
      isFavorite: favoriteSongsFromLS.some((id) => id.trackId === trackId),
    });
  };

  onInputChange = async () => {
    this.setState({
      isLoading: true,
    });
    const { trackId } = this.props;
    const favoriteSongsFromLS = await getFavoriteSongs();
    if (!favoriteSongsFromLS.includes(trackId)) {
      await addSong(trackId);
      this.setState({
        isLoading: false,
        isFavorite: true,
      });
    } else {
      this.setState({
        isLoading: false,
        isFavorite: false,
      });
    }
  };

  render() {
    const { previewUrl, trackId, trackName } = this.props;
    const { isLoading, isFavorite } = this.state;
    return (
      <div>
        { isLoading ? <Loading /> : (
          <>
            <span>
              { trackName }
            </span>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              <code>audio</code>
            </audio>
            <label htmlFor="favoriteCheckbox">
              Favorita
              <input
                type="checkbox"
                name="isFavorite"
                id="favoriteCheckbox"
                data-testid={ `checkbox-music-${trackId}` }
                checked={ isFavorite }
                onChange={ this.onInputChange }
              />
            </label>
          </>) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  songsData: PropTypes.arrayOf({
  }).isRequired,
}.isRequired;

export default MusicCard;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isFavorite: '',
    isLoading: false,
  };

  onInputChange = async () => {
    this.setState({
      isFavorite: true,
      isLoading: true,
    });
    const { trackId } = this.props;
    // console.log(trackId);
    const favoriteSongs = await addSong(trackId);
    console.log(favoriteSongs);
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { previewUrl, trackId, trackName } = this.props;
    const { isFavorite, isLoading } = this.state;
    return (
      <div>
        { isLoading ? <Loading />
          : <>
            <span>
              { trackName }
            </span>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              <code>audio</code>
            </audio>
            <label htmlFor="favoriteCheckbox" data-testid={ `checkbox-music-${trackId}` }>
              Favorita
              <input
                type="checkbox"
                name="isFavorite"
                id="favoriteCheckbox"
                checked={ isFavorite }
                onChange={ this.onInputChange }
              />
            </label>
          </> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  songsData: PropTypes.arrayOf({
    map: PropTypes.string.isRequired,
  }).isRequired,
}.isRequired;

export default MusicCard;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { songsData } = this.props;
    return (
      <>
        {songsData.map((song) => (
          <div key={ song.trackId }>
            <span>
              { song.trackName }
            </span>
            <audio data-testid="audio-component" src={ song.previewUrl } controls>
              <track kind="captions" />
              <code>audio</code>
            </audio>
          </div>
        ))}
      </>
    );
  }
}

MusicCard.propTypes = {
  songsData: PropTypes.arrayOf({
    map: PropTypes.string.isRequired,
  }).isRequired,
}.isRequired;

export default MusicCard;

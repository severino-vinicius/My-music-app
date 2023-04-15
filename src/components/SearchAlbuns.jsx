import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchAlbuns extends Component {
  render() {
    const { resultAlbumSrc } = this.props;
    // const { artistName, collectionName, artworkUrl100 } = resultAlbumSrc
    return (
      <div>
        {resultAlbumSrc.map((dataItem) => (
          <Link
            to={ `/album/${dataItem.collectionId}` }
            data-testid={ `link-to-album-${dataItem.collectionId}` }
            key={ dataItem.collectionId }
          >
            <img src={ dataItem.artworkUrl100 } alt={ dataItem.artistName } />
            <p>
              { dataItem.collectionName }
            </p>
            <p>
              { dataItem.artistName }
            </p>
          </Link>
        ))}
      </div>
    );
  }
}

SearchAlbuns.propTypes = {
  resultAlbumSrc: PropTypes.arrayOf({
    map: PropTypes.string.isRequired,
  }).isRequired,
}.isRequired;

export default SearchAlbuns;

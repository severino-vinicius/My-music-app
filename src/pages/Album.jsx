import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    dataFetchResults: [],
  };

  componentDidMount() {
    this.handleFetchAlbum();
  }

  handleFetchAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const itensDataFetchResult = await getMusics(id);
    this.setState({
      dataFetchResults: itensDataFetchResult,
    });
  };

  render() {
    const { dataFetchResults } = this.state;
    const [albumDataInfo, ...songsData] = dataFetchResults;
    return (
      <div data-testid="page-album">
        <Header />
        Album
        { albumDataInfo && (
          <div data-testid="artist-name">
            { albumDataInfo.artistName }
          </div>)}

        { albumDataInfo && (
          <div data-testid="album-name">
            { albumDataInfo.collectionName }
          </div>)}

        { albumDataInfo
          && <img
            src={ albumDataInfo.artworkUrl100 }
            alt={ albumDataInfo.artistName }
          />}
        <MusicCard songsData={ songsData } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;

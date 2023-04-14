import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    name: '',
    isLoading: false,
  };

  componentDidMount() {
    this.userFromLS();
    this.setState({
      isLoading: true,
    });
  }

  userFromLS = async () => {
    const userData = await getUser();
    this.setState({
      name: userData.name,
      isLoading: false,
    });
  };

  render() {
    const { name, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search"> Search </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
          <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
        </nav>
        { isLoading ? (
          <Loading />
        ) : (
          <p data-testid="header-user-name">
            { name }
          </p>
        )}
      </header>
    );
  }
}

export default Header;

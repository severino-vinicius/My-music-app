import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    name: '',
    saveBtnDisabbled: true,
    isLoading: false,
  };

  verifyInput = () => {
    const { name } = this.state;
    const minChars = 3;
    if (name.length >= minChars) {
      this.setState({
        saveBtnDisabbled: false,
      });
    } else {
      this.setState({
        saveBtnDisabbled: true,
      });
    }
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      name: value,
    }, this.verifyInput);
  };

  onLoginClick = async () => {
    const { history } = this.props;
    const { name } = this.state;
    const user = {
      name,
    };
    this.setState({
      isLoading: true,
    });
    await createUser(user);
    history.push('/search');
  };

  render() {
    const { saveBtnDisabbled, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        { isLoading ? (
          <Loading />
        ) : (
          <>
            <input
              type="text"
              placeholder="Nome"
              data-testid="login-name-input"
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ saveBtnDisabbled }
              onClick={ this.onLoginClick }
            >
              Entrar
            </button>
          </>
        )}
      </div>
    );
  }
}

export default Login;

import React, { Component } from 'react';

class Home extends Component {
  render() {
    return(
      <div
      style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
      <img
        src={require('../pokemon.gif')}
        alt="pokemon.gif"
      />
      <div
      style={{color: '#2196F3', textAlign: 'center'}}>
      <h1>Welcome to PokeFav</h1>
      <h3>Choose your favorite pokemons!!</h3>
      </div>
      </div>
    )
  }
}

export default Home
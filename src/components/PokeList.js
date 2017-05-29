import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import { fetchPokemons, addFavoritePokemon, removeFavoritePokemon } from '../actions'

class PokeList extends Component {
  constructor(props){
    super(props)
    this.state={
      searchTerm: '',
      open: false
    }
  }
  
  componentDidMount() {
    this.props.fetchPokemons()
  }
  
  handleType(e) {
    this.setState({searchTerm: e.target.value})
  }
  
  handleSearch() {
    if (this.state.searchTerm === null || this.state.searchTerm === undefined || this.state.searchTerm === ''){
      return (
        this.props.pokemons.map(pokemon =>
          <GridTile
            key={pokemon.id}
            title={pokemon.name}
            actionIcon={this.favoritePokemons(pokemon)}
          >
            <img
            src={'http://assets.pokemon.com/assets/cms2/img/pokedex/full/' + ('000' + pokemon.id.toString()).substr(-3) + '.png'}
            alt={pokemon.name + '.img'}
            />
          </GridTile>
        )
      )
    } else {
      const regEx = new RegExp(this.state.searchTerm, 'g')
      let pokes = this.props.pokemons.filter(pokemon=>pokemon.name.match(regEx))
      return (
        pokes.map(pokemon=>
          <GridTile
            key={pokemon.id}
            title={pokemon.name}
            actionIcon={this.favoritePokemons(pokemon)}
          >
            <img
            src={'http://assets.pokemon.com/assets/cms2/img/pokedex/full/' + ('000' + pokemon.id.toString()).substr(-3) + '.png'}
            alt={pokemon.name + '.img'}
            />
          </GridTile>
        )
      )
    }
  }
  
  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  favoritePokemons(pokemon) {
    if(this.props.activeUser.name === undefined){
      return (
        <div>
        <IconButton
          iconClassName="material-icons"
          onTouchTap={()=>{this.handleTouchTap()}}
        >
        star_border
        </IconButton>
        <Snackbar
          open={this.state.open}
          message="Please choose active user"
          autoHideDuration={2000}
          onRequestClose={()=>{this.handleRequestClose()}}
        />
        </div>
        
      )
    } else {
      for(let i = 0; i < this.props.activeUser.pokemons.length; i++){
        if(this.props.activeUser.pokemons[i].name === pokemon.name){
          return (
            <IconButton
            iconClassName="material-icons"
            onClick={()=>{this.props.removeFavoritePokemon(this.props.activeUser, pokemon)}}>
            star
            </IconButton>
          )
        }
      }
      return (
        <IconButton
        iconClassName="material-icons"
        onClick={()=>{this.props.addFavoritePokemon(this.props.activeUser, pokemon)}}>
        star_border
        </IconButton>
      )
    }
  }
  render() {
    return(
      <div>
        <div style={{margin: '100px 0px 0px 50px'}}>
        <TextField
          hintText="Search"
          style={{width: '80%'}}
          onChange={(e)=>{this.handleType(e)}}
        />
        </div>
        <GridList
          cellHeight={350}
          cols={3}
          style={{margin: '50px'}}
        >
        {this.handleSearch()}
        </GridList>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pokemons: state.pokemons,
    activeUser: state.activeUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchPokemons: () => {
      return dispatch(fetchPokemons())
    },
    addFavoritePokemon: (user, pokemon) => {
      return dispatch(addFavoritePokemon(user, pokemon))
    },
    removeFavoritePokemon: (user, pokemon) => {
      return dispatch(removeFavoritePokemon(user, pokemon))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(PokeList)
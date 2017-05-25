import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import { removeFavoritePokemon, removeUser } from '../actions';

class PokeFav extends Component {
  handleDelete(){
    this.props.removeUser(this.props.activeUser)
  }
  activeUser(){
    if(this.props.activeUser.name !== undefined){
      return (
        <div style={{margin: '80px'}}>
          <h1>Welcome {this.props.activeUser.name}!!</h1>
          <List>
            {this.props.activeUser.pokemons.map(pokemon=>
              <ListItem
                primaryText={pokemon.name}
                key={pokemon.id}
                leftAvatar={
                  <Avatar
                  src={'http://assets.pokemon.com/assets/cms2/img/pokedex/detail/' + ('000' + pokemon.id.toString()).substr(-3) + '.png'}
                  />
                }
                rightIcon={
                  <IconButton
                    iconClassName="material-icons"
                    tooltip="Remove"
                    onClick={()=>{this.props.removeFavoritePokemon(this.props.activeUser, pokemon)}}
                  >
                  delete
                  </IconButton>
                }
              />
            )}
          </List>
          <RaisedButton label="Delete User" secondary={true} onClick={()=>{this.handleDelete()}}/>
        </div>
      )
    } else {
      return <Redirect to="/"/>
      
    }
  }
  render(){
    return(
      <div>
        {this.activeUser()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    removeFavoritePokemon: (user, pokemon) => {
      return dispatch(removeFavoritePokemon(user, pokemon))
    },
    removeUser: (user) => {
      return dispatch(removeUser(user))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(PokeFav)
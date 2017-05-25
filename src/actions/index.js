import axios from 'axios'

import * as actionType from './constants'

export const fetchPokemons = () => {
  return (dispatch) => {
    axios.get('http://localhost:8888/pokemons')
    .then((res)=>{
      dispatch(fetchPokemonsSuccess(res.data));
    }).catch((err)=>{
      console.log(err);
    })
  }
}

const fetchPokemonsSuccess = pokemons => ({
  type: actionType.FETCH_POKEMONS_SUCCESS,
  pokemons
})

export const addFavoritePokemon = (user, pokemon) => {
  return (dispatch) => {
    let pokemons = [...user.pokemons,pokemon]
    axios.patch('http://localhost:8888/users/' + user.id, {
      pokemons
    }).then((res)=>{
      dispatch(editFavoritePokemonSuccess(res.data))
    }).catch((err)=>{
      console.log(err);
    })
  }
}

export const removeFavoritePokemon = (user, pokemon) => {
  return (dispatch) => {
    let pokemons = [...user.pokemons.filter(poke => poke.id !== pokemon.id)]
    axios.patch('http://localhost:8888/users/' + user.id, {
      pokemons
    }).then((res)=>{
      dispatch(editFavoritePokemonSuccess(res.data))
    }).catch((err)=>{
      console.log(err);
    })
  }
}

const editFavoritePokemonSuccess = user => ({
  type: actionType.EDIT_FAVORITE_POKEMON_SUCCESS,
  user,
})

export const fetchUsers = () => {
  return (dispatch) => {
    axios.get('http://localhost:8888/users')
    .then((res)=>{
      dispatch(fetchUsersSuccess(res.data))
    }).catch((err)=>{
      console.log(err);
    })
  }
}

const fetchUsersSuccess = users => ({
  type: actionType.FETCH_USERS_SUCCESS,
  users
})

export const addUser = name => {
  return (dispatch) => {
    axios.post('http://localhost:8888/users', {
      name,
      pokemons: new Array()
    }).then((res)=>{
      dispatch(addUserSuccess(res.data))
    }).catch((err)=>{
      console.log(err);
    })
  }
}

const addUserSuccess = user => ({
  type: actionType.ADD_USER_SUCCESS,
  user
})

export const removeUser = user => {
  return (dispatch) => {
    axios.delete('http://localhost:8888/users/' + user.id)
    .then((res)=>{
      dispatch(removeUserSuccess(user))
    }).catch((err)=>{
      console.log(err);
    })
  }
}

const removeUserSuccess = user => ({
  type: actionType.REMOVE_USER_SUCCESS,
  user
})

export const changeActiveUser = user => ({
  type: actionType.CHANGE_ACTIVE_USER,
  user
})
import { combineReducers } from 'redux'

import users from './userReducer'
import pokemons from './pokemonReducer'
import activeUser from './activeUserReducer'

export default combineReducers({
  users,
  pokemons,
  activeUser
})
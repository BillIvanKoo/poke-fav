import * as actionType from '../actions/constants'

const pokemonReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.FETCH_POKEMONS_SUCCESS:
      return action.pokemons
    default:
      return state
  }
}

export default pokemonReducer
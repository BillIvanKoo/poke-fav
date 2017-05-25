import * as actionType from '../actions/constants';

const activeUserReducer = (state={}, action) => {
  switch (action.type) {
    case actionType.CHANGE_ACTIVE_USER:
      return action.user
    case actionType.REMOVE_USER_SUCCESS:
      return {}
    case actionType.EDIT_FAVORITE_POKEMON_SUCCESS:
      return action.user
    default:
      return state
  }
}

export default activeUserReducer
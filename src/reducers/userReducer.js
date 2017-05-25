import * as actionType from '../actions/constants'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.FETCH_USERS_SUCCESS:
      return action.users
    case actionType.ADD_USER_SUCCESS:
      return [...state, action.user]
    case actionType.REMOVE_USER_SUCCESS:
      let newArray = state
      newArray.splice(newArray.indexOf(action.user),1)
      return newArray
    case actionType.EDIT_FAVORITE_POKEMON_SUCCESS:
      return [...state.filter( user => user.id !== action.user.id), action.user]
    default:
      return state
  }
}

export default userReducer
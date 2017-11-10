import * as CategoriesApi from '../services/CategoriesApi'
import { LOAD_CATEGORIES } from '../actions'

export const getCategoriesReducer = (state={}, action) => {  
	const { categories } = action
  switch (action.type) {
      case LOAD_CATEGORIES :
      return categories
    default :
      return state
  }
}
export const getCategoriesAction = (categories) => {
  return {
    type: LOAD_CATEGORIES,
    categories
  }
}

export const fetchCategories = (dispatch) => (
  CategoriesApi.getAllCategories()
      .then(categories => dispatch(getCategoriesAction({categories})))
)
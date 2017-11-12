import * as CategoriesApi from '../services/CategoriesApi'
import { LOAD_CATEGORIES } from './actionTypes'
import * as CategoriesActions from './CategoriesActions'


export const CategoriesReducer = (state={}, action) => {
  const { categories } = action
  switch (action.type) {
      case LOAD_CATEGORIES :
      return categories
    default :
      return state
  }
}

export const fetchCategories = (dispatch) => (
  CategoriesApi.getAllCategories()
      .then(categories => dispatch(CategoriesActions.loadCategoriesAction({categories})))
)
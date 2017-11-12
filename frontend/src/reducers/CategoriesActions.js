import { LOAD_CATEGORIES } from './actionTypes'

export const loadCategoriesAction = (categories) => {
  return {
    type: LOAD_CATEGORIES,
    categories
  }
}
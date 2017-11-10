import * as Backend from './Backend'

export const getAllCategories = () =>
	fetch(`${Backend.url}/categories`, Backend.tokens)
      .then(res => res.json())
      .then(data=>data.categories)
let token = 'whatever-you-want'
const headers = {
  'Accept': 'application/json',
  'Authorization': token
}
const credentials = 'include'

export const tokens = { headers, credentials }
export const url = process.env.REACT_APP_BACKEND
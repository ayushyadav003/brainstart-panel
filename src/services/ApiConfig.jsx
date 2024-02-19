// const apiUrl = 'https://brainstarapi.azurewebsites.net'
// const apiUrl = 'https://brainstar.azurewebsites.net/api/v1'
const apiUrl = 'http://localhost:8000/api/v1'

export const apiConfig = {
  //auth
  register: `${apiUrl}/register`,
  login: `${apiUrl}/auth`,
  refreshToken: `${apiUrl}/-`,

  //students
  student: `${apiUrl}/Student`,
}

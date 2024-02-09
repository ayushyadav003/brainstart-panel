const apiUrl = 'https://brainstarapi.azurewebsites.net'

export const apiConfig = {
  //auth
  register: `${apiUrl}/Auth/register`,
  login: `${apiUrl}/Auth/login`,
  refreshToken: `${apiUrl}/Auth/login`,

  //students
  student: `${apiUrl}/Student`,
}

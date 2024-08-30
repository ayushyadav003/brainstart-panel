// const apiUrl = 'https://brainstarapi.azurewebsites.net'
// const apiUrl = "https://brainstar-node-be.vercel.app/api/v1";
const apiUrl = "http://localhost:8000/api/v1";

export const apiConfig = {
  //auth
  register: `${apiUrl}/users`,
  login: `${apiUrl}/auth`,
  refreshToken: `${apiUrl}/-`,

  //class
  class: `${apiUrl}/class`,

  //batch
  batch: `${apiUrl}/batch`,

  //students
  student: `${apiUrl}/students`,
  attendance: `${apiUrl}/students/attendance`,

  //users (admin and teacher)

  //meetings
  meetings: `${apiUrl}/meetings`,
};

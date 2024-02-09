import axios from 'axios'
import { toast } from 'react-toastify'

export const ApiWithToken = async ({ url, method, data, param }) => {
  const apiOptions = {
    url,
    method,
    data,
    params: { ...param, Authorization: localStorage.getItem('userToken') },
  }
  try {
    const res = await axios(apiOptions)
    if (res?.data) {
      return res.data
    }
  } catch (error) {
    toast.error('Somthing went wrong!')
  }
}

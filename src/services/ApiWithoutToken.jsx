import axios from 'axios'
import { toast } from 'react-toastify'

export const ApiWithOutToken = async ({ url, method, data, params }) => {
  const apiOptions = {
    url,
    method,
    data,
    params,
  }
  try {
    const res = await axios(apiOptions)
    if (res) {
      return res
    }
  } catch (error) {
    toast.error('Somthing went wrong!')
  }
}

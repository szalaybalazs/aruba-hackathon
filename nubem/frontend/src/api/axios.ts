import axios from 'axios'

const BACKEND_BASE_URL = 'asd'

export default axios.create({
  baseURL: BACKEND_BASE_URL
})

export const axiosPrivate = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

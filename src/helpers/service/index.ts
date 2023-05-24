import axios, { type InternalAxiosRequestConfig } from 'axios'
import urlJoin from 'url-join'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const cdn = axios.create({
  baseURL: import.meta.env.VITE_CDN_URL
})

type InterceptorResponse =
  | InternalAxiosRequestConfig<any>
  | Promise<InternalAxiosRequestConfig<any>>

const getAuthToken = () => sessionStorage.getItem('token') || localStorage.getItem('token')

const authInterceptor = (config: InternalAxiosRequestConfig<any>): InterceptorResponse => {
  // Checkout if the auth token is available in session or local storage
  // if token not available return the config
  if (!getAuthToken()) return config
  // set the Authorization Header
  config.headers['Authorization'] = getAuthToken()

  return config
}

const orgInterceptor = (config: InternalAxiosRequestConfig<any>): InterceptorResponse => {
  // Checkout if the org handle is available in session or local storage
  const getOrg = () => sessionStorage.getItem('org') || localStorage.getItem('org')
  // Checkout function if the URL is absolute
  const isAbsoluteURLRegex = () => /^(?:\w+:)\/\//.test(config.url || '')
  // if the org handle is not available return
  if (!getOrg() || isAbsoluteURLRegex()) return config
  config.baseURL = urlJoin(import.meta.env.VITE_API_URL, getOrg() || '', '/api/in')
  return config
}

// Set Authentication on Initial Config
api.interceptors.request.use(authInterceptor)
api.interceptors.request.use(orgInterceptor)

export { api, authInterceptor, cdn, orgInterceptor, getAuthToken }

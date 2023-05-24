import { useLogin } from '@/helpers/queries/auth'
import { getAuthToken } from '@/helpers/service'
import { defineStore } from 'pinia'

const getUserFromStorage = () =>
  sessionStorage.getItem('u') || localStorage.getItem('u')
    ? JSON.parse(sessionStorage.getItem('u') || localStorage.getItem('u') || '{}')
    : null

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: getAuthToken(),
    isLoggedIn: !!getAuthToken(),
    isLoginLoading: false,
    user: getUserFromStorage(),
    returnURL: null
  }),
  actions: {
    async login(username: string, password: string) {
      const { mutateAsync } = useLogin()
      //   this.isLoginLoading = isLoading
      const data = await mutateAsync({
        username,
        password,
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        grant_type: 'password'
      })
      console.log(data)
    }
  }
})

import { api } from '@/helpers/service'
import { useMutation } from '@tanstack/vue-query'

type ILogin = {
  grant_type: string
  client_id: string | number
  client_secret: string
  username: string
  password: string
}
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: ILogin) => api.post(`/v1/login`, data)
  })
}

import { api, cdn } from '@/helpers/service'
import { useMutation } from '@tanstack/vue-query'
import urlJoin from 'url-join'

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

export const getOrgDP = (orgName: string) => {
  return urlJoin(cdn.getUri(), orgName, 'photos', `${orgName}.jpeg`)
}

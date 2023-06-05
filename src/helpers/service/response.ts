import type { AxiosResponse } from 'axios'

const handler = async (func: () => Promise<AxiosResponse>, accept: number | number[] = 200) => {
  try {
    const res = await func()
    if (res.status === accept || (typeof accept === 'object' && accept.includes(res.status))) {
      return {
        success: true,
        status: res.status,
        data: res.data?.data || res?.data || null,
        message: res.data?.message || res.data?.msg
      }
    } else {
      return {
        success: false,
        status: res.status,
        data: res.data?.data || res?.data || null,
        message: res.data?.message || res.data?.msg || 'Something went wrong'
      }
    }
  } catch (err: any) {
    if (err.response && err.response.status >= 400 && err.response.status < 500) {
      if (err.response.status === 401)
        return {
          success: false,
          status: err.response.status,
          data: null,
          message:
            err.response?.data?.message ||
            err.response?.data?.msg ||
            'Unverified to complete the task'
        }
      else {
        return {
          success: false,
          status: err.response.status,
          data: err.response.data || err.response || null,
          message: err.response?.data?.message || err.response?.data?.msg || 'Something went wrong'
        }
      }
    }
    return {
      success: false,
      status: err.response.status || 500,
      data: null,
      message: 'Something went wrong'
    }
  }
}

export { handler }

import axios from 'axios'
import { ong } from '../helpers/ong'

const api = axios.create({
    baseURL: '//localhost:3333',
})

setAuthorization()

api.interceptors.response.use(function (config) {
    console.log(config)

    return config
})

export function setAuthorization(id = null) {
    const AuthorizationCode = id || ong() ? ong().id : null

    if (AuthorizationCode)
        api.defaults.headers.common.Authorization = AuthorizationCode
}

export default api

import axios from "axios";

export const API_URL = 'http://test-task-second-chance-env.eba-ymma3p3b.us-east-1.elasticbeanstalk.com/'

const $host = axios.create({
    baseURL: API_URL
})

const $authHost = axios.create({
    baseURL: API_URL,
})

const authInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
import axios, { AxiosResponse } from 'axios'

const Instance = axios.create({
    baseURL: 'https://localhost:44336/api/',
	timeout: 0,
})

Instance.interceptors.request.use(
    function(config){
        const token = localStorage.getItem('TOKEN-CANVIA')
        if(token){
            if(config.headers) config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

Instance.interceptors.response.use(
    function(response){
        return response;
    },
    async function (error){
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            if(localStorage.getItem('TOKEN-CANVIA')){
                alert("Debe iniciar sesión nuevamente.")
                localStorage.removeItem('TOKEN-CANVIA');
                window.location.reload();
            }
        }
        return Promise.reject(error);
    }
)

const ResponseBody = (response: AxiosResponse) => response

const Request = {
	GET: (url: string, config?: {}) => Instance.get(url, config).then(ResponseBody),
	POST: (url: string, body: {}, config: {}) => Instance.post(url, body, config).then(ResponseBody),
	PUT: (url: string, body: {}) => Instance.put(url, body).then(ResponseBody),
	DELETE: (url: string) => Instance.delete(url).then(ResponseBody),
}

const GET = <T>(url: string, config?: {}) => {
    return new Promise<T[]>((resolve,reject) => {
        Request.GET(url, config)
        .then(function ({data}){
            resolve(data)
        })
        .catch(function (error) {
            resolve(error)
        })
    })
}

const POST = <T>(url: string, body: any, config: {}) => {
    return new Promise<T[]>((resolve,reject) => {
        Request.POST(url, body, config)
        .then(function ({data}){
            resolve(data)
        })
        .catch(function (error) {
            resolve(error)
        })
    })
}

const PUT = <T>(url: string, body: any, id: number) => {
    return new Promise<T[]>((resolve,reject) => {
        Request.PUT(`${url}/${id}`, body)
        .then(function ({data}){
            resolve(data)
        })
        .catch(function (error) {
            resolve(error)
        })
    })
}

const DELETE = <T>(url: string, id: number) => {
    return new Promise<T[]>((resolve,reject) => {
        Request.DELETE(`${url}/${id}`)
        .then(function ({data}){
            resolve(data)
        })
        .catch(function (error) {
            resolve(error)
        })
    })
}

export const HTTP = {
    GET,
    POST,
    PUT,
    DELETE
}
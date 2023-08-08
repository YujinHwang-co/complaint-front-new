import axios from 'axios'
// import store from '../store'

axios.defaults.baseURL = 'http://localhost:8081'


// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log('에러일 경우', error.config)
        const errorAPI = error.config
        if (error.response.data.status === 401 && errorAPI.retry === undefined) {
            errorAPI.retry = true
            console.log('토큰이 이상한 오류일 경우')
//            await refreshToken()
            return axios(errorAPI)
        }
        return Promise.reject(error)
    },
)

// export async function refreshToken() {
//     try {
//         if (!store.state.token) {
//             const lsToken = localStorage.getItem('token')
//             console.log(lsToken)
//
//             const token = await axios.post('/api/auth/reissue', null, {
//                 params: JSON.parse(lsToken),
//             })
//             return token
//         }
//     } catch (err) {
//         return err
//     }
// }

export default axios

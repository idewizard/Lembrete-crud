import {useAxios} from "./use-axios.hook"

export function useHttp(baseURL){

    const instance = useAxios(baseURL)

    async function get(url) {
        try {
            const response = await instance.get(url)
            return response.data
        } catch(error) {
            console.log(error)
            throw error
        }
    }

    async function post(url, data) {
        return await instance.post(url, data)
    }

    async function put(url, data){
        return await instance.put(url, data)
    }

    async function deletar(url, data){
        return await instance.delete(url, data)
    }

    return {
        get,
        deletar,
        post,
        put
    }
}
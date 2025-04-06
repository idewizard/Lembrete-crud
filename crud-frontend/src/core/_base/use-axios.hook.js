import axios from 'axios'

export function useAxios(baseURL) {

    const instance = axios.create({baseURL})

    return instance
}
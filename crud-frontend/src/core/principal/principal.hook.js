import { useHttp } from "../_base/use-http.hook";
import { URL_BASE } from '../../constants'

export function     useLembreteApi(){

    const httpInstance = useHttp(URL_BASE)

    async function listar() {
        return await httpInstance.get('/listar')
    }

    async function deletar(item) {
        return await httpInstance.deletar(`/apagar/${item.id}`);
    }

    async function cadastrar(item) {
        await httpInstance.post('/criar', item)
    }

    async function alterar(item) {
        await httpInstance.put('/alterar', item)
    }

    return {
        listar,
        deletar,
        cadastrar,
        alterar
    }
}
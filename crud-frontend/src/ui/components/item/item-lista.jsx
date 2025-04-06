import { useLembreteApi } from '../../../core'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

import './item-lista.css'

export function ItemLista({ lista, onEditar }) {

    const [itens, setItens] = useState([])
    const { deletar } = useLembreteApi()

    useEffect(() => {
        setItens(lista)
    }, [lista])

    async function onDeleteClick(item) {
        try {
            await deletar(item);
            setItens(prev => prev.filter(i => i.id !== item.id))
        } catch (err) {
            console.error("Erro ao deletar:", err)
        }
    }

    function onEditClick(value) {
        onEditar(value)
    }

    function RenderizaLista() {
        return itens.map((item, index) => {
            return (
                <div className="item-container">
                    <div className="numero-item-container">{index + 1}</div>
                    <div className="titulo-item-container">{item.titulo}</div>
                    <div className="mensagem-item-container">{item.mensagem}</div>
                    <div className="botao-editar-item-container" onClick={() => onEditClick(item)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </div>
                    <div className="botao-apagar-item-container" onClick={() => onDeleteClick(item)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </div>
                </div>
            )
        })
    }

    return (
        <RenderizaLista />
    )
}
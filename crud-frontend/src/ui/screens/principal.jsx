import { ItemLista, CadastrarItem } from '../'
import React, { useEffect, useState } from 'react'
import { useLembreteApi } from '../../core';

import './principal.css'

export function TelaPrincipal() {

    const { listar, cadastrar, alterar } = useLembreteApi()
    const [lista, setLista] = useState([])
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [lembreteSelecionado, setLembreteSelecionado] = useState(null)
    const [busca, setBusca] = useState("")

    useEffect(() => {
        async function listarLembretes() {
            await atualizarLista()
        }
        listarLembretes()
    }, [])


    const atualizarLista = async () => {
        const listaAtualizada = await listar();
        setLista(listaAtualizada);
    };

    const handleSalvar = async (lembrete) => {
        if (lembrete.id) {
            await alterar(lembrete)
            await atualizarLista()
        } else {
            await cadastrar(lembrete)
            await atualizarLista()
        }
        setMostrarFormulario(false)
        setLembreteSelecionado(null)
    };

    const handleEditarClick = (item) => {
        setLembreteSelecionado(item)
        setMostrarFormulario(true)
    }

    const normalizar = (texto) =>
        texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

    const listaFiltrada = lista.filter(item => {
       return normalizar(item.titulo).includes(normalizar(busca)) ||
            normalizar(item.mensagem).includes(normalizar(busca))
    })

    const handleNovo = async () => {
        await atualizarLista()
        setMostrarFormulario(true)
    }

    return (
        <>
            {mostrarFormulario && (
                <CadastrarItem
                    onClose={() => {
                        setMostrarFormulario(false)
                        setLembreteSelecionado(null)
                    }}
                    onSave={handleSalvar}
                    lembrete={lembreteSelecionado}
                />
            )}

            <div className="principal-container">
                <h1 className="titulo-app">Meus Lembretes</h1>
                <div className="conteudo-container">

                    <div className="pesquisar-container">
                        <button className="button-novo-item" onClick={handleNovo}>
                            + Novo Lembrete
                        </button>
                        <input
                            className="caixa-pesquisa"
                            type="search"
                            placeholder="Buscar lembretes..."
                            value={busca}
                            onChange={(e) => {
                                atualizarLista()
                                setBusca(e.target.value)}}
                        />
                    </div>
                    <div className="lista-container">
                        <div className="topo-lista-container">
                            <span>Titulo</span>
                            <span>Mensagem</span>
                        </div>
                        <div className="itens-container">
                            <ItemLista lista={listaFiltrada} onEditar={handleEditarClick} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
import { useState, useEffect } from 'react';

import './cadastrar-item.css'

export function CadastrarItem({ onClose, onSave, lembrete }) {

    const [titulo, setTitulo] = useState("");
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        setTitulo(lembrete?.titulo || "");
        setMensagem(lembrete?.mensagem || "");
    }, [lembrete]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const novoLembrete = {
            id: lembrete?.id,
            titulo,
            mensagem
        };
        onSave(novoLembrete);
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Novo Lembrete</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Título"
                        required
                    />
                    <input
                        type="text"
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        placeholder="Mensagem"
                        required
                    />
                    <div className="area-salvar-cancelar">
                        <button type="submit">Salvar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>

                </form>
            </div>
        </div>
    )
}
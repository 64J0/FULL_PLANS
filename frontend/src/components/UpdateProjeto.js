import React, { useState } from 'react';

import './UpdateProjeto.css';

function UpdateProjeto({ projeto, onUpdate, onDelete, setStringPagina }) {

    const [nomeEmpresa, setNomeEmpresa] = useState(projeto.nomeEmpresa);
    const [nomeProjeto, setNomeProjeto] = useState(projeto.nomeProjeto);
    const [disciplina, setDisciplina] = useState(projeto.disciplina);
    const [area, setArea] = useState(projeto.area);
    const [codigo, setCodigo] = useState(projeto.codigo);
    const [projetista, setProjetista] = useState(projeto.projetista);
    const [verificador, setVerificador] = useState(projeto.verificador);
    const [numPedido, setNumPedido] = useState(projeto.numPedido);
    const [responsavel, setResponsavel] = useState(projeto.responsavel);
    const [revisao, setRevisao] = useState(projeto.revisao);
    const [numNosso, setNumNosso] = useState(projeto.numNosso);
    const [numCliente, setNumCliente] = useState(projeto.numCliente);
    const [formato, setFormato] = useState(projeto.formato);
    const [descricao, setDescricao] = useState(projeto.descricao);
    const [objetivo, setObjetivo] = useState(projeto.objetivo);
    const [tipoEngenharia, setTipoEngenharia] = useState(projeto.tipoEngenharia);

    async function handleDeletar(id) {
        await onDelete(id);
    }

    async function handleUpdate(id) {
        
        await onUpdate(id, {
            nomeEmpresa,
            nomeProjeto,
            disciplina,
            area,
            codigo,
            projetista,
            verificador,
            numPedido,
            responsavel,
            revisao,
            numNosso,
            numCliente,
            formato,
            descricao,
            objetivo,
            tipoEngenharia,
        });

        setStringPagina('');
    }

    return(
        <div className="update-item">
            <div id={projeto._id} className="grid-container">
            <form>
                <div className="input-block">
                    <label htmlFor="nomeEmpresa">
                        Nome da empresa
                    </label>
                    <input 
                        type="text" 
                        name="nomeEmpresa"
                        id="nomeEmpresa"
                        required
                        value={nomeEmpresa}
                        onChange={e => setNomeEmpresa(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="nomeProjeto">
                        Nome do projeto
                    </label>
                    <input 
                        type="text" 
                        name="nomeProjeto"
                        id="nomeProjeto"
                        value={nomeProjeto}
                        onChange={e => setNomeProjeto(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="disciplina">
                        Disciplina
                    </label>
                    <input 
                        type="text" 
                        name="disciplina"
                        id="disciplina"
                        value={disciplina}
                        onChange={e => setDisciplina(e.target.value)} 
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="area">
                        Área
                    </label>
                    <input 
                        type="text" 
                        name="area"
                        id="area"
                        value={area}
                        onChange={e => setArea(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="codigo">
                        Código
                    </label>
                    <input 
                        type="text" 
                        name="codigo"
                        id="codigo"
                        value={codigo}
                        onChange={e => setCodigo(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="projetista">
                        Projetista
                    </label>
                    <input 
                        type="text" 
                        name="projetista"
                        id="projetista"
                        value={projetista}
                        onChange={e => setProjetista(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="verificador">
                        Verificador
                    </label>
                    <input 
                        type="text" 
                        name="verificador"
                        id="verificador"
                        value={verificador}
                        onChange={e => setVerificador(e.target.value)} 
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="numPedido">
                        Número do pedido
                    </label>
                    <input 
                        type="text" 
                        name="numPedido"
                        id="numPedido"
                        value={numPedido}
                        onChange={e => setNumPedido(e.target.value)} 
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="responsavel">
                        Responsável
                    </label>
                    <input 
                        type="text" 
                        name="responsavel"
                        id="responsavel"
                        value={responsavel}
                        onChange={e => setResponsavel(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="revisao">
                        Revisão
                    </label>
                    <input 
                        type="text" 
                        name="revisao"
                        id="revisao"
                        value={revisao}
                        onChange={e => setRevisao(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="numNosso">
                        Número nosso
                    </label>
                    <input 
                        type="text" 
                        name="numNosso"
                        id="numNosso"
                        value={numNosso}
                        onChange={e => setNumNosso(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="numCliente">
                        Número do cliente
                    </label>
                    <input 
                        type="text" 
                        name="numCliente"
                        id="numCliente"
                        value={numCliente}
                        onChange={e => setNumCliente(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="formato">
                        Formato
                    </label>
                    <input 
                        type="text" 
                        name="formato"
                        id="formato"
                        value={formato}
                        onChange={e => setFormato(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="descricao">
                        Descrição
                    </label>
                    <input 
                        type="text" 
                        name="descricao"
                        id="descricao"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="objetivo">
                        Objetivo
                    </label>
                    <input 
                        type="text" 
                        name="objetivo"
                        id="objetivo"
                        value={objetivo}
                        onChange={e => setObjetivo(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="tipoEngenharia">
                        Tipo de engenharia
                    </label>
                    <input 
                        type="text" 
                        name="tipoEngenharia"
                        id="tipoEngenharia"
                        value={tipoEngenharia}
                        onChange={e => setTipoEngenharia(e.target.value)}
                    />
                </div>

                <div className="div-buttons">
                    <button
                        type="button"
                        className="btn-deletar"
                        onClick={(e) => {handleDeletar(projeto._id); e.preventDefault();}}
                    >
                        Deletar
                    </button>
                    <button
                        type="submit"
                        className="btn-editar"
                        onClick={(e) => {handleUpdate(projeto._id); e.preventDefault();}}
                    >
                        Salvar
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateProjeto;
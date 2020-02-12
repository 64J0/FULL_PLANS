import React, { useState } from 'react';
import ListItemInfo from './ListItemInfo';

import './UpdateProjeto.css';

function UpdateProjeto({ projeto, onUpdateProjeto, onDeleteProjeto }) {

    const [cliente, setCliente] = useState(projeto.cliente);
    const [nomeProjeto, setNomeProjeto] = useState(projeto.nomeProjeto);
    const [projetista, setProjetista] = useState(projeto.projetista);
    const [verificador, setVerificador] = useState(projeto.verificador);
    const [numPedido, setNumPedido] = useState(projeto.numPedido);
    const [responsavel, setResponsavel] = useState(projeto.responsavel);
    const [tipoEngenharia, setTipoEngenharia] = useState(projeto.tipoEngenharia);

    const [disciplina, setDisciplina] = useState(projeto.disciplina);
    const [revisao, setRevisao] = useState(projeto.revisao);
    const [numNosso, setNumNosso] = useState(projeto.numNosso);
    const [numCliente, setNumCliente] = useState(projeto.numCliente);
    const [formato, setFormato] = useState(projeto.formato);
    const [descricao, setDescricao] = useState(projeto.descricao);
    //const [objetivo, setObjetivo] = useState([projeto.objetivo]);
    //const [arquivado, setArquivado] = useState(projeto.arquivado);

    //===========================================================================

    async function handleDeletar(id) {
        await onDeleteProjeto(id);
    }

    //===========================================================================

    async function handleUpdate(id) {
        await onUpdateProjeto(id, {
            cliente,
            nomeProjeto,
            projetista,
            verificador,
            numPedido,
            responsavel,
            tipoEngenharia,
            revisao,
            numNosso,
            numCliente,
            formato,
            descricao,
            disciplina
        });
    }

    //===========================================================================

    function adicionarCampos() {

        let updateForm = document.getElementsByClassName('update-form')[0];
        const length = projeto.numNosso.length;
        let aux = 0;

        do {
            updateForm.innerHTML += `
            <div className="dados">
                <div className="input-block">
                    <label htmlFor="disciplina">
                        Disciplina
                    </label>
                    <input 
                        type="text" 
                        name="disciplina"
                        value=${disciplina[aux]}
                        onChange=${e => setDisciplina(e.target.value)} 
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="revisao">
                        Revisão
                    </label>
                    <input 
                        type="text" 
                        name="revisao"
                        value=${revisao[aux]}
                        onChange=${e => setRevisao(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="numNosso">
                        Número nosso
                    </label>
                    <input 
                        type="text" 
                        name="numNosso"
                        value=${numNosso[aux]}
                        onChange=${e => setNumNosso(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="numCliente">
                        Número do cliente
                    </label>
                    <input 
                        type="text" 
                        name="numCliente"
                        value=${numCliente[aux]}
                        onChange=${e => setNumCliente(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="formato">
                        Formato
                    </label>
                    <input 
                        type="text" 
                        name="formato"
                        value=${formato[aux]}
                        onChange=${e => setFormato(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="descricao">
                        Descrição
                    </label>
                    <input 
                        type="text" 
                        name="descricao"
                        value=${descricao[aux]}
                        onChange=${e => setDescricao(e.target.value)}
                    />
                </div>
            </div>
            `;
            aux++;
        } while(aux < length);

        return (
            console.log(projeto)
        );
    }

    //===========================================================================

    return(
        <>
        <div className="update-item">
            <div id={projeto._id} className="grid-container">
            <form className="update-form">
                <div className="input-block">
                    <label htmlFor="cliente">
                        Cliente
                    </label>
                    <input 
                        type="text" 
                        name="cliente"
                        id="cliente"
                        required
                        value={cliente}
                        onChange={e => setCliente(e.target.value)}
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

                <hr/>
                </form>

                <ul>
                    {projeto.numNosso.map(projeto => (
                        console.log(projeto)
                        /*
                        <ListItemInfo 
                            key={String(projeto._id)}
                            props={projeto}
                        />
                        */
                    ))}
                </ul>

{ /* ================================================================================================ */ }
                <div className="div-buttons">
                    <button
                        type="button"
                        className="btn-adicionarCampos"
                        onClick={() => {adicionarCampos();}}
                    >
                        +
                    </button>
                    <button
                        type="submit"
                        className="btn-deletar"
                        onClick={(e) => {handleDeletar(projeto._id); e.preventDefault();}}
                    >
                        Deletar
                    </button>
                    <button
                        type="submit"
                        className="btn-salvar"
                        onClick={(e) => {handleUpdate(projeto._id); e.preventDefault();}}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default UpdateProjeto;
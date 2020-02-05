import React, { useState } from 'react';

import './CadastrarProjeto.css';

function CadastrarProjeto({ onSubmit }) {
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [nomeProjeto, setNomeProjeto] = useState('');
    const [disciplina, setDisciplina] = useState('');
    const [area, setArea] = useState('');
    const [codigo, setCodigo] = useState('');
    const [projetista, setProjetista] = useState('');
    const [verificador, setVerificador] = useState('');
    const [numPedido, setNumPedido] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [revisao, setRevisao] = useState('');
    const [numNosso, setNumNosso] = useState('');
    const [numCliente, setNumCliente] = useState('');
    const [formato, setFormato] = useState('');
    const [descricao, setDescricao] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const [tipoEngenharia, setTipoEngenharia] = useState('');
    //const [fileToUpload_path, setFileToUpload_path] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
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
            tipoEngenharia
        });
    }

    return(

        <div className="cadastrar">
            <h2>
                <strong>CADASTRO</strong>
            </h2>
            <form onSubmit={handleSubmit}>

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

                {/* 
                    <div className="input-block">
                        <label htmlFor="tipoEngenharia">
                            Tipo de engenharia
                        </label>
                        <input 
                            type="file" 
                            name="fileToUpload"
                            id="fileToUpload"
                            value={fileToUpload_path}
                            onChange={e => setFileToUpload_path(e.target.value)}
                        />
                    </div>
                */}

                <button type="submit">
                    Cadastrar novo projeto
                </button>
            </form>
        </div>
        
    );
}

export default CadastrarProjeto;
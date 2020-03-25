import React, { useState } from 'react';

import './Login.css';
import logoImage from '../assets/fullE_icon.png';

function Login({ onSubmit }) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    let btnLogin = document.getElementById('btnLogin');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if ((email === '') || (senha === '')) throw new Error('Usuário ou senha vazios');
            if (!(/@fullengenharia.com/.test(email))) throw new Error('E-mail errado');

            await onSubmit({
                email,
                senha
            });
        } catch(err) {
            btnLogin.setAttribute('style', '');
            return alert(err);
        }
    }

    // Essa função é responsável por mudar a aparência do botão que faz submit do formulário
    // de login, evitando que o usuário tente clicar mais que uma vez neste componente.
    function disableButton() {
        btnLogin.setAttribute('style', `
            background-color: #ccc;
            cursor: not-allowed;`);
    }

    return(
        <div className="login">
            <img src={logoImage} alt="Logo da Full Engenharia"/>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Login</legend>
                    <hr/>
                    <span>E-mail:</span>
                    <input 
                        type="text" 
                        onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
                        value={email}
                        id="email-login"
                    />
                    <span>Senha:</span>
                    <input 
                        type="password" 
                        onChange={(e) => setSenha(e.target.value.trim().toLowerCase())}
                        value={senha}
                        id="senha-login"
                    />
                    <button type="submit" id="btnLogin" onClick={() => {disableButton()}}>
                        Logar
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

export default Login;
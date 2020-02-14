import React, { useState } from 'react';

import './Login.css';
import logoImage from '../assets/fullE_icon.png';

function Login({ onSubmit }) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            email,
            senha
        });
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
                    <button type="submit">
                        Logar
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

export default Login;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import Footer from '../../components/Footer';

import './styles.css';

export default function Login() {
    const [login, setLogin] = useState('');
    const history = useHistory();

    async function signIn(e) {
        e.preventDefault();

        const data = {
            login
        };
        
        try {
            const response = await api.post('/', data);

            if(!response.data.login) {
                alert('Username not exists');
                setLogin('');
            }

            localStorage.setItem('github_username', response.data.name || response.data.login)

            history.push(`/listrepos/${response.data.login}`);
            
        } catch(err) {
            alert('Username not exists');
        }
    }
    
    return (
        <>
            <header className="github-image">

                <p>See your Repositories</p>
            </header>
            <form onSubmit={signIn}>
                <div className="login-container">
                    <header>Sign in to see your Repos!</header>
                    <p>Username</p>
                    <input 
                        onChange={e => setLogin(e.target.value)}
                        value={login}   
                    />

                    <button className="sign-button" type="submit" >Sign in</button>
                </div>
            </form>
            <div className="footer">
                New to GitHub?<a href="https://github.com/join">Create an account.</a>
            </div>
            <Footer />
        </>
    );
}
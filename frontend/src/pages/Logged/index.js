import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi';
import { GoMarkGithub } from 'react-icons/go';

import './styles.css';

export default function Logged(props) {
    const [repos, setRepos] = useState([]);
    const [link, setLink] = useState('');
    const { id } = props.match.params;

    useEffect(() => {
        userIsLogged();
    }, []);

    async function userIsLogged(e) {
        //e.preventDefault();
        const response = await api.get(`/list/${id}`);
        
        setRepos(response.data);

        console.log(response.data)
        
        setLink(response.data[0].owner.html_url);
    }
    
    function openNewTabOnGitHubProfile() {
        window.open(link);
    }

    return (
        <>
            <header className="logged-container">
                <Link to="/">
                    <FiArrowLeft size={33} ></FiArrowLeft>
                </Link>
                <span>Your Repositories, {id}</span>
                <button onClick={openNewTabOnGitHubProfile}>
                    <GoMarkGithub size={40} ></GoMarkGithub>
                </button>
            </header>
            <main>
                {repos.map(repo => (
                    <ul key={repo.id} className="list-container">
                        <div  className="repo-container">
                            <header>
                                <img src={repo.owner.avatar_url} alt={repo.owner.name}/>
                                {repo.name}
                                
                            </header>
                            <span className="description">{repo.description}</span>
                            
                                <a href={repo.html_url}>Acesse este repositório.</a>
                            
                            
                            <footer>
                                <span>{repo.language || 'Undefined language'}</span>
                                {('Not a license' && !repo.license) || repo.license.name}                                    
                            </footer>
                        </div>
                    </ul>
                ))}
            </main>
        </>  
    );
}

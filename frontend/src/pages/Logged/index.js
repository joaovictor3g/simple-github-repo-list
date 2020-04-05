import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import { FiPower, FiArrowLeft } from 'react-icons/fi';

import './styles.css';

export default function Logged(props) {
    const [repos, setRepos] = useState([]);
    const { id } = props.match.params;

    useEffect(() => {
        userIsLogged();
    }, []);

    async function userIsLogged(e) {
        //e.preventDefault();
        const response = await api.get(`/list/${id}`);
        setRepos(response.data);

        console.log(response.data);
    }  

    return (
        <>
            <div className="logged-container">
                <Link to="/">
                    <FiArrowLeft size={33} ></FiArrowLeft>
                </Link>
                <header>Your Repositories, {id}</header>
            </div>
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
                                <span>{repo.language || 'Not a language defined'}</span>
                                {('Not a license' && !repo.license) || repo.license.name}                                    
                            </footer>
                        </div>
                    </ul>
                ))}
            </main>
        </>  
    );
}

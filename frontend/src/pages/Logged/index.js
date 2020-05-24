import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { GoMarkGithub, GoRepoForked } from 'react-icons/go';
import { FaStar } from 'react-icons/fa';

import './styles.css';

export default function Logged(props) {
    const [repos, setRepos] = useState([]);
    const [link, setLink] = useState('');
    const [img, setImage] = useState('');
    const { id } = props.match.params;
    const username = localStorage.getItem('github_username');

    useEffect(() => {
        userIsLogged();// eslint-disable-next-line
    }, []); 

    async function userIsLogged(e) {
        try {
            const response = await api.get(`/list/${id}`); 
            setRepos(response.data);
            setLink(response.data[0].owner.html_url);
            setImage(response.data[0].owner.avatar_url);

        
        } catch(err) {
            setRepos('');
        }
    }
    
    function openNewTabOnGitHubProfile() {
        window.open(link);
    }
    
    return (
        <>
            <header className="logged-container">
                <Link to="/" onClick={() => localStorage.clear()}>
                    <FiArrowLeft size={33} ></FiArrowLeft>
                </Link>
                <span>Your Repositories, {username}</span>
                <button onClick={openNewTabOnGitHubProfile}>
                    <GoMarkGithub size={40} />
                </button>
            </header>
            <main>
                {(!repos && <span className="no-repo-found">No repositories found</span>) || repos.map(repo => (
                    <ul key={repo.id} className="list-container">
                        <div  className="repo-container">
                            <header>
                                <img src={img} alt={repo.owner.name}/>
                                <p>{repo.name}</p>
                                
                            </header>
                            { repo.description &&
                                <span className="description"><p>Description:</p>  {repo.description}</span>
                            }
                            <table border="1" className="language-license">
                                <tbody>
                                    <tr className="header-tr">
                                        <td>Language</td>
                                        <td>License</td>                                   
                                        <td><FaStar size={18} color="#FFF"/> </td>
                                        <td><GoRepoForked size={18} /></td>
                                    </tr>
                                    <tr>
                                        <td>{repo.language || 'Undefined language'}</td>  
                                        <td>{(!repo.license && 'No license') ||repo.license.name}</td>
                                        <td> {repo.stargazers_count}</td>
                                        <td>{repo.forks_count}</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <a href={repo.html_url}>ACCESS THIS REPOSITORY<FiArrowRight size={20} /></a>
                        </div>
                    </ul>
                ))} 
            </main>
        </>  
    );
}

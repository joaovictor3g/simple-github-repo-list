import React from 'react';
import { GoMarkGithub } from 'react-icons/go';

import './styles.css';

export default function Footer() {
    function myProfile() {
        window.open('https://github.com/joaovictor3g');
    }
    
    return (
        <footer className="footer-final" >
        <p>My Profile on GitHub:</p> 
        <button onClick={myProfile} className="btn-final">
            <GoMarkGithub size={40} />
        </button>
    </footer>
    )
}

import React from 'react';
import './Footer.css';

export default props => (
    <footer className="footer">
        <p className="footer-name">Made by Ariann Michael</p>

        <div className="footer-btn">    
            <button className="btn" href="https://github.com/ariannmichael">
                <i className="fab fa-github fa-2x"></i>
            </button>
            <button className="btn" href="https://www.linkedin.com/in/ariann-michael-farias-96258711a/">
                <i className="fab fa-linkedin fa-2x"></i>
            </button>
        </div>
    </footer>
);
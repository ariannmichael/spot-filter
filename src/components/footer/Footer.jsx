import React from 'react';
import './Footer.css'

export default props => (
    <footer className="footer">
        <div className="footer-items">
            <div className="footer-name">
                <p className="footer-name-item">Made by Ariann Michael</p>
            </div>

            <div className="footer-buttons">
                <a className="btn btn-footer" href="https://github.com/ariannmichael">
                    <i className="fab fa-github fa-2x"></i>
                </a>
                <a className="btn btn-footer" href="https://www.linkedin.com/in/ariann-michael-farias-96258711a/">
                    <i className="fab fa-linkedin fa-2x"></i>
                </a>
            </div>
        </div>
    </footer>
);
import React from 'react';
import './Footer.css';

export default props => (
    <footer className="footer">
        <div className="container">
            <div className="row align-item-center">
                <div className="col-lg-10">
                    <p className="footer-name">Made by Ariann Michael</p>
                </div>
                <div className="col-lg-2">
                    <button className="btn btn-footer" href="https://github.com/ariannmichael">
                        <i className="fab fa-github fa-2x"></i>
                    </button>
                    <button className="btn btn-footer" href="https://www.linkedin.com/in/ariann-michael-farias-96258711a/">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </button>
                </div>
            </div>
        </div>

    </footer>
);
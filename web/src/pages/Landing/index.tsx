import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/img/logo.svg';
import logoLanding from '../../assets/img/landing.svg';
import studyIcon from '../../assets/img/icons/study.svg';
import giveClassesIcon from '../../assets/img/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/img/icons/purple-heart.svg';
import api from '../../services/api';

import './styles.css';

export const Landing = () => {
    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('/connections').then(({ data: { total } }) => setTotalConnections(total));
    }, []);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logo} alt="Proffy" />
                    <h2>Sua plataforma de estudos e ensino online</h2>
                </div>
                <img className="hero-image" src={logoLanding} alt="Plataforma de ensino e estudos" />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar" />
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar aulas" />
                        Dar aulas
                    </Link>
                </div>
                <span className="total-connections">
                    Total de {totalConnections} conexões realizadas <img src={purpleHeartIcon} alt="Ensinar" />
                </span>
            </div>
        </div>
    );
};

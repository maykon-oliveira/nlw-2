import React from 'react';

import { Link } from 'react-router-dom';

import logoIcon from '../../assets/img/logo.svg';
import backIcon from '../../assets/img/icons/back.svg';

import './styles.css';

interface PageHeaderProps {
    title: string;
    description?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }) => (
    <header className="page-header">
        <div className="top-bar-container">
            <Link to="/">
                <img src={backIcon} alt="Voltar" />
            </Link>
            <img src={logoIcon} alt="Proffy" />
        </div>
        <div className="header-content">
            <strong>{title}</strong>

            {description && <p>{description}</p>}

            {children}
        </div>
    </header>
);

import React from 'react';

import whatsappIcon from '../../assets/img/icons/whatsapp.svg';

import './styles.css';

interface TeacherItemProps {
    name: string;
    profileImg: string;
    subject: string;
    description: string;
    pricePerHour: string;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ name, profileImg, subject, description, pricePerHour }) => {
    return (
        <article className="teacher-item">
            <header>
                <img src={profileImg} alt={name} />
                <div>
                    <strong>{name}</strong>
                    <span>{subject}</span>
                </div>
            </header>
            <p>{description}</p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {pricePerHour}</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
};

export default TeacherItem;

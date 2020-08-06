import React from 'react';

import whatsappIcon from '../../assets/img/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

interface TeacherItemProps {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    user_id: 9;
    whatsapp: string;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ id, name, avatar, subject, bio, cost, whatsapp }) => {
    const incrementConnection = () => {
        api.post('/connections', {
            user_id: id,
        });
    };
    return (
        <article className="teacher-item">
            <header>
                <img src={avatar} alt={name} />
                <div>
                    <strong>{name}</strong>
                    <span>{subject}</span>
                </div>
            </header>
            <p>{bio}</p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {cost}</strong>
                </p>
                <a target="_black" onClick={incrementConnection} href={`https://wa.me/${whatsapp}`}>
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
};

export default TeacherItem;

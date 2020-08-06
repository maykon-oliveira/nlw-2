import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { PageHeader } from '../../components/PageHeader';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { TextArea } from '../../components/TextArea';

import api from '../../services/api';

import warningIcon from '../../assets/img/icons/warning.svg';
import './styles.css';

export const TeacherForm = () => {
    const history = useHistory();

    const [teacher, setTeacher] = useState({ name: '', avatar: '', whatsapp: '', bio: '' });

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([{ week_day: 0, from: '', to: '' }]);

    const handleInputChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setTeacher({ ...teacher, [name]: value });

    const setScheduleItemValue = (position: Number, field: string, value: string) => {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    };

    const handleCreateClass = (e: FormEvent) => {
        e.preventDefault();

        api.post('/classes', {
            ...teacher,
            subject,
            cost: Number(cost),
            schedule: scheduleItems,
        })
            .then(() => {
                alert('Cadastro realizado com sucesso!');
                history.push('/');
            })
            .catch(() => {
                alert('Erro no cadastro');
            });
    };

    const addNewScheduleItem = () => setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O Primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                            value={teacher.name}
                            onChange={handleInputChange}
                            required
                        />

                        <Input
                            name="avatar"
                            label="Avatar"
                            value={teacher.avatar}
                            onChange={handleInputChange}
                            required
                        />

                        <Input
                            name="whatsapp"
                            label="WhatsApp"
                            value={teacher.whatsapp}
                            onChange={handleInputChange}
                            required
                        />

                        <TextArea
                            name="bio"
                            label="Biografia"
                            value={teacher.bio}
                            onChange={handleInputChange}
                            required
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value);
                            }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Educação física', label: 'Educação física' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'História', label: 'História' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Química', label: 'Química' },
                            ]}
                            required
                        />
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => {
                                setCost(e.target.value);
                            }}
                            required
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo Horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, i) => {
                            return (
                                <div key={i} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={(e) => setScheduleItemValue(i, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                        required
                                    />

                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={(e) => setScheduleItemValue(i, 'from', e.target.value)}
                                        required
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={(e) => setScheduleItemValue(i, 'to', e.target.value)}
                                        required
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    );
};

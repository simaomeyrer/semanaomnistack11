import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {FiArrowLeft} from 'react-icons/fi'
import './styles.css';
import logoImg from '../../assets/logo.svg'
import  api from '../../services/api'


export default function NewIncident() {
    const [tittle, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            tittle,
            description,
            value,
        };

        try {
            await api.post('/incidents', data, {
                headers: {
                    authorization: ongId,
                }
            })

            history.push('/profile');
        }catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }  

    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Logo"/>

                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                <Link to="/profile" className="back-link">
                    <FiArrowLeft size={16} color="E02041" />
                    Voltar para home
                </Link>
            </section>

            <form onSubmit={handleNewIncident}>
                <input 
                placeholder="Título do caso" 
                    value={tittle}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea 
                placeholder="Descrição" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input 
                placeholder="Valor em Reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />

                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}
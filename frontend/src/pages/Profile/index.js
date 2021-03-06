import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiArrowDown, FiTrash2 } from 'react-icons/fi';
import  api from '../../services/api'

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    
    const history = useHistory();
    
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('profile', {
            headers: {
                authorization: ongId,
            }    
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch (err){
            alert('Erro ao deletar registro, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo" />
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="incidents/new">Cadastrar novo caso</Link>
                
                <div className="actionButtons">
                    <button onClick={handleLogout} type="button" id="logOut">
                        <Link to='/'>
                            <FiPower size={18} color="#E02041" />
                        </Link>
                    </button>

                    <button type="button" id="deleteProfile">
                        <Link to='/'>
                            <FiArrowDown size={18} color="#E02041" />
                        </Link>
                    </button>
                </div>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.tittle}</p>

                    <strong>DESCRIÇÃO</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat(
                        'pt-BR',
                        { style: 'currency', currency: 'BRL' }).format(incident.value)}
                    </p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>   
                ))}
        
            </ul>

        </div>
    );
}
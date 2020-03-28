import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css'
import api from '../../services/api'
import logoImg from '../../assets/images/logo.svg'

export default function Profile() {
    const history = useHistory()
    const [incidents, setIncidents] = React.useState([])
    const ong = localStorage.getItem('ong')
        ? JSON.parse(localStorage.getItem('ong'))
        : null

    React.useEffect(() => {
        api.get('incidents').then((response) => {
            setIncidents(response.data)
        })
    }, [])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`)

            setIncidents(incidents.filter((incident) => incident.id !== id))
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente')
        }
    }

    function handleLogout() {
        localStorage.clear()

        history.push('/')
    }

    if (!ong) return null

    return (
        <div className='profile-container'>
            <header>
                <img src={logoImg} alt='Be The Hero' />
                <span>Bem vinda, {ong.name}</span>

                <Link className='btn' to='/incidents/new'>
                    Cadastrar novo caso
                </Link>

                <button type='button' onClick={handleLogout}>
                    <FiPower size={18} color='#e02041' />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map((incident) => (
                    <li key={incident.id}>
                        <strong>Caso</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição</strong>
                        <p>{incident.description}</p>

                        <strong>Valor</strong>
                        <p>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(incident.value)}
                        </p>

                        <button
                            type='button'
                            onClick={() => handleDeleteIncident(incident.id)}
                        >
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

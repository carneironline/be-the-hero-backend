import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'
import api from '../../services/api'
import logoImg from '../../assets/images/logo.svg'

export default function NewIncident() {
    const history = useHistory()
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [value, setValue] = React.useState('')

    async function handleNewIncident(e) {
        e.preventDefault()

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('incidents', data)
            history.push('/profile')
        } catch (error) {
            console.log('Erro ao cadastrar caso, tente novamente')
        }
    }

    return (
        <div className='new-incident-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='Be The Hero' />

                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói
                        para resolver isso.
                    </p>

                    <Link className='back-link' to='/profile'>
                        <FiArrowLeft size={16} color='#02041' />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        type='text'
                        placeholder='Título do caso'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        type='text'
                        placeholder='Descrição'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Valor em reais'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                    <button className='btn' type='submit'>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}

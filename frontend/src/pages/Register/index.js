import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import logoImg from '../../assets/images/logo.svg'

import './styles.css'

export default function Register() {
    const history = useHistory()
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [whatsapp, setWhatsapp] = React.useState('')
    const [city, setCity] = React.useState('')
    const [uf, setUf] = React.useState('')

    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        }

        try {
            const response = await api.post('ongs', data)

            alert(`Seu ID de acesso ${response.data.id}`)

            history.push('/')
        } catch (error) {
            alert('Erro no cadastro')
        }
    }

    return (
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='Be The Hero' />

                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro, entre na plataforma e ajude pessoas a
                        encontrarem os casos da sua
                    </p>

                    <Link className='back-link' to='/'>
                        <FiArrowLeft size={16} color='#02041' />
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        type='text'
                        placeholder='Nome da ONG'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='email'
                        placeholder='E-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Whatsapp'
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                    />
                    <div className='input-group'>
                        <input
                            type='text'
                            placeholder='Cidade'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='UF'
                            style={{ width: 80 }}
                            value={uf}
                            onChange={(e) => setUf(e.target.value)}
                        />
                    </div>

                    <button className='btn' type='submit'>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}

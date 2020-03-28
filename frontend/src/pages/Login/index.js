import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import './styles.css'
import api, { setAuthorization } from '../../services/api'
import logoImg from '../../assets/images/logo.svg'
import heroesImg from '../../assets/images/heroes.png'

export default function Login() {
    const history = useHistory()
    const [id, setId] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('sessions', { id })

            localStorage.setItem(
                'ong',
                JSON.stringify({ id, name: response.data.name })
            )

            setAuthorization()

            history.push('/profile')
        } catch (error) {
            setErrorMessage('Falha no login, tente novamente.')

            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        }
    }

    return (
        <div className='logon-container'>
            <section className='form'>
                <img src={logoImg} alt='Heroes' />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input
                        type='text'
                        placeholder='Sua ID'
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <button
                        className='btn'
                        type='submit'
                        disabled={errorMessage}
                    >
                        {errorMessage || 'Entrar'}
                    </button>

                    <Link className='back-link' to='/register'>
                        <FiLogIn size={16} color='#02041' />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt='Heroes' />
        </div>
    )
}

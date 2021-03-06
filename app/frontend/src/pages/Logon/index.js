import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'
import './styles.css'

export default function Logon() {

    const [ id, setId ] = useState('')

    const history = useHistory()

    async function handleLogon(e) {
        e.preventDefault()

        try{
            const resp = await api.post('sessions', { id })

            console.log(resp.data.name)

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', resp.data.name)

            history.push('/profile')
        } catch (err) {
            alert('Falha no Logon. Tente novamente!')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={ logoImg } alt='Be The Hero' />
                
                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon</h1>

                    <input 
                        placeholder='Sua ID' 
                        value={id}
                        onChange={e => setId(e.target.value)}    
                    />
                    <button type='submit' className='button'>Entrar</button>

                    <Link className='back-link' to='/register'>
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro!
                    </Link>
                </form>
            </section>

            <img src={ heroesImg } alt='Heroes' />

        </div>
    )
}

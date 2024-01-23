import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import { useEffect } from 'react'
import { useToken } from '../../../hooks/useToken'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { ToastContainer } from 'react-toastify'

const ProtectedLayout = () => {
    const user = useToken()
    const navigate = useNavigate()

    useEffect(() => {
        !user && navigate('/')
    })

    return (
        <Container>
            <CssBaseline />
            <Header />
            <Container component="main">
                <Outlet />
            </Container>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                draggable
                theme="light"
            />
        </Container>
    )
}

export default ProtectedLayout

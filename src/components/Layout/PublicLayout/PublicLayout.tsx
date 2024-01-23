import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Outlet />
        </Container>
    )
}

export default PublicLayout

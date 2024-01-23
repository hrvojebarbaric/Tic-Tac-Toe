import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { logOut } from '../../../api/user'
import { useToken } from '../../../hooks/useToken'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'

const Header = () => {
    const user = useToken()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const handleLogOut = () => {
        logOut(user!)
        queryClient.clear()
        window.localStorage.clear()
        navigate('/')
    }

    return (
        <MuiAppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: 'flex' }}>
                        Tic Tac Toe
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Typography variant="subtitle2">Welcome {user?.data?.username}</Typography>
                        {!!user && (
                            <MenuItem key={'logout'} onClick={handleLogOut}>
                                <PowerSettingsNewIcon />
                            </MenuItem>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </MuiAppBar>
    )
}

export default Header

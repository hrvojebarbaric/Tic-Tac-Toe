import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { LogInRegisterFormProps } from './LogInRegisterForm.types'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const LogInRegisterForm = (props: LogInRegisterFormProps) => {
    const { handleSubmit, isLogIn } = props
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Tic Tac Toe
            </Typography>
            <Box
                component="form"
                name="login"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, textAlign: 'left' }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="User name"
                    name="username"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
                {isLogIn ? (
                    <FormControlLabel
                        control={<Checkbox value="true" name="rememberMe" color="primary" />}
                        label="Remember me"
                    />
                ) : null}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    {isLogIn ? 'Log in' : 'Register'}
                </Button>
                <Grid container>
                    <Grid item>
                        {isLogIn ? (
                            <Link to={'/register'}>{"Don't have an account? Sign Up"}</Link>
                        ) : null}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default LogInRegisterForm

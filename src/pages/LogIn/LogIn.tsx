import { useQuery } from '@tanstack/react-query'
import { getUser } from '../../api/user'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogInUser } from '../../types/users'
import CircularProgress from '@mui/material/CircularProgress'
import LogInRegisterForm from '../../components/LogInRegisterForm/LogInRegisterForm'

const RegisterLogIn = () => {
    const user = useRef<LogInUser>({ username: '', password: '', rememberMe: '' })
    const navigate = useNavigate()

    const query = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser('login', user.current),
        enabled: false,
        gcTime: 40 * 60 * 1000,
    })

    if (query.isLoading)
        return (
            <CircularProgress
                sx={{ my: 2, position: 'absolute', right: '50%', top: '40%' }}
                color="primary"
            />
        )

    if (query.isError) return <div>Opsss! Something went wrong.</div>

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        user.current = {
            username: formData.get('username') as string,
            password: formData.get('password') as string,
            rememberMe: formData.get('rememberMe') as string,
        }
        user.current &&
            query.refetch().then((data) => {
                user.current.rememberMe &&
                    window.localStorage.setItem('user', JSON.stringify(data.data))
                navigate('/GameList')
            })
    }

    return <LogInRegisterForm isLogIn={true} handleSubmit={handleSubmit} />
}

export default RegisterLogIn

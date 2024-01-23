import { useQuery } from '@tanstack/react-query'
import { getUser } from '../../api/user'
import { LogInUser } from '../../types/users'
import { useRef } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import LogInRegisterForm from '../../components/LogInRegisterForm/LogInRegisterForm'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const user = useRef<LogInUser>({ username: '', password: '', rememberMe: '' })
    const navigate = useNavigate()
    const query = useQuery({
        queryKey: ['register'],
        queryFn: () => getUser('register', user.current),
        enabled: false,
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
            query.refetch().then(() => {
                navigate('/')
            })
    }

    return <LogInRegisterForm handleSubmit={handleSubmit} />
}

export default Register

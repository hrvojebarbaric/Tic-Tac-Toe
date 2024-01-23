import axios from 'axios'
import { CurrentUser } from '../types/users'

type user = {
    username: string
    password: string
}

export const getUser = async (url: string, user: user) => {
    const { username, password } = user
    const response = await axios.post(`https://tictactoe.aboutdream.io/${url}/`, {
        username: username,
        password: password,
    })
    return response
}

export const logOut = async (user: CurrentUser) => {
    const response = await axios.post(
        `https://tictactoe.aboutdream.io/logout/`,
        { ...user.data },
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.data.token}`,
            },
        }
    )
    return response.data
}

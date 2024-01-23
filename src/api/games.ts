import axios from 'axios'
import { CurrentUser } from '../types/users'

export const getGames = async (token: string, limit: number, offset: number) => {
    const link = offset === 0 ? `?limit=${limit}` : `?limit=${limit}&offset=${offset}`
    const response = await axios.get(`https://tictactoe.aboutdream.io/games/${link}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

export const createGame = async (user: CurrentUser) => {
    const response = await axios.post(
        'https://tictactoe.aboutdream.io/games/',
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

export const playGame = async (user: CurrentUser, id: string) => {
    const response = await axios.get(`https://tictactoe.aboutdream.io/games/${id}/`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${user.data.token}`,
        },
    })
    return response.data
}

export const makeMove = async (user: CurrentUser, id: string, moveObject: any) => {
    const response = await axios.post(
        `https://tictactoe.aboutdream.io/games/${id}/move/`,
        moveObject,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.data.token}`,
            },
        }
    )
    return response.data
}

export const joinGame = async (user: CurrentUser, id: string) => {
    const response = await axios.post(
        `https://tictactoe.aboutdream.io/games/${id}/join/`,
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

import { useQuery } from '@tanstack/react-query'
import { useToken } from '../../hooks/useToken'
import { CurrentUser } from '../../types/users'
import { makeMove, playGame } from '../../api/games'
import { useParams } from 'react-router-dom'
import Board from '../../components/Board/Board'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Alert, Box, Typography } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { Move } from '../../components/Board/Cell/Cell.types'
import CircularProgress from '@mui/material/CircularProgress'

const PlayGame = () => {
    const user = useToken()
    const { id } = useParams()
    const query = useQuery({
        queryKey: ['PlayGame', id],
        queryFn: () => playGame(user as CurrentUser, id!),
        refetchInterval: 2000,
    })

    if (query.isLoading)
        return (
            <CircularProgress
                sx={{ my: 2, position: 'absolute', right: '50%', top: '40%' }}
                color="primary"
            />
        )
    if (query.isError) return <div>Opsss! Something went wrong.</div>

    const handleClick = (move: Move) => {
        makeMove(user as CurrentUser, id!, move).catch((error) => {
            toast.error(error.response.data.errors[0].message, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
        })
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {query.data.winner && (
                <Box width="100%" mt={2}>
                    <Alert severity="success">
                        <Box display="flex">
                            <EmojiEventsIcon fontSize="large" />
                            <Typography ml={1} component="h1" variant="h5">
                                {query.data.winner.username}
                            </Typography>
                        </Box>
                    </Alert>
                </Box>
            )}
            <Board
                boardArray={query.data.board}
                firstPlayer={query.data.first_player}
                secondPlayer={query.data.second_player}
                handleClick={handleClick}
            />
        </Box>
    )
}

export default PlayGame

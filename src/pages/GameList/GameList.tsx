import { useQuery } from '@tanstack/react-query'
import { createGame, getGames, joinGame } from '../../api/games'
import { useNavigate } from 'react-router-dom'
import { useToken } from '../../hooks/useToken'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Pagination from '@mui/material/Pagination'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

const GameList = () => {
    const user = useToken()
    const [page, setPage] = useState(1)
    const [limit] = useState(10)
    const [offSet, setOffSet] = useState(0)
    const navigate = useNavigate()

    const query = useQuery({
        queryKey: ['games', page],
        queryFn: () => getGames(user?.data.token as string, limit, offSet),
    })

    if (query.isLoading)
        return (
            <CircularProgress
                sx={{ my: 2, position: 'absolute', right: '50%', top: '40%' }}
                color="primary"
            />
        )
    if (query.isError) return <div>Opsss! Something went wrong.</div>

    const handleJoinGame = (id: string) => {
        joinGame(user!, id!).then(() => navigate(`/PlayGame/${id}`))
    }

    const handleCreateGame = () => {
        createGame(user!)
            .then(() => query.refetch())
            .then((data) => navigate(`/PlayGame/${data.data.results[0].id}`))
    }

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setOffSet((value - 1) * 10)
        setPage(value)
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        {
            field: 'first_player',
            headerName: 'First Player',
            flex: 1,
            valueGetter: (params) => params.row.first_player?.username,
        },
        {
            field: 'second_player',
            headerName: 'Second Player',
            flex: 1,
            valueGetter: (params) => params.row.second_player?.username,
        },
        {
            field: 'status',
            headerName: 'Status',
            type: 'string',
        },
        {
            field: 'winner',
            headerName: 'Winner',
            valueGetter: (params) => params.row.winner?.username,
        },
        {
            field: 'created',
            headerName: 'Created',
            valueGetter: (params) => {
                const date = new Date(params.row.created)
                return date.toLocaleDateString('hr-HR')
            },
        },
        {
            field: 'playGame',
            headerName: '',
            renderCell: (params) => {
                return params.row.status === 'finished' ? (
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => navigate(`/PlayGame/${params.id}`)}
                    >
                        See game
                    </Button>
                ) : params.row.first_player?.id === user?.data.id ||
                  params.row.second_player?.id === user?.data.id ? (
                    <Button
                        size="small"
                        color="warning"
                        variant="contained"
                        onClick={() => navigate(`/PlayGame/${params.id}`)}
                    >
                        Play game
                    </Button>
                ) : (
                    <Button
                        size="small"
                        color="success"
                        variant="contained"
                        onClick={() => handleJoinGame(params.id.toString())}
                    >
                        Join game
                    </Button>
                )
            },
        },
    ]

    return (
        <>
            <Button sx={{ my: 2 }} color="error" variant="contained" onClick={handleCreateGame}>
                Create new game
            </Button>
            <Box width="100%">
                <DataGrid rows={query.data.results} columns={columns} hideFooter={true} />
                <Pagination
                    sx={{ my: 2 }}
                    count={Math.ceil(query.data.count / limit)}
                    page={page}
                    onChange={handleChange}
                />
            </Box>
        </>
    )
}

export default GameList

import Grid from '@mui/material/Grid'
import CloseIcon from '@mui/icons-material/Close'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import { CellProps, Move } from './Cell.types'

const Cell = (props: CellProps) => {
    const { row, index, handleClick, firstPlayerId, secondPlayerId, itemId } = props
    const move: Move = { row: row, col: index }

    return (
        <Grid
            height={150}
            width={150}
            item
            xs={4}
            border={'1px black solid'}
            onClick={() => handleClick(move)}
            borderBottom={row === 0 || row === 1 ? 2 : 0}
            borderTop={0}
            borderLeft={0}
            borderRight={index === 0 || index === 1 ? 2 : 0}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            {firstPlayerId === itemId && <CloseIcon fontSize="large" />}
            {secondPlayerId === itemId && <PanoramaFishEyeIcon fontSize="large" />}
        </Grid>
    )
}

export default Cell

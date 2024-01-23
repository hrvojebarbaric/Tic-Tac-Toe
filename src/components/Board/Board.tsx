import Grid from '@mui/material/Grid'
import { BoardProps } from './Board.types'
import Cell from './Cell/Cell'

const Board = (props: BoardProps) => {
    const { boardArray, firstPlayer, secondPlayer, handleClick } = props

    const firstRow = boardArray[0]
    const secondRow = boardArray[1]
    const thirdRow = boardArray[2]

    return (
        <Grid container marginTop={5} width={450}>
            {firstRow.map((item, index) => (
                <Cell
                    key={`firstRow-${index}`}
                    row={0}
                    index={index}
                    handleClick={handleClick}
                    firstPlayerId={firstPlayer?.id}
                    secondPlayerId={secondPlayer?.id}
                    itemId={item}
                />
            ))}
            {secondRow.map((item, index) => (
                <Cell
                    key={`secondRow-${index}`}
                    row={1}
                    index={index}
                    handleClick={handleClick}
                    firstPlayerId={firstPlayer?.id}
                    secondPlayerId={secondPlayer?.id}
                    itemId={item}
                />
            ))}
            {thirdRow.map((item, index) => (
                <Cell
                    key={`thirdRow-${index}`}
                    row={2}
                    index={index}
                    handleClick={handleClick}
                    firstPlayerId={firstPlayer?.id}
                    secondPlayerId={secondPlayer?.id}
                    itemId={item}
                />
            ))}
        </Grid>
    )
}

export default Board

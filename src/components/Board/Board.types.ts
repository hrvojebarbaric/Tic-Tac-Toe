import { Move } from './Cell/Cell.types'

export type BoardProps = {
    boardArray: [number[], number[], number[]]
    firstPlayer: {
        id: number
        username: string
    }
    secondPlayer: {
        id: number
        username: string
    }
    handleClick: (move: Move) => void
}

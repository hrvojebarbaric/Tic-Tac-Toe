export type CellProps = {
    row: number
    index: number
    handleClick: (move: Move) => void
    firstPlayerId: number
    secondPlayerId: number
    itemId: number
}

export type Move = {
    row: number
    col: number
}

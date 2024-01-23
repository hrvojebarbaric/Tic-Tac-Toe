export type CurrentUser = {
    data: {
        id: number
        token: string
        username: string
    }
}

export type LogInUser = {
    username: string
    password: string
    rememberMe: string
}

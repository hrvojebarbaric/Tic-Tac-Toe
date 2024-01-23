import { useQueryClient } from '@tanstack/react-query'
import { CurrentUser } from '../types/users'

export const useToken = () => {
    const queryClient = useQueryClient()
    const cachedData: CurrentUser = queryClient.getQueryData(['user']) as CurrentUser

    const localValue = window.localStorage.getItem('user')
    const parseValue: CurrentUser = localValue && JSON.parse(localValue)

    const user: CurrentUser | undefined =
        !cachedData && localValue ? queryClient.setQueryData(['user'], parseValue) : cachedData

    return user
}

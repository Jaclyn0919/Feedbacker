import { createContext, useContext, useEffect, useState } from "react"
import { get } from './http'

type User = {
    userId: string,
    displayName: string,
    email: string,
    avatarUrl: string
}


type GlobalContextType = {
    user: User
    setUser: (user:User) => void
    refreshUser: () => void
    refreshPosts: () => void,
    freshPostCnt: number
}

const GlobalContext = createContext<GlobalContextType>({
    user: {
        userId: '',
        displayName: "",
        email: "",
        avatarUrl: ""
    },
    setUser: () => {},
    refreshUser: () => {},
    refreshPosts: () => {},
    freshPostCnt: 0
})

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}

export const GlobalContextProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | any>({
        userId: '',
        displayName: "",
        email: "",
        avatarUrl: ""
    })

    const [refreshCnt, setRefreshUserCnt] = useState(0)
    const [refreshPostsCnt, setRefreshPostsCnt] = useState(0)

    const getUserInfo = async () => {
        try {
            const user = await get()
            if (user) {
                setUser(user)
            }
        } catch (error) {
            console.log(error)
            setUser({
                userId: '',
                displayName: "",
                email: "",
                avatarUrl: ""
            })
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [refreshCnt])

    return (
        <GlobalContext.Provider
            value={
                {
                    user, 
                    setUser,
                    refreshUser: () => {
                        setRefreshUserCnt(prev => prev + 1)
                    },
                    refreshPosts: () => {
                        setRefreshPostsCnt(prev => prev + 1)
                    },
                    freshPostCnt: refreshPostsCnt
                }
            }   
        >
            {children}
        </GlobalContext.Provider>
    )
}
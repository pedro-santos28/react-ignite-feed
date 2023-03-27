import {createContext, useContext, useEffect, useState} from 'react';
import { callApi } from '../services/Axios';
import { IProps, IUser, IUserContext } from '../types/UserContextType/types';

export const UserContext = createContext<IUserContext | undefined>(undefined);


export const UserContextProvider = ({ children }: IProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem('auth') as string));
    const [JWT, setJWT] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState<IUser | null>(null);

    const INITIAL_VALUE: IUserContext['state'] = { 
        isAuthenticated,
        setIsAuthenticated,
        JWT,
        setJWT,
        user,
        setUser
    };

    useEffect(() => {
        const actualUser = JSON.parse(localStorage.getItem('user') as string)
        const fetchUser = async () => {
            const userFound: {data: IUser} = await callApi.get(`/users/${actualUser?.id}`)
            setUser(userFound.data)
        }
        if(!actualUser || !isAuthenticated) {
            setUser(null)
            setJWT('')
            setIsAuthenticated(false)
            localStorage.getItem('token') && localStorage.removeItem('token')
            localStorage.getItem('auth') && localStorage.removeItem('auth')
            localStorage.getItem('user') && localStorage.removeItem('user')
        }
        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{state: INITIAL_VALUE}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context
}


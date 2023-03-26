export interface IProps {
    children: React.ReactNode
}

export interface IUserContext {
    state: {
        isAuthenticated: boolean;
        setIsAuthenticated: (isAuth: boolean) => void;
        JWT: string;
        setJWT: (JWTKey: string) => void;
        user: IUser | null;
        setUser: (user: IUser) => void;
    }
}

export interface IUser {
    id: number,
    name: string,
    email: string,
    role: string,
    avatarFile: string
    bannerFile: string
    isAdmin: boolean
}
import { IUser } from "../UserContextType/types"

export interface IPost {
    id: number,
    content: string,
    publishedAt: Date,
    author: IUser,
       
    comments?: Array<{
        id: number,
        content: string,
        createdAt: Date,
        authorId: number,
        postId: number,
        author: IUser,
    }>
    mutate: () => void
  }
export interface Post {
    id: number;
    user: {username:string, colour:string};
    date: Date;
    contents: string;
    likes: number;

}

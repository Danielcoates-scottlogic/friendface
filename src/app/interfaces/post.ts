export interface Post {
    id: number;
    user: {username:string};
    date: Date;
    contents: string;
    likes: number;
    colour: string;
}

export interface Post {
    id: number;
    user: {username:string, colour:string, pfp:string};
    date: Date;
    contents: string;
    likes: number;
    liked: boolean;
    image: string;
}

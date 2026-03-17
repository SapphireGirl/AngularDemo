export interface IUser {
    userId: string
    first: string;
    last: string;
    email: string;
    password?: string;
    classes: string[];
}
import { IUser } from "../interfaces/userInterface";

declare module "express" {
    export interface Request {
        user?: IUser;
    }
}

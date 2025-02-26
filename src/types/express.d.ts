import { IUser } from "../interfaces/userInterface";

declare module "express" {
    interface Request {
        user?: IUser;
    }
}

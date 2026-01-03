import { AppError } from "./errorHandler.js";
import User from "./User.model.js";
import type { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {
    const users = await User.find();

    return res.status(200).json({
        users
    })
}

const getUserById = async (req: Request & {
    params:{
        id: number
    }
}, res: Response) => {
    const {id} = req.params;

    const user = await User.findById(id);
    if(!user) throw new AppError("User not found!", 404);

    return res.status(200).json({
        user
    })
}

// const addUser = async(req: Request & {
//     body:{
//         name: string,
//         email: string,
//         password: string
//     }
// }, res: Response) => {
//     const {name, email, password} = req.body;
//     if (name === null || email === null || password === null) {
//         throw new AppError("Must have all fields", 400);
//     }

//     const newUser = new User({
//         name, email, password
//     });

//     const user = await newUser.save();
//     if(!user) throw new Error("Something went wrong!");

//     return res.status(200).json({
//         user
//     });
// }

export {
    getAllUsers,
    getUserById,
    // addUser,
}
import { AppError } from "./errorHandler.js";
import User from "./User.model.js";
import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { jwtSignUser } from "./jwt.js";

const registerUser = async (req: Request & {
    body:{
        name: string,
        email: string,
        password: string
        passowrdConfirmation: string
    }
}, res: Response) => {
    const { name, email, password, passowrdConfirmation } = req.body;

    if(name === null || 
        email === null || 
        password === null || 
        passowrdConfirmation === null 
    ) throw new AppError("Fields must be all present!", 400);

    if(passowrdConfirmation !== password) throw new AppError("Password and password Confirmation must be the same!", 400);

    const emailExist = await User.findOne({email});
    if(emailExist) throw new AppError("Email already exists!", 400);
    
    const newUser = await new User({
        name, email, password
    }).save();

    if(!newUser) throw new Error("Something went wrong!");

    delete (newUser as { password?: string }).password;

    return res.status(200).json({
        user: newUser
    });
    
}

const loginUser = async (req: Request & {
    body:{
        email: string,
        password: string
    }
}, res: Response) => {
    const { email, password } = req.body;

    if(email === null || password === null) throw new AppError("Fields must be all present!", 400);

    const user = await User.findOne({email});
    if(!user) throw new AppError("Invalid credentials!", 400);

    const matchingPasswords = await bcrypt.compare(password, user.password);
    if(!matchingPasswords) throw new AppError("Invalid credentials!", 400);

    user.jwtToken = jwtSignUser({id: user._id, role: user.role});
    await user.save();

    delete (user as {password?: string}).password;

    return res.status(200).json({
        user
    })
}

const logoutUser = async (req: Request, res: Response) => {
    
    
    const id: string = req.headers.id || '';
    if(!id) throw new AppError('Id not Valid', 400);

    const user = await User.findById(id);
    if(!user) throw new AppError("User not Found!", 400);

    user.jwtToken = ""
    await user.save()

    return res.sendStatus(200);

}

export {
    registerUser,
    loginUser,
    logoutUser
}
import { Document, model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    role: string,
    jwtToken: string
}

const userSchema: Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, default: "user"},
    jwtToken:{type: String},
},
{ timestamps: true });

userSchema.pre('save', async function(this: IUser){
    const password: string = this.password;
    
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        this.password = hashPassword;
    } catch (error) {
        throw new Error("Something went Wrong!");
    }
});

const User = model<IUser>("User", userSchema);

export default User;
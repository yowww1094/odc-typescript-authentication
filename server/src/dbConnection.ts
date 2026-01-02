import mongoose from "mongoose";

export const dbConnection = (uri: string) => {

    mongoose.connect(uri as string, {dbName: "odc-typescript-auth"})
    .then(()=>{
        console.log("Mongodb connected!");
    })
    .catch((err)=>{
        console.log("Mongodb error", err.message);
    });
}


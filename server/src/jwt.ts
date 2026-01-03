import jwt from 'jsonwebtoken'

const JWT_SECRET = 'jwtsecretcode';

const jwtSignUser = (data: Object) => {
    return jwt.sign(data, JWT_SECRET as string, {expiresIn: 60*60});
}

const jwtVerifyUser = (token: string) => {
    return jwt.verify(token, JWT_SECRET as string);
}

export {
    jwtSignUser,
    jwtVerifyUser,
}
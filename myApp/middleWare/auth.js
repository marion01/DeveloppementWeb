
import { verifyJWTToken } from "../libs/auth";

export function verifyJWT_MW(req, res, next) {
    let token = req.headers.authorization;
    verifyJWTToken(token)
        .then(decodedToken => {
            console.log(req.user)
            console.log("")
            console.log(decodedToken.data)
            req.user = decodedToken.data;
            console.log("coucou2")
            next();
        })
        .catch(err => {
            res.status(400).json({ message: "Invalid auth token provided." });
        });
}
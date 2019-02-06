import jwt from "jsonwebtoken";
import _ from "lodash";

export async function verifyJWTToken(token) {
    try {
        //oui a modifier plus tard
        console.log("verifyToken")
        const decodedToken = await jwt.verify(token, "oui");
       
        if (!decodedToken) {
            throw new err();
        }
        return decodedToken;
    } catch (err) {
        throw new err();
    }
}

export function createJWToken(details) {
    if (typeof details !== "object") {
        details = {};
    }

    if (!details.maxAge || typeof details.maxAge !== "number") {
        details.maxAge = 3600;
    }

    details.sessionData = _.reduce(
        details.sessionData || {},
        (memo, val, key) => {
            if (typeof val !== "function" && key !== "password") {
                memo[key] = val;
            }
            return memo;
        },
        {}
    );
    // oui a modifier utilisation "process.env.JWT_SECRET"
    let token = jwt.sign(
        {
            data: details.sessionData
        },
        "oui",
        {
            expiresIn: details.maxAge,
            algorithm: "HS256"
        }
    );

    return token;
}
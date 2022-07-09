const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

module.exports = {
    isLoggedIn: (req, res, next) => {
        console.log("middleware");
        try {
            const token = req.headers.authorization.split(" ")[1]
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                console.log(decoded);
                if (err) {
                    return res.status(401).send({ err: "Invalid authorization token" })
                }
                req.user = decoded;
                next();
            });
        }
        catch (err) {
            console.log(err)
            return res.status(401).send({ err: "You are not logged in" });
        }
    }
}
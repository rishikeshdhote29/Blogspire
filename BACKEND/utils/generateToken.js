const jwt = require("jsonwebtoken")
const generateToken = (user,) => {
    const payload = {
        user: {
            id: user._id,
        }
    }

     const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 36000000});
    return token;


}
module.exports = generateToken;
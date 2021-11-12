const Users = require('../users/users-model');

const authPayload = (req, res, next) => {
    try {
        const { username, password } = req.body;
        if(!username || !password) {
            next({ status: 404, message: 'Username and password required' });
        } else {
            req.username = username;
            req.password = password;
        }
    } catch (err) {
        next(err)
    }
}

const validateUsername = async (req, res, next) => {
    try {
        const user = await Users.findByUser(req.body.username);
        if(user) {
            next({ status: 401, message: 'Username already exists' });
        } else {
            next();
        }
    } catch (err) {
        next(err)
    }
}

const validateLogin = async (req, res, next) => {
    try {
        const user = await Users.findByUser(req.body.username);
        if(!user.username || !user.password) {
            next({ status: 400, message: 'Invalid credentials' });
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    authPayload,
    validateUsername,
    validateLogin
}
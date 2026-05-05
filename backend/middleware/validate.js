

const { validationResult } = require('express-validator')



module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Error Details:", errors.array(), "Body:", req.body);
        return res.badRequest("Validation Error", errors.array())
    }
    next();
}
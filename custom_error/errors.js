const { InvalidInputException } = require("../custom_error/custom_error")
const log=require("../loaders/logger")
const handleValidationError = function (err, next) {
    var errorArray = [];
    if (err.name === 'ValidationError') {
        for (const field in err.errors) {
            if (err.errors.hasOwnProperty(field)) {
                errorArray.push(`Missing ${field}`);
            }
        }
    }
    return errorArray;
};

const handleDuplicateError = function (err, next) {
    var errorArray = [];
    if (err.code === 11000 && err.keyPattern) {
        const duplicateField = Object.keys(err.keyPattern)[0];
        errorArray.push(`Duplicate field: ${duplicateField}`);
        log.info(`Duplicate field: ${duplicateField}`);
    }
    return errorArray;
};

const handleError = function (err, next) {
    var errorArray = [];
    if (err instanceof InvalidInputException) {
        return next(err);
    }
    return errorArray;
};

module.exports={handleValidationError,handleDuplicateError,handleError}
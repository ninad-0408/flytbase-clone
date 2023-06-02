export class Err extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

export const errorHandler = (err, req, res, next) => {

    if (err.constructor === Err)
        return res.status(err.status).json({ err });
    else {
        console.log(new Date(), err);
        return res.status(500).json({ status: 500, message: "Please try again after sometime."});
    }
}
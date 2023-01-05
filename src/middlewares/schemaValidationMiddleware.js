export function validateSchema(schema) {
    return(req, res, next) => {
        const data = req.body;
        const { error } = schema.validate(req.body, {abortEarly: false});

        if(error) {
            const errors = error.details.map((error) => error.message);
            return res.status(400).send(errors);
        }

        res.locals.data = data;
        next();
    }
};
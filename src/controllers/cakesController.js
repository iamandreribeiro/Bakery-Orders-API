import { connectionDB } from "../database/db.js";

export async function postCake(req, res) {
    const name = res.locals.data.name;
    const price = res.locals.data.price;
    const image = res.locals.data.image;
    const description = res.locals.data.description;

    try {
        const queryCake = await connectionDB.query(
            `SELECT * FROM cakes
            WHERE name=$1`,
            [name]
        );

        if(queryCake.rows.length > 0) {
            return res.sendStatus(409);
        } else {
            await connectionDB.query(
                `INSERT INTO cakes
                (name, price, image, description)
                VALUES ($1, $2, $3, $4)`,
                [name, price, image, description]
            );

            return res.sendStatus(201);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
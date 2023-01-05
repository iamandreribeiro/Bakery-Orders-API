import { connectionDB } from "../database/db.js";

export async function postOrder(req, res) {
    const clientId = res.locals.data.clientId;
    const cakeId = res.locals.data.cakeId;
    const quantity = res.locals.data.quantity;
    const totalPrice = res.locals.data.totalPrice;

    try {
        const queryClient = await connectionDB.query(
            `SELECT * FROM clients, cakes
            WHERE clients.id=$1 AND cakes.id=$2;`,
            [clientId, cakeId]
        );

        if(!queryClient.rows.length) {
            return res.sendStatus(404);
        } else {
            await connectionDB.query(
                `INSERT INTO orders
                ("clientId", "cakeId", quantity, "totalPrice")
                VALUES ($1, $2, $3, $4)`,
                [clientId, cakeId, quantity, totalPrice]
            );

            return res.sendStatus(201);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getAllOrders(req, res) {

}

export async function getOrderById(req, res) {
    
}
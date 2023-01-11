import { connectionDB } from "../database/db.js";

export async function postClient(req, res) {
  const name = res.locals.data.name;
  const address = res.locals.data.address;
  const phone = res.locals.data.phone;

  try {
    const queryUser = await connectionDB.query(
      `SELECT * FROM clients
            WHERE address=$1 OR phone=$2`,
      [address, phone]
    );

    if (queryUser.rows.length > 0) {
      return res.sendStatus(409);
    } else {
      await connectionDB.query(
        `INSERT INTO clients 
        (name, address, phone) 
        VALUES ($1, $2, $3)`,
        [name, address, phone]
      );

      return res.sendStatus(201);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getClientOrder(req, res) {
  const { id } = req.params;

  try {
    const { rows } = await connectionDB.query(
      `SELECT orders.id AS "orderId",
      orders.quantity, orders."createdAt",
      orders."totalPrice",
      cakes.name AS "cakeName"
      FROM orders
      INNER JOIN cakes
      ON orders."cakeId" = cakes.id
      WHERE orders."clientId"=$1
      ORDER BY orders.id ASC`,
      [id]
    );

    if(!rows.length) {
      return res.sendStatus(404);
    }

    return res.status(200).send(rows);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

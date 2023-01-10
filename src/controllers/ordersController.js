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

    if (!queryClient.rows.length) {
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
  try {
    const { rows } = await connectionDB.query(`SELECT * FROM orders;`);

    if (!rows.length) {
      return res.sendStatus(404);
    } else {
      const queryOrders = await connectionDB.query(
        `SELECT 
        json_build_object('id', clients.id,
        'name', clients.name, 
        'address', clients.address, 
        'phone', clients.phone) AS client,
        json_build_object('id', cakes.id,
        'name', cakes.name,
        'price', cakes.price,
        'description', cakes.description,
        'image', cakes.image) AS cake,
        orders.id AS "orderId",
        orders."createdAt", orders.quantity,
        orders."totalPrice"
        FROM orders
        INNER JOIN clients
        ON orders."clientId" = clients.id
        INNER JOIN cakes
        ON orders."cakeId" = cakes.id
        ORDER BY orders.id ASC;`
      );

      return res.status(200).send(queryOrders.rows);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getOrderById(req, res) {
  const { id } = req.params;

  try {
    const { rows } = await connectionDB.query(
      `SELECT * FROM orders WHERE id=$1;`,
      [id]
    );

    if (!rows.length) {
      return res.sendStatus(404);
    } else {
      const queryOrders = await connectionDB.query(
        `SELECT
        json_build_object('id', clients.id,
        'name', clients.name,
        'address', clients.address,
        'phone', clients.phone) AS client,
        json_build_object('id', cakes.id,
        'name', cakes.name,
        'price', cakes.price,
        'description', cakes.description,
        'image', cakes.image) AS cake,
        orders.id AS "orderId",
        orders."createdAt", orders.quantity,
        orders."totalPrice"
        FROM orders
        INNER JOIN clients
        ON orders."clientId" = clients.id
        INNER JOIN cakes
        ON orders."cakeId" = cakes.id
        WHERE orders.id=$1;`,
        [id]
      );

      return res.status(200).send(queryOrders.rows);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

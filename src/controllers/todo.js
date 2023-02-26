const db = require("../database/connection");
const { QueryTypes } = require("sequelize");

exports.getAllTodos = async (req, res) => {
  try {
    const query = "SELECT * FROM todos";

    const todos = await db.sequelize.query(query, QueryTypes.SELECT);

    res.status(200).send({
      status: "success",
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};

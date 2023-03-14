const status = require("http-status");
const { Todo, Category, User } = require("../../db/models");
const joi = require("joi");

exports.addTodo = async (req, res) => {
  try {
    // create validator
    const schema = joi.object({
      categoryId: joi.number().required(),
      title: joi.string().required(),
      description: joi.string().required(),
      bgColor: joi.string().required(),
    });

    // validate request
    const { error } = schema.validate(req.body);
    if (error) {
      throw error;
    }

    // insert into database
    let todo = await Todo.create({
      userId: req.userData.id,
      categoryId: req.body.categoryId,
      title: req.body.title,
      description: req.body.description,
      isDone: true,
      bgColor: req.body.bgColor,
      date: new Date(),
    });

    todo = await Todo.findOne({
      where: {
        id: todo.id,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "deletedAt"],
          },
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "deletedAt",
          "userId",
          "categoryId",
        ],
      },
    });

    res.status(status.CREATED).json(todo);
  } catch (err) {
    res.status(status.BAD_REQUEST).json({ message: err.message });
  }
};

exports.findAllTodosByUser = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        userId: req.userData.id,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "deletedAt"],
          },
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "deletedAt",
          "userId",
          "categoryId",
        ],
      },
    });

    if (todos.length < 1) {
      throw new Error("todos is empty");
    }

    res.status(status.OK).send(todos);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.getDetailTodoByUser = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: {
        userId: req.userData.id,
        id: req.params.id,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "deletedAt"],
          },
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "deletedAt",
          "userId",
          "categoryId",
        ],
      },
    });

    res.status(status.OK).send(todo);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    let todo = await Todo.findOne({
      where: {
        userId: req.userData.id,
        id: req.params.id,
      },
    });

    if (req.body.categoryId) {
      todo.categoryId = req.body.categoryId;
    }
    if (req.body.title) {
      todo.title = req.body.title;
    }
    if (req.body.description) {
      todo.description = req.body.description;
    }
    if (req.body.bgColor) {
      todo.bgColor = req.body.bgColor;
    }

    todo = await todo.save();

    todo = await Todo.findOne({
      where: {
        userId: req.userData.id,
        id: req.params.id,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "deletedAt"],
          },
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "deletedAt",
          "userId",
          "categoryId",
        ],
      },
    });

    res.status(status.OK).send(todo);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.destroy({
      where: {
        id: req.params.id,
      },
    });

    res
      .status(status.OK)
      .json({ message: `Todo with id ${req.params.id} has been deleted` });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

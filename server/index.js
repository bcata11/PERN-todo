const express = require("express");
const app = express();
const cors = require('cors');
const pool = require("./db")

app.use(cors());
app.use(express.json());

//ROUTES

//create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) returning *", [description]);

        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("select * from todo");
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("select * from todo where todo_id = $1", [id]);
        res.json(todo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

//update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("updated")
    } catch (error) {
        console.error(error.message)
    }
})

//delte a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const delteTodo = await pool.query("delete from todo where todo_id = $1", [id])

        res.json("deleted")
    } catch (error) {
        console.error(error.message)

    }
})

app.listen(5000, () => {
    console.log("Server has started on port 5000")
})
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const { Todo } = require('./sql');

const app = express();

// Allow all origins for CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Route to get all todos 
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).send(error.message);
  }
});

// Route to create a new todo
app.post('/todos', async (req, res) => {
  try {
    const newTodo = await Todo.create({
      title: req.body.title,
      description: req.body.description
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).send(error.message);
  }
});

// Route to delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      await todo.destroy();
      res.status(200).send();
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).send(error.message);
  }
});

// Serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Listen on port 3001 (or another port if 3000 is in use)
const PORT = 3000; // Change to 3001 or any other port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
  
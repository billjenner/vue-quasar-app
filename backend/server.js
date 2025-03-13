const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.json');
//const jwt = require('jwt');
//const errorHandler = require('error-handler');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // use JWT auth to secure the api
// app.use(jwt());

// // api routes
// app.use('/users', require('./users/users.controller'));

// // global error handler
// app.use(errorHandler);

// MongoDB Connection
// 'mongodb://localhost:27017/todoApp'
mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Schema and Model
const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

// API Routes
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    completed: false,
  });
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

app.delete('/todos/:id', async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.json(deletedTodo);
});

// Start Server
const port =
  process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 3000;
app.listen(port, () => {
  console.log('Server running on http://localhost:' + port);
});

<template>
  <div>
    <h1>Todo List</h1>
    <div class="todo-list">
      <div class="todo-card" v-for="todo in todos" :key="todo._id">
        <div class="todo-header">
          <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)">
          <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        </div>
        <div class="todo-body">
          <p>{{ todo.text }}</p>
        </div>
        <div class="todo-footer">
          <button @click="deleteTodo(todo._id)">Delete</button>
        </div>
      </div>
    </div>
    <div class="add-todo">
      <input v-model="newTodoTitle" placeholder="Title">
      <input v-model="newTodoText" placeholder="Text" @keyup.enter="addTodo">
      <button @click="addTodo">Add Todo</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      todos: [],
      newTodoTitle: '',
      newTodoText: ''
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      const response = await axios.get('http://localhost:3000/todos');
      this.todos = response.data;
    },
    async addTodo() {
      if (this.newTodoTitle.trim() === '' || this.newTodoText.trim() === '') return;
      const response = await axios.post('http://localhost:3000/todos', {
        title: this.newTodoTitle,
        text: this.newTodoText,
        completed: false
      });
      this.todos.push(response.data);
      this.newTodoTitle = '';
      this.newTodoText = '';
    },
    async updateTodo(todo) {
      await axios.put(`http://localhost:3000/todos/${todo._id}`, todo);
    },
    async deleteTodo(id) {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      this.todos = this.todos.filter(todo => todo._id !== id);
    }
  }
};
</script>

<style>
.todo-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.todo-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.todo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.todo-body {
  margin-top: 0.5rem;
}

.todo-footer {
  margin-top: 0.5rem;
  text-align: right;
}

.completed {
  text-decoration: line-through;
}

.add-todo {
  margin-top: 1rem;
}
</style>
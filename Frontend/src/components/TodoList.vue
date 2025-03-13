<template>
  <div>
    <h1>Todo List</h1>
    <ul>
      <li v-for="todo in todos" :key="todo._id">
        <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)">
        <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        <button @click="deleteTodo(todo._id)">Delete</button>
      </li>
    </ul>
    <input v-model="newTodo" @keyup.enter="addTodo">
    <button @click="addTodo">Add Todo</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      todos: [],
      newTodo: ''
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
      if (this.newTodo.trim() === '') return;
      const response = await axios.post('http://localhost:3000/todos', {
        title: this.newTodo,
        completed: false
      });
      this.todos.push(response.data);
      this.newTodo = '';
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
.completed {
  text-decoration: line-through;
}
</style>
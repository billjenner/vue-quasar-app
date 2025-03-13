<template>
  <div class="container">
    <h1>Todo List</h1>
    <div class="input-container">
      <div class="input-row">
        <input v-model="searchQuery" placeholder="Search todos" class="search-input outlined-yellow col-2">
        <div class="input-group">
          <input v-model="newTodoTitle" placeholder="Title" class="title-input outlined">
          <button @click="addTodo" class="add-button outlined">Add Todo</button>
        </div>
      </div>
      <div class="input-row">
        <textarea v-model="newTodoText" placeholder="Text" class="text-input outlined" @keyup.enter="addTodo"></textarea>
      </div>
    </div>
    <div class="todo-list">
      <div class="todo-card" v-for="todo in filteredTodos" :key="todo._id">
        <div class="todo-header">
          <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
          <button @click="toggleExpand(todo)">
            <span v-if="todo.expanded">−</span>
            <span v-else>+</span>
          </button>
        </div>
        <div v-if="todo.expanded" class="todo-body">
          <p>{{ todo.text }}</p>
        </div>
        <div class="todo-footer">
          <div class="checkbox-container">
            <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)">
            <label>Done</label>
          </div>
          <button @click="deleteTodo(todo._id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const todos = ref([]);
const newTodoTitle = ref('');
const newTodoText = ref('');
const searchQuery = ref('');

const fetchTodos = async () => {
  const response = await axios.get('http://localhost:3000/todos');
  todos.value = response.data.map(todo => ({ ...todo, expanded: false }));
};

const addTodo = async () => {
  if (newTodoTitle.value.trim() === '' || newTodoText.value.trim() === '') return;
  const response = await axios.post('http://localhost:3000/todos', {
    title: newTodoTitle.value,
    text: newTodoText.value,
    completed: false
  });
  todos.value.push({ ...response.data, expanded: false });
  newTodoTitle.value = '';
  newTodoText.value = '';
};

const updateTodo = async (todo) => {
  await axios.put(`http://localhost:3000/todos/${todo._id}`, todo);
};

const deleteTodo = async (id) => {
  await axios.delete(`http://localhost:3000/todos/${id}`);
  todos.value = todos.value.filter(todo => todo._id !== id);
};

const toggleExpand = (todo) => {
  todo.expanded = !todo.expanded;
};

const filteredTodos = computed(() => {
  return todos.value.filter(todo => 
    todo.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    todo.text.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(fetchTodos);
</script>

<style>
.container {
  margin: 0 auto;
}

.input-container {
  margin: 0 auto;
  flex-shrink: 0;
}

.input-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
  align-items: center;
}

.search-input, .title-input, .text-input {
  padding: 0.5rem;
  border-radius: 4px;
}

.title-input {
  margin-left: 1rem;
  flex: 1;
}

.text-input {
  flex: 2;
  min-width: calc(2 * var(--title-input-width)); /* Ensure the text input is at least 2 times the width of the title input */
  height: 3rem; /* Adjust the height as needed */
  resize: vertical; /* Allow vertical resizing */
}

.add-button {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.add-button:hover {
  background-color: #0056b3;
}

.outlined {
  border: 2px solid #007bff;
}

.outlined-yellow {
  border: 2px solid gold
}

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
  word-wrap: break-word; /* Ensure long words break and wrap */
  word-break: break-word; /* Ensure long words break and wrap */
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
}

.completed {
  text-decoration: line-through;
}
</style>
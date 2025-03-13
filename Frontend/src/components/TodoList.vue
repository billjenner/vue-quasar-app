<template>
  <div>
    <h1>Todo List</h1>
    <div class="todo-list">
      <div class="todo-card" v-for="todo in todos" :key="todo._id">
        <div class="todo-header">
          <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
          <button @click="toggleExpand(todo)">
            <span v-if="todo.expanded">▼</span>
            <span v-else>▶</span>
          </button>
        </div>
        <div v-if="todo.expanded" class="todo-body">
          <p>{{ todo.text }}</p>
        </div>
        <div class="todo-footer">
          <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)">
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

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const todos = ref([]);
const newTodoTitle = ref('');
const newTodoText = ref('');

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

onMounted(fetchTodos);
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.completed {
  text-decoration: line-through;
}

.add-todo {
  margin-top: 1rem;
}
</style>
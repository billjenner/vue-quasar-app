import { defineStore } from 'pinia';
import axios from 'axios';

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [],
    newTodoTitle: '',
    newTodoText: '',
    searchQuery: '',
    allExpanded: false
  }),

  getters: {
    filteredTodos: (state) => {
      return state.todos.filter(todo => 
        todo.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        todo.text.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    notCompletedTodos: (state) => {
      return state.filteredTodos.filter(todo => !todo.completed);
    },
    completedTodos: (state) => {
      return state.filteredTodos.filter(todo => todo.completed);
    }
  },

  actions: {
    async fetchTodos() {
      const response = await axios.get('http://localhost:3000/todos');
      this.todos = response.data.map(todo => ({ ...todo, expanded: false }));
    },

    async addTodo() {
      if (this.newTodoTitle.trim() === '' || this.newTodoText.trim() === '') return;
      const response = await axios.post('http://localhost:3000/todos', {
        title: this.newTodoTitle,
        text: this.newTodoText,
        completed: false
      });
      this.todos.push({ ...response.data, expanded: false });
      this.newTodoTitle = '';
      this.newTodoText = '';
    },

    async updateTodo(todo) {
      await axios.put(`http://localhost:3000/todos/${todo._id}`, todo);
    },

    async deleteTodo(id) {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      this.todos = this.todos.filter(todo => todo._id !== id);
    },

    toggleExpand(todo) {
      todo.expanded = !todo.expanded;
    },

    toggleExpandCollapseAll() {
      this.allExpanded = !this.allExpanded;
      this.todos.forEach(todo => {
        todo.expanded = this.allExpanded;
      });
    }
  }
});
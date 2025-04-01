<template>
  <q-page>
    <q-form @submit="updateTodo">
      <q-input v-model="todo.title" label="Title" />
      <q-input v-model="todo.text" label="Text" />
      <q-btn type="submit" color="primary" label="Update" />
    </q-form>
  </q-page>
</template>

<script>
import { useRoute } from 'vue-router';
import { useTodoStore } from '../stores/todoStore';

export default {
  setup() {
    const route = useRoute();
    const store = useTodoStore();
    const todo = store.todos.find((todo) => todo._id === route.params.id);

    return {
      todo,
      updateTodo() {
        store.updateTodo(todo);
        // Navigate back to the todo grid page
        this.$router.push({ name: 'todo-grid' });
      },
    };
  },
};
</script>
<template>
  <q-page class="q-pa-md">
    <TodoList />
  </q-page>
</template>

<script>
import TodoList from '../components/TodoList.vue';

export default {
  name: 'TodoPage',
  components: {
    TodoList,
  },
};
</script>
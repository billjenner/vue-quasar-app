<script setup>
import HelloWorld from './components/HelloWorld.vue';
import TodoList from './components/TodoList.vue';
</script>

<template>
    <div id="app">
    <TodoList />
  </div>
</template>

<style scoped>
#app {
  width: 96cqmin; /* 98% of the viewport width */
  height: 98vh; /* 98% of the viewport height */
  margin: 0 auto; /* Center the div horizontally */
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

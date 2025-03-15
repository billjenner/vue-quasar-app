<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
  <q-toolbar-title>
    My App
  </q-toolbar-title>
  <q-btn flat :to="{ name: 'Home' }" label="Home" />
  <router-link :to="{ name: 'Home' }">
    <q-btn flat label="Home2" />
  </router-link>
  <q-btn flat :to="{ name: 'Todos' }" label="Todos" />
  <router-link :to="{ name: 'Todos' }">
    <q-btn flat label="Todos2" />
  </router-link>          
</q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'App',
  components: {
    RouterLink,
  },
};
</script>

<style>

.container {
  margin: 0 auto;
  padding: 1rem;
}

header {
  margin-bottom: 1rem;
}



nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
}

nav li {
  display: inline;
}

nav a {
  text-decoration: none;
  color: #007bff;
}

nav a:hover {
  text-decoration: underline;
}

main {
  margin-top: 1rem;
}
</style>
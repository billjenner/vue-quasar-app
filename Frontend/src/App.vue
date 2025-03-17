<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="text-left">
          To Do List
        </q-toolbar-title>
        <q-space />
        <menu-a v-if="currentMenu === 'A'" @switch-menu="switchMenu" />
        <menu-b v-else @switch-menu="switchMenu" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
import MenuA from './components/MenuA.vue';
import MenuB from './components/MenuB.vue';
import './assets/styles/main.scss';

export default defineComponent({
  name: 'App',
  components: {
    MenuA,
    MenuB,
  },
  data() {
    return {
      currentMenu: 'A'
    };
  },
  methods: {
    switchMenu() {
      this.currentMenu = this.currentMenu === 'A' ? 'B' : 'A';
    }
  }
});
</script>

<style lang="scss">
// Custom button color
.q-btn {
  color: rgb(256, 128, 64) !important;
  
  &.q-btn--flat:hover {
    background: rgba(256, 128, 64, 0.1) !important;
  }
}

.q-toolbar {
  color: rgb(200, 208, 216) !important;
  padding: 0 20px;
  
  .q-toolbar-title {
    padding-left: 0;
  }
}

.q-toolbar-title {
  font-weight: 900 !important;
  font-size: 2rem !important;
  font-family: Impact, sans-serif !important;
}

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
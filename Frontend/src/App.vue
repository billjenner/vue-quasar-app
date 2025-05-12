<template>
  <q-layout view="hHh ipr fFf">
    <q-header elevated v-if="showHeader">
      <q-toolbar>
        <q-toolbar-title class="text-left">
          To Do List 2
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
      drawerOpen: false,
      currentMenu: 'A'
    };
  },
  methods: {
    switchMenu() {
      this.currentMenu = this.currentMenu === 'A' ? 'B' : 'A';
    }
  },
  computed: {
    headerTitle() {
      const route = this.$route.path;
      if (route === "/comments-tags") return "Comments & Tags";
      if (route === "/settings") return "Settings";
      if (route === "/dashboard") return "Dashboard";
      return "My App"; // Default title
    },
    showHeader() {
      return this.$route.path !== "/commentsAndTags" && 
             this.$route.path !== "/comments-tags";
    }
  },
});
</script>

<style lang="scss">

// Custom button color


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
  height: 100%;

  margin: 0 auto;
  padding: 1rem;
}


nav ul {
  list-style: none;
  padding: 0;
  display: flex;
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
</style>
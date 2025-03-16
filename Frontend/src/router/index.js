import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Todos from '../pages/Todos.vue';
import Todos2 from '../components/TodoList2.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todos,
  },
  {
    path: '/todos2',
    name: 'Todos2',
    component: Todos2,
  }, // ...existing routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

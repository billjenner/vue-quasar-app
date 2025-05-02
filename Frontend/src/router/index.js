import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import CommentsAndTags from '../pages/CommentsAndTags.vue';
import Todos from '../pages/Todos.vue';
import Todos2 from '../components/TodoList2.vue';
import TodoGrid from '../components/TodoGrid.vue';
import TodoEdit from '../components/TodoEdit.vue';
import Notify from '../pages/Notify.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/commentsAndTags',
    name: 'CommentsAndTags',
    component: CommentsAndTags,
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
  },
  {
    path: '/todoGrid',
    name: 'TodoGrid',
    component: TodoGrid,
  },
  {
    path: '/todo-edit/:id',
    name: 'todo-edit',
    component: TodoEdit,
  },
  {
    path: '/commentsAndTags',
    name: 'CommentsAndTags',
    component: CommentsAndTags,
  },
  {
    path: '/notify',
    name: 'Notify',
    component: Notify,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

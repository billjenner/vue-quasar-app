<template>
  <div class="todo-container">
    <div class="content-wrapper">
      <div class="text-h4 q-mb-md">Todo List</div>
      
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-12">
          <div class="row q-col-gutter-md">
            <div v-for="todo in store.notCompletedTodos" :key="todo._id" class="col-12 col-sm-6 col-md-4 col-lg-2">
              <q-card class="full-height">
                <q-card-section class="q-pa-none">
                  <div class="row items-center justify-between q-px-sm q-py-xs">
                    <div :class="{ 'text-strike': todo.completed }">{{ todo.title }}</div>
                    <q-btn flat round dense :icon="todo.expanded ? 'remove' : 'add'" @click="store.toggleExpand(todo)" />
                  </div>
                </q-card-section>

                <q-slide-transition>
                  <q-card-section v-show="todo.expanded" class="q-pa-none">
                    <p class="q-px-sm q-py-xs">{{ todo.text }}</p>
                  </q-card-section>
                </q-slide-transition>

                <q-card-actions align="between" class="q-pa-none">
                  <div class="row items-center q-px-sm q-py-xs full-width">
                    <q-checkbox v-model="todo.completed" label="Completed" dense @update:model-value="store.updateTodo(todo)" />
                    <q-space />
                    <q-btn flat dense color="negative" icon="delete" @click="store.deleteTodo(todo._id)" />
                  </div>
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>
      </div>

      <div class="text-h6 q-mt-xl q-mb-md">Completed Todos</div>
      <div class="row q-col-gutter-md">
        <div v-for="todo in store.completedTodos" :key="todo._id" class="col-12 col-sm-6 col-md-4 col-lg-2">
          <q-card class="full-height">
            <q-card-section class="q-pa-none">
              <div class="row items-center justify-between q-px-sm q-py-xs">
                <div :class="{ 'text-strike': todo.completed }">{{ todo.title }}</div>
                <q-btn flat round dense :icon="todo.expanded ? 'remove' : 'add'" @click="store.toggleExpand(todo)" />
              </div>
            </q-card-section>

            <q-slide-transition>
              <q-card-section v-show="todo.expanded" class="q-pa-none">
                <p class="q-px-sm q-py-xs">{{ todo.text }}</p>
              </q-card-section>
            </q-slide-transition>

            <q-card-actions align="between" class="q-pa-none">
              <div class="row items-center q-px-sm q-py-xs full-width">
                <q-checkbox v-model="todo.completed" label="Completed" dense @update:model-value="store.updateTodo(todo)" />
                <q-space />
                <q-btn flat dense color="negative" icon="delete" @click="store.deleteTodo(todo._id)" />
              </div>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <q-footer elevated class="bg-white text-black">
      <q-toolbar>
        <q-btn flat round dense :icon="footerExpanded ? 'expand_more' : 'expand_less'" @click="footerExpanded = !footerExpanded" />
        <q-toolbar-title>
          <q-slide-transition>
            <div v-show="footerExpanded" class="q-pa-md">
              <div class="row q-col-gutter-md q-mb-md">
                <q-input v-model="store.searchQuery" placeholder="Search todos" outlined class="col-4" bg-color="yellow-1">
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <div class="col row q-gutter-x-md">
                  <q-input v-model="store.newTodoTitle" placeholder="Title" outlined class="col" />
                  <q-btn color="primary" label="Add Todo" @click="store.addTodo" />
                  <q-btn :icon="store.allExpanded ? 'remove' : 'add'" flat round @click="store.toggleExpandCollapseAll" />
                </div>
              </div>
              <q-input v-model="store.newTodoText" type="textarea" placeholder="Text" outlined rows="2" @keyup.enter="store.addTodo" />
            </div>
          </q-slide-transition>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useTodoStore } from '../stores/todoStore';

const store = useTodoStore();
const footerExpanded = ref(true);

onMounted(() => {
  store.fetchTodos();
});
</script>

<style>
.todo-container {
  width: 100%;
  max-width: 100%;
}

.content-wrapper {
  width: 100%;
  max-width: 100%;
}

.input-container {
  margin: 0 auto;
  flex-shrink: 0;
}

.input-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
  align-items: center;
}

.search-input, .title-input, .text-input {
  padding: 0.5rem;
  border-radius: 4px;
}

.title-input {
  margin-left: 1rem;
  flex: 1;
}

.text-input {
  flex: 2;
  min-width: calc(2 * var(--title-input-width)); /* Ensure the text input is at least 2 times the width of the title input */
  resize: vertical; /* Allow vertical resizing */
}

.add-button, .expand-collapse-button {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.add-button:hover, .expand-collapse-button:hover {
  background-color: #0056b3;
}

.outlined {
  border: 2px solid #007bff;
}

.outlined-yellow {
  border: 2px solid gold;
}

.todo-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.completed-list {
  margin-top: 2rem; /* Add space between the two lists */
}

.todo-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  word-break: break-word;
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

.checkbox-container {
  display: flex;
  align-items: center;
}

.completed {
  text-decoration: line-through;
}
</style>
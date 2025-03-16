<template>
  <div class="todo-container">
    <q-page class="q-pa-md">
      <div class="text-h4 q-mb-md">Todo List</div>
      
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-12">
          <div class="row q-col-gutter-md">
            <div v-for="todo in notCompletedTodos" :key="todo._id" class="col-12 col-sm-6 col-md-4 col-lg-3">
              <q-card>
                <q-card-section>
                  <div class="row items-center justify-between">
                    <div :class="{ 'text-strike': todo.completed }">{{ todo.title }}</div>
                    <q-btn flat round :icon="todo.expanded ? 'remove' : 'add'" @click="toggleExpand(todo)" />
                  </div>
                </q-card-section>

                <q-slide-transition>
                  <q-card-section v-show="todo.expanded">
                    <p>{{ todo.text }}</p>
                  </q-card-section>
                </q-slide-transition>

                <q-card-actions align="between">
                  <q-checkbox v-model="todo.completed" label="Completed" @update:model-value="updateTodo(todo)" />
                  <q-btn flat color="negative" icon="delete" @click="deleteTodo(todo._id)" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>
      </div>

      <div class="text-h6 q-mt-xl q-mb-md">Completed Todos</div>
      <div class="row q-col-gutter-md">
        <div v-for="todo in completedTodos" :key="todo._id" class="col-12 col-sm-6 col-md-4 col-lg-3">
          <q-card>
            <q-card-section>
              <div class="row items-center justify-between">
                <div :class="{ 'text-strike': todo.completed }">{{ todo.title }}</div>
                <q-btn flat round :icon="todo.expanded ? 'remove' : 'add'" @click="toggleExpand(todo)" />
              </div>
            </q-card-section>

            <q-slide-transition>
              <q-card-section v-show="todo.expanded">
                <p>{{ todo.text }}</p>
              </q-card-section>
            </q-slide-transition>

            <q-card-actions align="between">
              <q-checkbox v-model="todo.completed" label="Completed" @update:model-value="updateTodo(todo)" />
              <q-btn flat color="negative" icon="delete" @click="deleteTodo(todo._id)" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-page>

    <q-footer elevated class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>
          <div class="q-pa-md">
            <div class="row q-col-gutter-md q-mb-md">
              <q-input v-model="searchQuery" placeholder="Search todos" outlined class="col-4" bg-color="yellow-1">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
              <div class="col row q-gutter-x-md">
                <q-input v-model="newTodoTitle" placeholder="Title" outlined class="col" />
                <q-btn color="primary" label="Add Todo" @click="addTodo" />
                <q-btn :icon="allExpanded ? 'remove' : 'add'" flat round @click="toggleExpandCollapseAll" />
              </div>
            </div>
            <q-input v-model="newTodoText" type="textarea" placeholder="Text" outlined rows="2" @keyup.enter="addTodo" />
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const todos = ref([]);
const newTodoTitle = ref('');
const newTodoText = ref('');
const searchQuery = ref('');
const allExpanded = ref(false);

const fetchTodos = async () => {
  const response = await axios.get('http://localhost:3000/todos');
  todos.value = response.data.map(todo => ({ ...todo, expanded: false }));
};

const addTodo = async () => {
  if (newTodoTitle.value.trim() === '' || newTodoText.value.trim() === '') return;
  const response = await axios.post('http://localhost:3000/todos', {
    title: newTodoTitle.value,
    text: newTodoText.value,
    completed: false
  });
  todos.value.push({ ...response.data, expanded: false });
  newTodoTitle.value = '';
  newTodoText.value = '';
};

const updateTodo = async (todo) => {
  await axios.put(`http://localhost:3000/todos/${todo._id}`, todo);
};

const deleteTodo = async (id) => {
  await axios.delete(`http://localhost:3000/todos/${id}`);
  todos.value = todos.value.filter(todo => todo._id !== id);
};

const toggleExpand = (todo) => {
  todo.expanded = !todo.expanded;
};

const toggleExpandCollapseAll = () => {
  allExpanded.value = !allExpanded.value;
  todos.value.forEach(todo => {
    todo.expanded = allExpanded.value;
  });
};

const filteredTodos = computed(() => {
  return todos.value.filter(todo => 
    todo.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    todo.text.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const notCompletedTodos = computed(() => {
  return filteredTodos.value.filter(todo => !todo.completed);
});

const completedTodos = computed(() => {
  return filteredTodos.value.filter(todo => todo.completed);
});

onMounted(fetchTodos);
</script>

<style>
.container {
  margin: 0 auto;
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
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  word-wrap: break-word; /* Ensure long words break and wrap */
  word-break: break-word; /* Ensure long words break and wrap */
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
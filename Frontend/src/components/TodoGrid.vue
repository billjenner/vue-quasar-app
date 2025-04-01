<template>
  <q-page class="q-pa-md">
    <q-table
      :rows="store.filteredTodos"
      :columns="columns"
      row-key="_id"
      :loading="loading"
      :pagination="pagination"
    >
      <template v-slot:top>
        <div class="text-h6">Todo List Grid</div>
        <q-space />
        <q-input
          v-model="store.searchQuery"
          placeholder="Search"
          dense
          outlined
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn color="primary" label="Add New Todo" @click="showAddTodoDialog = true" />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="title" :props="props">
            {{ props.row.title }}
            <q-btn
              icon="edit"
              size="sm"
              color="primary"
              :to="{ name: 'todo-edit', params: { id: props.row._id } }"
            />
          </q-td>
          <q-td key="text" :props="props">
            {{ props.row.text }}
          </q-td>
          <q-td key="completed" :props="props">
            <q-checkbox v-model="props.row.completed" dense />
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn flat dense color="negative" icon="delete" @click="store.deleteTodo(props.row._id)" />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="showAddTodoDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add New Todo</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="store.newTodoTitle" label="Title" />
          <q-input v-model="store.newTodoText" label="Text" type="textarea" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Add Todo" color="primary" @click="store.addTodo" />
        </q-card-actions>
      </q-card>
    </q-dialog>    
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useTodoStore } from '../stores/TodoStore'; // Ensure correct case

const store = useTodoStore();

//console.log('Store initialized:', store); // Debugging log

const columns = [
  {
    name: 'title',
    label: 'Title',
    field: 'title',
    sortable: true,
  },
  {
    name: 'text',
    label: 'Text',
    field: 'text',
    sortable: true,
  },
  {
    name: 'completed',
    label: 'Completed',
    field: 'completed',
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
  },
];
const loading = ref(false);
const pagination = ref({
  rowsPerPage: 10,
});
const showAddTodoDialog = ref(false);
const newTodoTitle = ref('');
const newTodoText = ref('');

onMounted(() => {
  store.fetchTodos();
});

function addTodo() {
  store.addTodo({ title: newTodoTitle.value, text: newTodoText.value });
  newTodoTitle.value = '';
  newTodoText.value = '';
  showAddTodoDialog.value = false;
}
</script>
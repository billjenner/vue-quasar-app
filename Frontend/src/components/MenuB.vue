<template>
  <div class="nav-buttons">
    <q-btn flat :to="{ name: 'Home' }" label="Home" />
    <q-btn flat :to="{ name: 'Todos' }" label="Todos" />
    <q-btn flat :to="{ name: 'Todos2' }" label="Todos2" />
    <q-btn flat @click="$emit('switchMenu')" label="> Home" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MenuB',
  emits: ['switchMenu']
});
</script> 
<template>
  <div class="nav-buttons">
    <q-btn flat :to="{ name: 'Home' }" label="Menu A Home" />
    <q-btn flat :to="{ name: 'Todos' }" label="Menu A Todos" />
    <q-btn flat @click="$emit('switchMenu')" label="Switch to Menu B" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MenuA',
  emits: ['switchMenu']
});
</script> 
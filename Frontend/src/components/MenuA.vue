<template>
  <div class="nav-buttons">
    <q-btn flat :to="{ name: 'Home' }" label="Home" />
    <q-tabs>
      <q-route-tab to="/Notify" label="Notify" />
      <q-route-tab to="/Notes" label="Notes" />
    </q-tabs>
    <q-btn flat :to="{ name: 'Todos' }" label="Todos" /> 
    <q-btn flat :to="{ name: 'Todos2' }" label="Todos2" />
    <q-btn flat :to="{ name: 'TodoGrid' }" label="TodoGrid" />
    <q-btn flat @click="$emit('switchMenu')" label="> Menu B" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MenuA',
  emits: ['switchMenu']
});
</script> 
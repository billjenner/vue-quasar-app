<template>
  <div class="nav-buttons">
    <q-btn flat :to="{ name: 'Home' }" label="Menu B Home" />
    <q-btn flat :to="{ name: 'Todos' }" label="Menu B Todos" />
    <q-btn flat @click="$emit('switchMenu')" label="Switch to Menu A" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MenuB',
  emits: ['switchMenu']
});
</script> 
// filepath: c:\dev\vue-quasar-app\Frontend\src\pages\Home.vue
<template>
  <q-page class="q-pa-md">
    <q-layout-grid>
      <q-layout-grid-item v-for="n in 9" :key="n" :cols="4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Item {{ n }}</div>
          </q-card-section>
        </q-card>
      </q-layout-grid-item>
    </q-layout-grid>
    <p>Welcome to my home page!</p>
</q-page>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.q-layout-grid-item {
  padding: 10px;
}
</style>
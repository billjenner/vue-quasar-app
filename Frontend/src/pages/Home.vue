<template>
  <div class="page-container">

    <div class="q-pa-xs">
      <q-btn 
        label="Show Notification" 
        color="primary" 
        @click="showNotification" 
        class="q-mt-md" 
      />
      <q-list bordered separator>
        <q-item clickable v-ripple>
          <q-item-section>Single line item</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Item with caption</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label overline>OVERLINE</q-item-label>
            <q-item-label>Item with overline</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- Button to trigger notification -->

    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    showNotification() {
      this.$q.notify({
        message: 'Comment added successfully',
        color: 'green',
        position: 'top',
      });
    }
  }
};
</script>

<style scoped>
.q-layout-grid-item {
  padding: 10px;
}

.page-container {
  background-color: #1b0d0d31; /* Light grey */
  min-height: 100vh;         /* Make sure it covers full page height */
  width: 100vh;   
}

.list-wrapper {
  width: 100%;
  max-width: 600px; /* Optional: limit list width on large screens */
  margin: 0 auto;
}
</style>

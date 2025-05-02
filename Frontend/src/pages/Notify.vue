<template>
  <q-page class="q-pa-md">
    <q-btn color="primary" label="Show Notification" @click="showNotification" />
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()

const showNotification = async () => {
  await $q.notify({
    message: 'Hello, this is a Quasar notification!',
    color: 'positive',
    position: 'top',
    timeout: 600
  })
  await new Promise(resolve => setTimeout(resolve, 700));

  await $q.notify({
    message: 'Hello, this is a Quasar notification!',
    color: 'positive',
    position: 'bottom',
    timeout: 600
  })
  await new Promise(resolve => setTimeout(resolve, 700));

  await $q.notify({
    message: 'Hello, this is a Quasar notification!',
    color: 'positive',
    position: 'top-left',
    timeout: 600
  })
  await new Promise(resolve => setTimeout(resolve, 700));

  await $q.notify({
    message: 'Hello, this is a Quasar notification!',
    color: 'positive',
    position: 'top-right',
    timeout: 600
  })
  await new Promise(resolve => setTimeout(resolve, 700));

  await $q.notify({
    message: 'Hello, this is a Quasar notification!',
    color: 'positive',
    position: 'bottom-left',
    timeout: 600
  })
  await new Promise(resolve => setTimeout(resolve, 700));

  await $q.notify({
    message: 'Hello, this is a Quasar notification!',
    color: 'positive',
    position: 'bottom-right',
    timeout: 600
  })

  await new Promise(resolve => setTimeout(resolve, 700));

  await Promise.all([
    $q.notify({
      message: 'Hello, 1!',
      color: 'positive',
      position: 'bottom-right',
      timeout: 1000
    }),
    $q.notify({
      message: 'Hello, 2!',
      color: 'positive',
      position: 'bottom-right',
      timeout: 2000
    }),
    $q.notify({
      message: 'Hello, 3!',
      color: 'positive',
      position: 'bottom-right',
      timeout: 3000
    }),
    $q.notify({
      message: 'Hello, 4!',
      color: 'positive',
      position: 'bottom-right',
      timeout: 4000
    }),
    $q.notify({
      message: 'Hello, 5!',
      color: 'negative',
      position: 'bottom-right',
      timeout: 8000
    }),
    $q.notify({
      message: 'Hello, 6!',
      color: 'negative',
      position: 'bottom-right',
      timeout: 7000
    }),
    $q.notify({
      message: 'Hello, 7!',
      color: 'negative',
      position: 'bottom-right',
      timeout: 6000
    }),
    $q.notify({
      message: 'Hello, 8!',
      color: 'negative',
      position: 'bottom-right',
      timeout: 5000
    })
  ]);
}
</script>

 
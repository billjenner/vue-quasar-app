<template>
  <q-page class="q-pa-md">
    <q-btn color="primary" label="Show Notification" @click="showNotification" />
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()

const messages = [
  'Hello, this is a Quasar notification!',
  'Warning: Something went wrong!',
  'Congratulations on completing the task!',
  'New updates are available.',
  'Action required: Check your settings.',
  'Success: Your changes were saved.',
  'Error: Unable to process your request.',
  'Reminder: Your session will expire soon.',
  'Important: Your account is at risk!',
  'Info: Check out our new features.',
  'Where is my pink Catalac.',
  'Yellow birds fly north. Blue birds fly south.',
  'I am a blue bird. I am a yellow bird.',
  'What’s up Doc?',
  '9 out of 10 voices in my head tell me I’m crazy. The tenth is just humming.',
  'After Tuesday, even the calendar says WTF.',
  'You should always knock before opening a fridge, just in case there’s a salad dressing inside.',
  'Mama always told me, Papa always warned me',
  'Teacher always told me never to be naughty',
  'Take a shot, not gonna miss',
  'Love comes for a season or a reason',
  'That’s how it is, don’st ask why',
  'Life is what we make it, always has been, always will be.',
  'Life’s tragedy is that we get old too soon and wise too late.',
  'Don’t cry because it’s over, smile because it happened.',
  'There are no mistakes, only opportunities.',
  'The only way to do great work is to love what you do.',
  'If you haven’t found it yet, keep looking. Don’t settle.',
  'The best way to predict the future is to create it.',
  'The only limit to our realization of tomorrow will be our doubts of today.',
  'The future belongs to those who believe in the beauty of their dreams.',
  'Sometimes you got to break a few eggs',
  'Try to be a rainbow in someone’s cloud.',
  'Accountability is kryptonight to modern wemon',
  'Pray daily. God is easier to talk than most people.',
  'I am not a vegetarian because I love animals. I am a vegetarian because I hate plants.',
  'You were born an original, don’t die a copy.'
];

const randomizeMessage = () => {
  return messages[Math.floor(Math.random() * messages.length)];
}

const notifications = [
  { message: randomizeMessage(), color: 'warning', position: 'bottom-right', timeout: 13059 },
  { message: randomizeMessage(), color: 'accent', position: 'top-left', timeout: 1033 },
  { message: randomizeMessage(), color: 'dark', position: 'top-left', timeout: 5068 },
  { message: randomizeMessage(), color: 'info', position: 'bottom-right', timeout: 2393 },
  { message: randomizeMessage(), color: 'negative', position: 'bottom-left', timeout: 5156 },
  { message: randomizeMessage(), color: 'positive', position: 'top-left', timeout: 12471 },
  { message: randomizeMessage(), color: 'accent', position: 'bottom-left', timeout: 9282 },
  { message: randomizeMessage(), color: 'light', position: 'top-left', timeout: 1877 },
  { message: randomizeMessage(), color: 'primary', position: 'top-left', timeout: 19918 },
  { message: randomizeMessage(), color: 'positive', position: 'bottom-right', timeout: 19087 },
  { message: randomizeMessage(), color: 'negative', position: 'top-right', timeout: 2001 },
  { message: randomizeMessage(), color: 'accent', position: 'top-left', timeout: 19953 },
  { message: randomizeMessage(), color: 'primary', position: 'bottom-right', timeout: 7144 },
  { message: randomizeMessage(), color: 'info', position: 'top-right', timeout: 18521 },
  { message: randomizeMessage(), color: 'negative', position: 'bottom-left', timeout: 4195 },
  { message: randomizeMessage(), color: 'dark', position: 'bottom-left', timeout: 2770 },
  { message: randomizeMessage(), color: 'accent', position: 'bottom-left', timeout: 18220 },
  { message: randomizeMessage(), color: 'secondary', position: 'top-right', timeout: 15842 },
  { message: randomizeMessage(), color: 'light', position: 'bottom-left', timeout: 10526 },
  { message: randomizeMessage(), color: 'dark', position: 'bottom-left', timeout: 16097 },
  { message: randomizeMessage(), color: 'warning', position: 'top-right', timeout: 13511 },
  { message: randomizeMessage(), color: 'dark', position: 'top-left', timeout: 14010 },
  { message: randomizeMessage(), color: 'negative', position: 'top-left', timeout: 5233 },
  { message: randomizeMessage(), color: 'dark', position: 'top-right', timeout: 14578 },
  { message: randomizeMessage(), color: 'negative', position: 'bottom-left', timeout: 5156 },
  { message: randomizeMessage(), color: 'positive', position: 'top-left', timeout: 12471 },
  { message: randomizeMessage(), color: 'accent', position: 'bottom-left', timeout: 9282 },
  { message: randomizeMessage(), color: 'light', position: 'top-left', timeout: 1877 },
  { message: randomizeMessage(), color: 'primary', position: 'top-left', timeout: 19918 },
  { message: randomizeMessage(), color: 'positive', position: 'bottom-right', timeout: 19087 },
  { message: randomizeMessage(), color: 'negative', position: 'top-right', timeout: 2001 },
  { message: randomizeMessage(), color: 'accent', position: 'top-left', timeout: 19953 },
  { message: randomizeMessage(), color: 'primary', position: 'bottom-right', timeout: 7144 },
  { message: randomizeMessage(), color: 'negative', position: 'bottom-left', timeout: 4195 },
  { message: randomizeMessage(), color: 'light', position: 'top-left', timeout: 16639 },
  { message: randomizeMessage(), color: 'negative', position: 'top-left', timeout: 5233 },
  { message: randomizeMessage(), color: 'info', position: 'top-right', timeout: 12719 },
  { message: randomizeMessage(), color: 'dark', position: 'bottom-left', timeout: 16097 },
  { message: randomizeMessage(), color: 'dark', position: 'top-left', timeout: 8287 },
  { message: randomizeMessage(), color: 'positive', position: 'bottom-left', timeout: 8235 },
  { message: randomizeMessage(), color: 'positive', position: 'bottom-right', timeout: 17095 },
  { message: randomizeMessage(), color: 'accent', position: 'top-right', timeout: 13398 },
  { message: randomizeMessage(), color: 'dark', position: 'bottom-left', timeout: 19392 },
  { message: randomizeMessage(), color: 'accent', position: 'bottom-left', timeout: 18220 },
  { message: randomizeMessage(), color: 'accent', position: 'top-left', timeout: 1033 },
  { message: randomizeMessage(), color: 'positive', position: 'top-left', timeout: 12471 },
  { message: randomizeMessage(), color: 'accent', position: 'bottom-left', timeout: 9282 },
  { message: randomizeMessage(), color: 'positive', position: 'bottom-right', timeout: 19087 },
  { message: randomizeMessage(), color: 'negative', position: 'top-right', timeout: 2001 },
  { message: randomizeMessage(), color: 'accent', position: 'top-left', timeout: 19953 },
  { message: randomizeMessage(), color: 'primary', position: 'bottom-right', timeout: 7144 },
  { message: randomizeMessage(), color: 'light', position: 'top-left', timeout: 16639 },
  { message: randomizeMessage(), color: 'dark', position: 'top-right', timeout: 14578 },
  { message: randomizeMessage(), color: 'positive', position: 'bottom-left', timeout: 8235 },
  { message: randomizeMessage(), color: 'positive', position: 'bottom-right', timeout: 17095 },
  { message: randomizeMessage(), color: 'accent', position: 'top-right', timeout: 13398 },
  { message: randomizeMessage(), color: 'dark', position: 'bottom-left', timeout: 19392 },
  { message: randomizeMessage(), color: 'warning', position: 'bottom-right', timeout: 13059 },
  { message: randomizeMessage(), color: 'accent', position: 'top-left', timeout: 1033 },
  { message: randomizeMessage(), color: 'dark', position: 'top-left', timeout: 5068 },
  { message: randomizeMessage(), color: 'info', position: 'bottom-right', timeout: 2393 },
  { message: randomizeMessage(), color: 'light', position: 'top-left', timeout: 1877 },
  { message: randomizeMessage(), color: 'primary', position: 'top-left', timeout: 19918 },
  { message: randomizeMessage(), color: 'positive', position: 'bottom-right', timeout: 19087 },
  { message: randomizeMessage(), color: 'negative', position: 'bottom-left', timeout: 4195 },
  { message: randomizeMessage(), color: 'dark', position: 'bottom-left', timeout: 2770 },
  { message: randomizeMessage(), color: 'accent', position: 'top-right', timeout: 13398 },
  { message: randomizeMessage(), color: 'dark', position: 'bottom-left', timeout: 19392 },
  { message: randomizeMessage(), color: 'accent', position: 'bottom-left', timeout: 18220 },
  { message: randomizeMessage(), color: 'secondary', position: 'top-right', timeout: 15842 },
  { message: randomizeMessage(), color: 'info', position: 'bottom-right', timeout: 2393 },
  { message: randomizeMessage(), color: 'negative', position: 'bottom-left', timeout: 5156 },
  { message: randomizeMessage(), color: 'positive', position: 'top-left', timeout: 12471 },
  { message: randomizeMessage(), color: 'accent', position: 'bottom-left', timeout: 9282 },
  { message: randomizeMessage(), color: 'dark', position: 'top-left', timeout: 14010 },
  { message: randomizeMessage(), color: 'negative', position: 'top-left', timeout: 5233 },
  { message: randomizeMessage(), color: 'dark', position: 'top-right', timeout: 14578 },
  { message: randomizeMessage(), color: 'secondary', position: 'top-right', timeout: 17932 },
  { message: randomizeMessage(), color: 'positive', position: 'bottom-right', timeout: 17095 },
  { message: randomizeMessage(), color: 'accent', position: 'top-right', timeout: 13398 },
  { message: randomizeMessage(), color: 'dark', position: 'bottom-left', timeout: 19392 },
  { message: randomizeMessage(), color: 'accent', position: 'bottom-left', timeout: 18220 },
  { message: randomizeMessage(), color: 'secondary', position: 'top-right', timeout: 15842 },
  { message: randomizeMessage(), color: 'light', position: 'bottom-left', timeout: 10526 }
];

const showNotification = async () => {
  // Show individual notifications with timeouts
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

  // Fire all notifications at once
  await Promise.all(
    notifications.map(async (notification, index) => {
      await sleep(index * 200);
      return $q.notify(notification);
    })
  );
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
</script>

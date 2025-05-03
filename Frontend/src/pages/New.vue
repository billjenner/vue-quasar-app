<!-- 
    https://www.youtube.com/watch?v=qPkSwo8QyoA
    https://github.com/codingwithjustin/quasar-note-app 
-->

<script>
import Container from '../components/Container.vue'
import { defineComponent, reactive, ref } from 'vue'
import { useLocalNotes } from '../helper'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { Container },
  name: 'PageNew',
  setup() {
    const router = useRouter()
    const notes = useLocalNotes()

    const note = reactive({
      title: '',
      description: '',
      content: ''
    })

    const editor = ref('Here we are overriding the <b>bold</b> command to include a label instead of an icon and also changing its tooltip.')

    const submit = () => {
      notes.value.unshift({
        ...note,
        createdAt: Date.now(),
        updatedAt: Date.now()
      })

      router.push('/')

      note.title = ''
      note.description = ''
      note.content = ''
    }

    return { note, submit, editor }
  }
})
</script>

<template>
  <q-page padding>
    <Container>
      <h3>New Note</h3>
      <q-editor 
            v-model="note.content"       
            :definitions="{ bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}}" />
      <form @submit="submit">
        <q-input class="q-mt-sm" outlined v-model="note.title" label="Title" />

        <q-input
          class="q-mt-sm"
          outlined
          type="textarea"
          v-model="note.description"
          label="Description"
          dense
        />

        <div class="q-mt-md">
          <q-btn color="grey" to="/" type="reset">Cancel</q-btn>
          <q-btn class="q-ml-sm" color="positive" type="submit"> Create </q-btn>
        </div>
      </form>
    </Container>
  </q-page>
</template>

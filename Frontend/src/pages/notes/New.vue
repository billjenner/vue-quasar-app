<script>
import Container from '../../components/notes/Container.vue'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from '../../stores/notesStore'

export default defineComponent({
  components: { Container },
  name: 'PageNew',
  setup() {
    const router = useRouter()
    const notesStore = useNotesStore()

    const note = reactive({
      title: '',
      description: '',
      content: ''
    })

    const editor = ref('Here we are overriding the <b>bold</b> command to include a label instead of an icon and also changing its tooltip.')

    const submit = () => {
      notesStore.addNote(note)
      router.push('/notes')

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

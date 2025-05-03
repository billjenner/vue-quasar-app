import { defineStore } from 'pinia';
import { ref, watch, onBeforeUnmount } from 'vue';

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([]);

  const readFromStorage = () => {
    const raw = localStorage.getItem('notes');
    if (raw) {
      notes.value = JSON.parse(raw);
    }
  };

  const writeToStorage = () => {
    localStorage.setItem('notes', JSON.stringify(notes.value));
  };

  // Watch for changes to update localStorage
  watch(notes, writeToStorage, { deep: true });

  // Read initially
  readFromStorage();

  // Handle cross-tab syncing
  const handleStorage = (e) => {
    if (e.key === 'notes') {
      readFromStorage();
    }
  };

  // Add event listener manually
  window.addEventListener('storage', handleStorage);

  // Clean up when store is no longer used
  onBeforeUnmount(() => {
    window.removeEventListener('storage', handleStorage);
  });

  const addNote = (note) => {
    notes.value.unshift({
      ...note,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  };

  return {
    notes,
    addNote,
    readFromStorage,
  };
});

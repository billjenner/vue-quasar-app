import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref([]);
  const filteredComments = ref([]);
  const hashtags = ref([]);
  const selectedCategory = ref(null);
  const selectedHashtags = ref([]);
  const dateRange = ref({ from: null, to: null });
  const newCommentText = ref('');
  const newCommentCategory = ref(null);
  const newHashtags = ref({});
  const showTagModalVisible = ref({});

  const categories = [
    { label: 'General', value: 'General' },
    { label: 'Feedback', value: 'Feedback' },
    { label: 'Suggestion', value: 'Suggestion' },
    { label: 'Question', value: 'Question' },
    { label: 'Idea', value: 'Idea' },
    { label: 'Discussion', value: 'Discussion' },
  ];

  function addComment() {
    if (newCommentText.value.trim() && newCommentCategory.value) {
      const currentDate = new Date().toISOString().split('T')[0];
      comments.value.push({
        id: comments.value.length + 1,
        text: newCommentText.value.trim(),
        hashtags: [],
        category: newCommentCategory.value,
        date: currentDate,
      });
      newCommentText.value = '';
      newCommentCategory.value = null;
      updateHashtags();
      updateFilteredComments();
    }
  }

  function addHashtagToComment(commentId) {
    const tag = newHashtags.value[commentId]?.trim();
    if (tag) {
      const comment = comments.value.find((c) => c.id === commentId);
      if (comment && !comment.hashtags.includes(tag)) {
        comment.hashtags.push(tag);
      }
      newHashtags.value[commentId] = '';
      updateHashtags();
      updateFilteredComments();
    }
  }

  function removeHashtag(commentId, tag) {
    const comment = comments.value.find((c) => c.id === commentId);
    if (comment) {
      comment.hashtags = comment.hashtags.filter((t) => t !== tag);
      updateHashtags();
      updateFilteredComments();
    }
  }

  function updateHashtags() {
    const tagCounts = {};
    comments.value.forEach((comment) => {
      comment.hashtags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    hashtags.value = Object.entries(tagCounts).map(([tag, count]) => ({
      label: tag,
      value: tag,
      count,
    }));
  }

  function updateFilteredComments() {
    const selectedTags = selectedHashtags.value.map((tag) => tag.value);
    filteredComments.value = comments.value.filter((comment) => {
      const inCategory =
        !selectedCategory.value ||
        comment.category === selectedCategory.value.value;
      const inTags =
        selectedTags.length === 0 ||
        comment.hashtags.some((tag) => selectedTags.includes(tag));
      const inDate =
        (!dateRange.value.from || comment.date >= dateRange.value.from) &&
        (!dateRange.value.to || comment.date <= dateRange.value.to);
      return inCategory && inTags && inDate;
    });
  }

  function clearDateRange() {
    dateRange.value = { from: null, to: null };
    updateFilteredComments();
  }

  function clearAllFilters() {
    selectedCategory.value = null;
    selectedHashtags.value = [];
    dateRange.value = { from: null, to: null };
    updateFilteredComments();
  }

  function showTagModal(commentId) {
    showTagModalVisible.value[commentId] = true;
  }

  async function fetchCommentsFromAPI() {
    try {
      const res = await axios.get('http://localhost:3000/comments');
      comments.value = res.data || [];
      filteredComments.value = [...comments.value];
      updateHashtags();
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  }

  return {
    // State
    comments,
    filteredComments,
    hashtags,
    categories,
    selectedCategory,
    selectedHashtags,
    dateRange,
    newCommentText,
    newCommentCategory,
    newHashtags,
    showTagModalVisible,

    // Actions
    addComment,
    addHashtagToComment,
    removeHashtag,
    updateHashtags,
    updateFilteredComments,
    clearDateRange,
    clearAllFilters,
    fetchCommentsFromAPI,
    showTagModal,
  };
});

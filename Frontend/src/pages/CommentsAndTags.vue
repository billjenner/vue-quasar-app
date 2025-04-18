<template>
  <q-page>
    <!-- Hashtag filter -->

    <div>
      <q-select
        v-model="selectedFilter"
        :options="hashtags"
        multiple
        placeholder="Filter by hashtags"
      />
      <q-checkbox v-model="filterAllTags" label="Require all tags to match" />
      <q-btn label="Apply Filter" @click="applyFilter" />
    </div>

    <!-- Add a new comment -->
    <div>
      <q-input v-model="newCommentText" placeholder="Enter a new comment" />
      <q-btn label="Add Comment" @click="addComment" />
    </div>

    <!-- Comments list -->
    <q-list>
      <q-item v-for="comment in filteredComments" :key="comment.id">
        <q-item-section>
          <div>{{ comment.text }}</div>
          <q-input
            v-model="newHashtags[comment.id]"
            outlined
            clearable
            placeholder="Enter a hashtag and press Enter"
            @keyup.enter="addHashtagToComment(comment.id)"
          />

          <div>
            <q-chip
              v-for="tag in comment.hashtags"
              :key="tag"
              removable
              @remove="removeHashtag(comment.id, tag)"
            >
              {{ tag }}
            </q-chip>
          </div>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- List all hashtags -->
    <div>
      <h3>All Hashtags</h3>
      <q-chip v-for="tag in hashtags" :key="tag">{{ tag }}</q-chip>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      comments: [
        { id: 1, text: 'This is a comment', hashtags: ['tag2', 'tag1'] },
        { id: 2, text: 'Another comment', hashtags: ['tag3', 'tag4'] },
      ],
      hashtags: ['example', 'quasar', 'vue'], // Global hashtag list
      selectedFilter: [],
      filteredComments: [],
      filterAllTags: false, // Toggle between "all tags" and "any tags" filter
      newCommentText: '', // To store new comment text
      newHashtags: {}, // Stores input values keyed by comment ID
    }
  },

  methods: {
    applyFilter() {
      if (this.selectedFilter.length === 0) {
        this.filteredComments = this.comments
      } else if (this.filterAllTags) {
        this.filteredComments = this.comments.filter((comment) =>
          this.selectedFilter.every((tag) => comment.hashtags.includes(tag))
        )
      } else {
        this.filteredComments = this.comments.filter((comment) =>
          this.selectedFilter.some((tag) => comment.hashtags.includes(tag))
        )
      }
    },

    addComment() {
      if (this.newCommentText.trim()) {
        this.comments.push({
          id: this.comments.length + 1,
          text: this.newCommentText.trim(),
          hashtags: [],
        })

        this.newCommentText = ''
        this.filteredComments = this.comments // Refresh the comment list
      }
    },

    addHashtagToComment(commentId) {
      const tag = this.newHashtags[commentId]?.trim()
      if (tag) {
        const comment = this.comments.find((c) => c.id === commentId)

        if (comment && !comment.hashtags.includes(tag)) {
          comment.hashtags.push(tag)

          if (!this.hashtags.includes(tag)) {
            this.hashtags.push(tag)
          }
        }

        // Clear input for that specific comment
        this.$set(this.newHashtags, commentId, '')
      }
    },

    removeHashtag(commentId, tag) {
      const comment = this.comments.find((c) => c.id === commentId)

      if (comment) {
        comment.hashtags = comment.hashtags.filter((t) => t !== tag)

        // Check if the tag is used in any other comment
        const isTagUsed = this.comments.some((c) => c.hashtags.includes(tag))

        if (!isTagUsed) {
          // Remove the hashtag from the global list if unused
          this.hashtags = this.hashtags.filter((t) => t !== tag)
        }
        this.filteredComments = this.comments // Refresh the filtered list
      }
    },
  },

  mounted() {
    this.filteredComments = this.comments
  },
}
</script>

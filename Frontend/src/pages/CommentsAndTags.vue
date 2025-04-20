<template>
  <q-page>
    <!-- Hashtag filter -->


    <div>
      <h6>All Hashtags</h6>
      <q-chip v-for="tag in hashtags" :key="tag">{{ tag }}</q-chip>
    </div>

    <!-- Add a new comment -->
    <div>
      <q-input v-model="newCommentText" placeholder="Enter a new comment" />
      <q-btn label="Add Comment" @click="addComment" />
    </div>

    <!-- Comments list -->
    <q-list>
      <q-item v-for="comment in filteredComments" :key="comment.id">
        <q-item-section class="text-left">
          <div>{{ comment.text }}</div>
          <q-dialog v-model="showTagModalVisible[comment.id]">
            <q-card>
              <q-card-section>
                <div>Add tags:</div>
                <q-input
                  v-model="newHashtags[comment.id]"
                  outlined
                  clearable
                  placeholder="Enter a hashtag and press Enter"
                  @keyup.enter="addHashtagToComment(comment.id)"
                />
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <div>
            <q-btn @click="showTagModal(comment.id)" flat size="sm" class="col-6">Click to add tags...</q-btn>
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

  </q-page>
</template>

<script>
export default {
  data() {
    return {
      comments: [
        { id: 1, text: 'This is a comment', hashtags: ['tag2', 'tag1'] },
        { id: 2, text: 'Another comment', hashtags: ['tag3', 'tag4'] },
        { id: 3, text: 'Another comment', hashtags: ['tag11', 'tag4'] },
        { id: 4, text: 'Another comment', hashtags: ['tag5']},
        { id: 5, text: 'Another comment', hashtags: ['tag6'] },
        { id: 6, text: 'Another comment', hashtags: ['tag6', 'tag7', 'tag8'] },
      ],
      hashtags: ['example', 'quasar', 'vue'], // Global hashtag list
      selectedFilter: [],
      filteredComments: [],
      filterAllTags: false, // Toggle between "all tags" and "any tags" filter
      newCommentText: '', // To store new comment text
      newHashtags: {}, 
      showTagModalVisible: {}// Stores input values keyed by comment ID
    }
  },

  methods: {
    addComment() {
      if (this.newCommentText.trim()) {
        this.comments.push({
          id: this.comments.length + 1,
          text: this.newCommentText.trim(),
          hashtags: [],
        })

            // Clear input for that specific comment
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
        this.newHashtags[commentId] = ''
        this.updateHashtags();
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

        // Clear input for that specific comment
        setTimeout(() => {
          this.newHashtags[commentId] = ''
        }, 0)

        this.updateHashtags();
      }
    },


    showTagModal(commentId) {
      this.showTagModalVisible[commentId] = true
    },

    updateHashtags() {
      const distinctHashtags = [...new Set(this.comments.flatMap(comment => comment.hashtags))];
      this.hashtags = distinctHashtags;
    },
    resetAndRebuildHashtags() {
      this.hashtags = Array.from(new Set(this.comments.flatMap(comment => comment.hashtags)));
    },
  },

  mounted() {
    this.filteredComments = this.comments,
    this.$nextTick(() => {
      this.resetAndRebuildHashtags()
    })
  },
}
</script>

<style>
Insert
.q-list {
  justify-content: flex-start;
}
</style>
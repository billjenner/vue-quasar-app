<template>
  <!-- Right Drawer -->
  <div>
  <q-drawer
    side="right"
    v-model="rightDrawerOpen"
    :mini="miniDrawer"
    show-if-above
    :width="300"
    :mini-width="70"
    bordered
  >
    <q-toolbar>
      <q-btn
        dense
        flat
        icon="chevron_right"
        @click="miniDrawer = !miniDrawer"
        :class="{ 'rotate-180': miniDrawer }"
      />
      <q-toolbar-title v-if="!miniDrawer" class="text-subtitle2">Filters</q-toolbar-title>
    </q-toolbar>

    <div v-if="!miniDrawer" class="q-pa-sm">
      <q-select
        clearable
        filled
        v-model="selectedCategory"
        :options="categories"
        label="Filter by Category"
        @update:model-value="updateFilteredComments"
      />

      <div class="text-subtitle2 q-mb-xs">
        From: {{ dateRange.from || '—' }} &nbsp;&nbsp; To: {{ dateRange.to || '—' }}
      </div>
      <q-date 
        v-model="dateRange" 
        mask="YYYY-MM-DD"
        range 
        bordered
        dense
        minimal
        flat
        class="q-mt-sm"
        @update:model-value="updateFilteredComments" 
      />

      <q-select
        filled
        v-model="selectedHashtags"
        multiple
        :options="hashtags"
        use-chips
        stack-label
        label="Select hashtags"
        class="rounded q-mt-sm"
        @update:model-value="updateFilteredComments"
        :options-dense="true"
      />

      <q-separator class="q-mt-md q-mb-md" />

      <div class="row flex justify-start q-gutter-xs">
        <q-chip v-for="tag in hashtags" :key="tag.value">{{ tag.label }}<span class="text-accent text-weight-bold q-ml-xs">({{ tag.count }})</span></q-chip>
      </div>
    </div>
  </q-drawer>


  <q-page class="full-width">
    <h4>Comments Filters</h4>
    <div class="row">
      <div class="col-8">
        <q-input 
          v-model="newCommentText" 
          placeholder="Enter a new comment" 
          type="textarea"
          autogrow
          filled
          class="highlighted-input"
        />
      </div>
      <div class="col-2 q-ml-md">
        <q-select
          outlined
          v-model="newCommentCategory"
          :options="categories"
          label="Select Category"
        />
      </div>
      <div class="col-1 q-ml-md">
        <q-btn label="Add Comment" @click="addComment" />
        <q-btn label="Reload" @click="fetchCommentsFromAPI" />
      </div>
    </div>

    <div class="q-mt-xl"> 
      <div class="text-subtitle2 q-mb-sm">
        Displaying {{ filteredComments.length }} of {{ comments.length }} comment<span v-if="comments.length !== 1">s</span>
      </div>   <!-- Comments list -->
      <q-list>
        <q-item v-for="comment in filteredComments" :key="comment.id">
          <q-item-section class="text-left">
            <div>
              {{ comment.text }}
              <span class="text-caption text-grey-7"> ({{ comment.date }})</span>
            </div>
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
      <div v-if="filteredComments.length === 0" class="q-pa-md text-grey text-subtitle1 text-center">
        No comments match the selected filters.
      </div>
    </div>
  </q-page>
</div>
</template>

<script>
  import axios from 'axios';
  export default {
  data() {
    return {
      rightDrawerOpen: true,
      miniDrawer: false,
      selectedCategory: null,
      newCommentCategory: null,
      categories: [
        { label: 'General', value: 'General' },
        { label: 'Feedback', value: 'Feedback' },
        { label: 'Suggestion', value: 'Suggestion' },
        { label: 'Question', value: 'Question' },
        { label: 'Idea', value: 'Idea' },
        { label: 'Discussion', value: 'Discussion' },
      ],
      comments: [],
      dateRange: {
        from: null,
        to: null
      },
      hashtags: [], // Global hashtag list
      selectedFilter: [],
      filteredComments: [],
      filterAllTags: false, // Toggle between "all tags" and "any tags" filter
      newCommentText: '', // To store new comment text
      newHashtags: {}, 
      newHashtags2: {},
      showTagModalVisible: {},
      selectedHashtags: [],// Stores input values keyed by comment ID
    }
  },

  methods: {
    addComment() {
      if (this.newCommentText.trim() && this.newCommentCategory) {
        const currentDate = new Date().toISOString().split('T')[0];
        this.comments.push({
          id: this.comments.length + 1,
          text: this.newCommentText.trim(),
          hashtags: [],
          category: this.newCommentCategory,
          date: currentDate,
        })

        // Clear input for that specific comment
        this.newCommentText = ''
        this.newCommentCategory = null
        this.filteredComments = this.comments // Refresh the comment list
      } else {
        // Show an error message if category is not selected
        this.$q.notify({
          message: 'Please select a category',
          color: 'red',
        })
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

    updateFilteredComments() {
      this.filteredComments = this.comments.filter(comment => {
          const withinCategory = !this.selectedCategory || comment.category === this.selectedCategory.value;
          const selectedHashtagValues = this.selectedHashtags.map(tag => tag.value);
          const matchesTags = this.selectedHashtags.length === 0 || comment.hashtags.some(tag => selectedHashtagValues.includes(tag));
          const withinDateRange = (!this.dateRange?.from || comment.date >= this.dateRange.from) &&
                                  (!this.dateRange?.to || comment.date <= this.dateRange.to);
          return withinCategory && matchesTags && withinDateRange;
        });
        var x = this.filteredComments.length;
        var y = this.filteredComments;
        debugger;
      },

    showTagModal(commentId) {
      this.showTagModalVisible[commentId] = true
    },

    updateHashtags() {
      console.log(`[${new Date().toLocaleString()}] Inside updateHashtags() step 1`);
      const hashtagCounts = {};
      this.comments.forEach(comment => {
        comment.hashtags.forEach(tag => {
          if (hashtagCounts[tag]) {
            hashtagCounts[tag]++;
          } else {
            hashtagCounts[tag] = 1;
          }
        });
      });
      this.hashtags = Object.keys(hashtagCounts).map(tag => ({
        label: tag,
        value: tag,
        count: hashtagCounts[tag],
      }));
      console.log(`[${new Date().toLocaleString()}] Inside updateHashtags() step 2`);
    },

    async fetchCommentsFromAPI() {
      try {
        console.log(`[${new Date().toLocaleString()}] Inside fetchCommentsFromAPI() step 1`);
        const response = await axios.get('http://localhost:3000/comments'); // Adjust URL as needed
        console.log(`[${new Date().toLocaleString()}] Inside fetchCommentsFromAPI() step 2`);
        this.comments = response.data || [];
        this.filteredComments = this.comments;
        console.log(`[${new Date().toLocaleString()}] Inside fetchCommentsFromAPI() step 3`);
        this.updateHashtags();
        console.log(`[${new Date().toLocaleString()}] Inside fetchCommentsFromAPI() step 4`);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
        this.$q.notify({
          message: 'Unable to fetch comments from server',
          color: 'negative'
        });
      }
  },
},
  mounted() {
    console.log(`[${new Date().toLocaleString()}] Inside mounted() before fetch`);
    this.fetchCommentsFromAPI();
    console.log(`[${new Date().toLocaleString()}] Inside mounted() after fetch`);
    this.$nextTick(() => {
      console.log(`[${new Date().toLocaleString()}] Inside $nextTick()`);
    })
        //this.filteredComments = this.comments;
  },
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

.q-list {
  justify-content: flex-start;
}

h4 {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 12px;
}

.q-page {
  width: 100%;
  min-width: 0; /* Ensures it doesn't overgrow on flexbox */
  min-height: 100vh; /* Ensures full height */
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}
</style>
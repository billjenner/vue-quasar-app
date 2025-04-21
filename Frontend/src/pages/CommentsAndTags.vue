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
        @update:model-value="updateFilteredCommentsByCategory"
      />

      <q-date 
        v-model="dateRange" 
        mask="YYYY-MM-DD"
        range 
        bordered
        dense
        minimal
        flat
        class="q-mt-sm"
        @update:model-value="updateFilteredCommentsByDate" 
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
        @update:model-value="updateFilteredCommentsByTag"
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
        <q-input v-model="newCommentText" placeholder="Enter a new comment" />
      </div>
      <div class="col-2 ml-4">
        <q-select
          outlined
          v-model="newCommentCategory"
          :options="categories"
          label="Select Category"
        />
      </div>
      <div class="col-2">
        <q-btn label="Add Comment" @click="addComment" />
      </div>
    </div>

    <div class="q-mt-xl">    <!-- Comments list -->
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
    </div>
  </q-page>
</div>
</template>

<script>
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
      comments: [
        { id: 1, text: 'This is a comment', hashtags: ['tag2', 'tag1'], category: 'General', date: '2022-01-01' },
        { id: 2, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate impedit eveniet deserunt, quam atque nisi deleniti esse perferendis commodi voluptas eaque autem quidem quibusdam, corrupti, ratione facilis fugiat molestias distinctio dolores aliquam. Asperiores maiores eligendi quas ducimus quam mollitia ad eius nisi. Repellat hic officiis ea exercitationem natus vero quos!', hashtags: ['tag3', 'tag4'], category: 'Feedback', date: '2022-01-05' },
        { id: 3, text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur, pariatur! Repudiandae tenetur ea maxime voluptatem saepe commodi adipisci dignissimos molestias?', hashtags: ['tag11', 'tag4'], category: 'Suggestion', date: '2022-01-10' },
        { id: 4, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ', hashtags: ['tag5'], category: 'Question', date: '2022-01-12' },
        { id: 5, text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus, reprehenderit cumque?', hashtags: ['tag6'], category: 'Idea', date: '2022-01-15' },
        { id: 6, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quas, fuga neque voluptas et, a quam impedit obcaecati maiores repellat facere amet dolore tempora ad vel iusto fugiat temporibus laborum dicta praesentium ducimus corrupti reprehenderit animi voluptate? Optio ex quia accusamus labore eveniet nesciunt porro doloremque consequuntur sapiente, sint ducimus perspiciatis. Aspernatur vitae optio alias velit ea, atque corporis suscipit aliquam doloribus! Quos quae sit vel accusamus aliquam quam totam, magnam omnis id facere, dolorum atque asperiores nulla unde praesentium vitae repellat minus, voluptas mollitia ipsa? Quisquam officiis hic sint, corrupti nihil amet consequuntur, illum incidunt earum aperiam quibusdam modi rerum tenetur ullam alias aut voluptatibus ea, in exercitationem deserunt consectetur laboriosam, nihil iure error dolor fuga reiciendis enim! Ipsam, necessitatibus labore autem unde, obcaecati esse corrupti debitis exercitationem enim aspernatur aliquid. Sed fugiat officia expedita assumenda nisi neque quis eligendi repellat, architecto praesentium placeat eos eveniet! Quaerat temporibus sapiente aliquid distinctio ducimus sunt officiis harum, alias mollitia aliquam perspiciatis animi vero fuga explicabo cupiditate molestiae eius. Molestiae tempora, ab explicabo quisquam quia eius dolorem odio aperiam blanditiis ipsum soluta totam aut consectetur tempore necessitatibus ex quaerat nobis voluptas. Eveniet praesentium harum, rem dolor placeat vitae fugit.', hashtags: ['tag6', 'tag7', 'tag8'], category: 'Discussion', date: '2022-01-20' },
      ],
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

    updateFilteredCommentsByTag() {
      if (this.selectedHashtags.length === 0) {
        this.filteredComments = this.comments;
      } else {
        this.filteredComments = this.comments.filter(comment => {
          const selectedHashtagValues = this.selectedHashtags.map(tag => tag.value);
          return comment.hashtags.some(tag => selectedHashtagValues.includes(tag));
        });
      }
    },

    updateFilteredCommentsByCategory() {
      if (!this.selectedCategory) {
        this.filteredComments = this.comments;
      } else {
        var z = this.selectedCategory;
        debugger;
        this.comments.forEach(comment => { console.log(comment.id); console.log(comment.category); });
        this.filteredComments = this.comments.filter(comment => {
          return comment.category === this.selectedCategory.value;
        });
      }
    },

    updateFilteredCommentsByDate() {
      if (this.dateRange?.from && this.dateRange?.to) {
        this.filteredComments = this.comments.filter(comment => {
          //console.log(comment.date + '    ' + fromDate + '    ' + toDate);

          return comment.date >= this.dateRange.from && comment.date <= this.dateRange.to;
        });
      } else {
        this.filteredComments = this.comments;
      }
    },


    showTagModal(commentId) {
      this.showTagModalVisible[commentId] = true
    },

    updateHashtags() {
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
    }
  },
  mounted() {
    this.filteredComments = this.comments;
    this.updateFilteredCommentsByCategory(); // Add this line
    this.$nextTick(() => {
      this.updateHashtags()
    })
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

<template>


    <q-page class="full-width">
      <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          Comment Filters
        </q-toolbar-title>
        <q-space />
        <q-tabs>
          <q-route-tab to="/Todos" label="Todos" />
          <q-route-tab to="/todos2" label="todos2" />
          <q-route-tab to="/todoGrid" label="todoGrid" />
        </q-tabs>
        <q-btn dense flat round icon="menu" @click="toggleDrawer" />
      </q-toolbar>
    </q-header>

      <q-toolbar>
      <q-input 
        v-model="newCommentText" 
        placeholder="Enter a new comment" 
        type="textarea"
        autogrow
        filled
        class="highlighted-input flex-1"
        style="min-width: 50vw;"
      />

      <q-select 
        outlined
        v-model="newCommentCategory"
        :options="categories"
        label="Select Category"
        class="flex-none q-pa-md"
        style="min-width: 210px;"
      />

      <q-btn 
        label="Add Comment" 
        @click="addComment" 
        class="flex-none"
      />
      </q-toolbar>

    <q-drawer 
        v-model="drawerOpen" 
        side="left" 
        behavior="mobile"
        :width=265>
      <q-toolbar>
        <q-toolbar-title class="text-primary">Filters</q-toolbar-title>
      </q-toolbar>

      <div class="q-pa-sm">
      <q-btn label="Clear All Filters" @click="clearAllFilters" class="q-mt-md" color="primary" flat />

      <div class="q-mt-xl">
        <q-select  class="q-pa-sm"
          clearable
          filled
          v-model="selectedCategory"
          :options="categories"
          label="Filter by Category"
          @update:model-value="updateFilteredComments"
        />
      </div>

      <div class="text-subtitle2 q-mt-xl">
        From: {{ dateRange.from || '—' }} &nbsp;&nbsp; To: {{ dateRange.to || '—' }}
        <br />
        <q-btn 
        label="Clear Dates" 
        color="primary" 
        flat 
        size="sm" 
        class="q-mt-sm"
        @click="clearDateRange" 
      />
      </div>
      <q-date 
        v-model="dateRange" 
        mask="YYYY-MM-DD"
        range 
        bordered
        dense
        minimal
        flat
        class="q-mt-sm smaller-date"
        @update:model-value="updateFilteredComments" 
      />


      <div class="text-subtitle2 q-mt-xl">
        <q-select
          filled
          v-model="selectedHashtags"
          multiple
          :options="hashtags"
          use-chips
          stack-label
          label="Select hashtags"
          class="rounded q-pa-sm"
          @update:model-value="updateFilteredComments"
          :options-dense="true"
        />
      </div>
      <q-separator class="q-mt-md q-mb-md" />

      <div class="row flex justify-start q-gutter-xs">
        <q-chip v-for="tag in hashtags" :key="tag.value">{{ tag.label }}<span class="text-accent text-weight-bold q-ml-xs">({{ tag.count }})</span></q-chip>
      </div>
    </div>
    </q-drawer>

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
              <q-btn @click="showTagModal(comment.id)" flat size="sm" class="col-6 text-secondary">Click to add tags...</q-btn>
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
</template>

<script>
  import axios from 'axios';
  import { useQuasar } from 'quasar'

  const $q = useQuasar()

  export default {
  data() {
    return {
      drawerOpen: false,
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
    toggleDrawer () {
      this.drawerOpen = !this.drawerOpen
    },
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
        this.updateHashtags();
        this.updateFilteredComments();// Refresh the comment list
      } else {
        // Show an error message if category is not selected
        this.$q.notify({
          message: 'Please select a category',
          color: 'negative',
          position: 'bottom-right',
          timeout: 600
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
        this.updateFilteredComments();
      }
    },

    removeHashtag(commentId, tag) {
      const comment = this.comments.find((c) => c.id === commentId)
      if (comment) {
        comment.hashtags = comment.hashtags.filter((t) => t !== tag)
        const isTagUsed = this.comments.some((c) => c.hashtags.includes(tag))
        if (!isTagUsed) {
          this.hashtags = this.hashtags.filter((t) => t !== tag)
        }
        setTimeout(() => {
          this.newHashtags[commentId] = ''
        }, 0)
        this.updateHashtags();
        this.updateFilteredComments();
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
      },
    clearDateRange() {
      this.dateRange = {};
      this.updateFilteredComments();
    },
    clearAllFilters() {
      this.selectedCategory = null;
      this.selectedHashtags = [];
      this.dateRange = {};
      this.updateFilteredComments();
    },
    async fetchCommentsFromAPI() {
      try {
        const response = await axios.get('http://localhost:3000/comments');
        this.comments = response.data || [];
        this.filteredComments = this.comments;
        this.updateHashtags();
      } catch (error) {
        this.$q.notify({
          message: 'Unable to fetch comments from server',
          color: 'negative'
        });
      }
  },
},
  mounted() {
    //console.log(`[${new Date().toLocaleString()}] Inside mounted() before fetch`);
    this.fetchCommentsFromAPI();
    this.$nextTick(() => {
      this.updateHashtags();
    })
  },
}
</script>
<style scoped>

</style>
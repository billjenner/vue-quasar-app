<template>
  <q-page>
    <h4>Comments Filters</h4>
    <div class="row">
      <div class="col-2 q-pa-md">
        <q-select
          filled
          v-model="selectedHashtags"
          multiple
          :options="hashtags"
          use-chips
          stack-label
          label="Select hashtags"
          label-class="text-secondary"
          class="rounded"
          @update:model-value="updateFilteredComments"
          :options-dense="true"
        />
        <q-separator class="q-mt-md q-mb-md" />

        <div class="row flex justify-start q-gutter-xs">
        <q-chip v-for="tag in hashtags" :key="tag.value">{{ tag.label }}<span class="text-accent text-weight-bold q-ml-xs">({{ tag.count }})</span></q-chip>
      </div>
    </div>
      <div class="col-10 ml-2">
    <!-- Add a new comment -->
    <div class="row">
      <div class="col-10">
        <q-input v-model="newCommentText" placeholder="Enter a new comment" />

      </div>
      <div class="col-2">
        <q-btn label="Add Comment" @click="addComment" />
      </div>
    </div>

    <div class="q-mt-xl">    <!-- Comments list -->
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
  </div>
</div>
</div>


  </q-page>
</template>

<script>
export default {
  data() {
    return {
      comments: [
        { id: 1, text: 'This is a comment', hashtags: ['tag2', 'tag1'] },
        { id: 2, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate impedit eveniet deserunt, quam atque nisi deleniti esse perferendis commodi voluptas eaque autem quidem quibusdam, corrupti, ratione facilis fugiat molestias distinctio dolores aliquam. Asperiores maiores eligendi quas ducimus quam mollitia ad eius nisi. Repellat hic officiis ea exercitationem natus vero quos!', hashtags: ['tag3', 'tag4'] },
        { id: 3, text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur, pariatur! Repudiandae tenetur ea maxime voluptatem saepe commodi adipisci dignissimos molestias?', hashtags: ['tag11', 'tag4'] },
        { id: 4, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ', hashtags: ['tag5']},
        { id: 5, text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus, reprehenderit cumque?', hashtags: ['tag6'] },
        { id: 6, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quas, fuga neque voluptas et, a quam impedit obcaecati maiores repellat facere amet dolore tempora ad vel iusto fugiat temporibus laborum dicta praesentium ducimus corrupti reprehenderit animi voluptate? Optio ex quia accusamus labore eveniet nesciunt porro doloremque consequuntur sapiente, sint ducimus perspiciatis. Aspernatur vitae optio alias velit ea, atque corporis suscipit aliquam doloribus! Quos quae sit vel accusamus aliquam quam totam, magnam omnis id facere, dolorum atque asperiores nulla unde praesentium vitae repellat minus, voluptas mollitia ipsa? Quisquam officiis hic sint, corrupti nihil amet consequuntur, illum incidunt earum aperiam quibusdam modi rerum tenetur ullam alias aut voluptatibus ea, in exercitationem deserunt consectetur laboriosam, nihil iure error dolor fuga reiciendis enim! Ipsam, necessitatibus labore autem unde, obcaecati esse corrupti debitis exercitationem enim aspernatur aliquid. Sed fugiat officia expedita assumenda nisi neque quis eligendi repellat, architecto praesentium placeat eos eveniet! Quaerat temporibus sapiente aliquid distinctio ducimus sunt officiis harum, alias mollitia aliquam perspiciatis animi vero fuga explicabo cupiditate molestiae eius. Molestiae tempora, ab explicabo quisquam quia eius dolorem odio aperiam blanditiis ipsum soluta totam aut consectetur tempore necessitatibus ex quaerat nobis voluptas. Eveniet praesentium harum, rem dolor placeat vitae fugit.', hashtags: ['tag6', 'tag7', 'tag8'] },
      ],
      hashtags: {}, // Global hashtag list
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

    updateFilteredComments() {
      if (this.selectedHashtags.length === 0) {
        this.filteredComments = this.comments;
      } else {
        this.filteredComments = this.comments.filter(comment => {
          debugger;
          var x = comment.hashtags.some(tag => this.selectedHashtags.includes(tag));
          const selectedHashtagValues = this.selectedHashtags.map(tag => tag.value);
          return comment.hashtags.some(tag => selectedHashtagValues.includes(tag));
        });
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
    this.filteredComments = this.comments,
    this.$nextTick(() => {
      this.updateHashtags()
    })
  },
}
</script>

<style>
Insert
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
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
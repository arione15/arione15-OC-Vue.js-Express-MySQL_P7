<template>
  <v-layout column>
    <v-flex xs4>
      <panel title="The Wall">
        <!-- <router-link :to="{name: 'post-create'}"> -->
          <v-btn slot="action" @click="navigateTo({name: 'post-create'})" class="red accent-1" light small absolute right middle fab>
            <!-- <i class="material-icons">add</i> -->
            <v-icon>add</v-icon>
          </v-btn>
          <!-- </router-link> -->
        <div v-for="post in posts" :key="post.index">{{ post.index.title }} - {{ post.content }}</div>
        <!-- <div v-for="message in posts" :key="message.id" :message="message.content" :title="message.title" ></div> -->
      </panel>
    </v-flex>
    <v-text-field class="red--text text--darken-1" v-html="post.error"></v-text-field>
    <v-text-field class="green--text text--darken-1" v-html="post.message"></v-text-field>
  </v-layout>
</template>

<script>
import Panel from '../components/Panel'
import PostService from "../services/PostService.js";

export default {
  components: {
    Panel
  },
  data() {
    return {
      posts: null
      //{
      //   title: "",
      //   content: "",
      //   error: "",
      //   message: "",
      // },
      // response: null
    }
  },
  methode:{
navigateTo(route){
  this.$router.push(route);
}
  },
  async mounted() {
    try {
      const response = (await PostService.getAllPosts()).data;
      this.posts = response;

      this.message = response.message;
    } catch (err) {
      this.error = err.response.error;
    }
  }
}
//   created (){
//     this.allPost();
//   },
//   methods :{
//   allPost: function() {
//       Axios
//       .get ('http://localhost:3000/api/post')
//       .then ((response) => {this.response = response.data;
//       console.log(response.data);
//       })
//       .catch ( error=> console.log(error))
//     }
// }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


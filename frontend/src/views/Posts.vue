<template>
  <v-layout column>
    <v-flex xs4>
      <panel title="The Wall">
        <p v-for="post in posts" :key="post.index">{{ post.title }} - {{ post.content }}</p>
        <!-- <div v-for="message in response" :key="message.id" :message="message.content" :title="message.title" ></div> -->

      </panel>
    </v-flex>
    <!-- <v-text-field class="red--text text--darken-1" v-html="post.error"></v-text-field>
    <v-text-field class="green--text text--darken-1" v-html="post.message"></v-text-field>-->
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
      posts: null,
      //error: null,
      //message: "",
      //response: []
    }
  },
  async mounted() {
    //try {
      this.posts = (await PostService.getAllPosts()).data;
      //this.posts = response;
     // this.message = this.response.data.message;
    // } catch (err) {
    //   this.error = err.this.posts.data.error;
    // }
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


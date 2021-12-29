<template>
  <div class="block postsBlock">
    <h2 class="text-center">Posts</h2>
    
<v-container class="my-5"> 
<v-row>
  <v-col cols="10"> 
      <h2 class="titre">Partagez votre post !</h2>
      <div class="container">
        <div class="card">
          <div class="card-body">
            <form action="" class="">
              <div class="d-flex align-items-start flex-column form-group">
                <!-- <label for="text" class="panel-heading form-label">Nouveau message</label> -->
                <textarea type="message" class="panel-body container-fluid form-control" placeholder="nouveau message" rows="3" ></textarea>
                <!-- <textarea type="message" class="panel-body container-fluid form-control" placeholder="nouveau message" rows="3" v-model="message" v-on:input="message = $event.target.value"></textarea> -->
              </div>
              <div class="mb-3 align-items-start">
                <label for="formFileSm" class="form-label d-flex align-items-start">Ajoutez une image</label>
                <!-- <input class="form-control form-control-sm" type="file" id="file" ref="fileInput" v-on:change="onFileUpload"> -->
                <input class="form-control form-control-sm" type="file" id="file" ref="fileInput">
              </div>
              <div class="d-flex panel-footer form-group">
                <!-- <button class="btn btn-groupomania w-35" @click="createMessage(message)" type="submit" value="Publier">Publier</button> -->
                <button class="btn btn-groupomania w-35" type="submit" value="Publier">Publier</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  </v-col>
  </v-row> 

<v-row> 
  <v-col cols="10" v-for="post of posts" class="post" :key="post.id"> 
  <v-card outlined class="mx-auto" height="100%">
  
    <v-img class="white--text align-end album-image" height="200px" :src="post.attachmentUrl">
    </v-img>
      <v-card-title>{{ post.title }}</v-card-title>

    <v-card-subtitle class="pb-0">
     {{ post.userId }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ new Date(post.createdAt).toString().substring(0,24) }}</div>

      <div>{{ post.content }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="#FD2D01" dark :to="{ name: 'Post', params: { postId: post.id }}">View Post</v-btn>
      <v-btn color="#FD2D01" dark :to="{ name: 'Profil', params: { id: post.userId }}">View Profil</v-btn>
    </v-card-actions>
  </v-card>
  </v-col>
  </v-row>
  </v-container>
  </div>
</template>

<script>
//import Panel from '../components/Panel'
import PostService from "../services/PostService.js"; 

export default {
  components: {
   // Panel
  },
  data() {
    return {
      posts:null
     //response: null
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  },
  async mounted() {
    // try {
    this.posts = (await PostService.getAllPosts()).data.data.sort((a,b)=>new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf())
    this.message = (await PostService.getAllPosts()).data.message
    //console.log(this.posts)
    //console.log(this.message)
    //  this.posts = response;

    //   this.message = response.message;
    // } catch (err) {
    //   this.error = err.response.error;
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


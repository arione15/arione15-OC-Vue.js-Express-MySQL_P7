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
                <form action class>
                  <div class="d-flex align-items-start flex-column form-group">
                     <v-text-field required :rules="rules.required" label="Titre" v-model="post.title">Ajoutez un titre</v-text-field>
                    <v-text-field required :rules="rules.required" label="Contenu" v-model="post.content" multi-line></v-text-field>
                    <label for="formFileSm" class="form-label d-flex align-items-start">Ajoutez une image</label>
                    <input name="image" type="file" v-on:change="selectedFile($event)" />
                    <!-- <label for="text" class="panel-heading form-label">Nouveau message</label> -->
                    <!-- <textarea type="message" class="panel-body container-fluid form-control" placeholder="nouveau message" rows="3" v-model="message" v-on:input="message = $event.target.value"></textarea> -->
                  </div>
                  <div class="d-flex panel-footer form-group">
                    <!-- <button class="btn btn-groupomania w-35" @click="createMessage(message)" type="submit" value="Publier">Publier</button> -->
                    <!-- <button class="btn btn-groupomania w-35" type="submit" value="Publier">Publier</button> -->
                    <v-btn color="#FD2D01" dark @click="publish">Créez votre post !!</v-btn>
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
            <v-img
              class="white--text align-end album-image"
              height="200px"
              :src="post.attachmentUrl"
            ></v-img>
            <v-card-title>{{ post.title }}</v-card-title>

            <v-card-subtitle class="pb-0">{{ post.userId }}</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ new Date(post.createdAt).toString().substring(0, 24) }}</div>

              <div>{{ post.content }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="#FD2D01"
                dark
                :to="{ name: 'Post', params: { postId: post.id } }"
              >View Post</v-btn>
              <v-btn
                color="#FD2D01"
                dark
                :to="{ name: 'Profil', params: { id: post.userId } }"
              >View Profil</v-btn>
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
      posts: {},
      post: {
       //userId: this.$route.store.params.id,
        userId: '',
        title: null,
        content: null,
        attachmentUrl: null,
        //createdAt: null,
      },
      message: "",
      error: null,
      rules: {
        required: [value => !!value || "Ce champs est requis.."]
      },
    };
  },
  methods: {
    async publish() {
      this.error = null;
      // const areAllFieldsFilledIn = Object.keys(this.post).every(key => !!this.post[key])
      // if (!areAllFieldsFilledIn) {
      //   this.error = 'Veuillez remplir tous les champs !'
      //   return
      // }
      console.log("url", this.post.attachmentUrl);
      console.log("content", this.post.content);

      try {
        const formData = new FormData();
        if (this.post.attachmentUrl || this.post.content) {
          formData.append("image", this.post.attachmentUrl);
          formData.append("title", this.post.title);
          formData.append("content", this.post.content);
          formData.append("userId", this.post.userId);
          await PostService.createPost(formData);
          this.get();
          //this.$router.push({ name: "Posts" });
        }
        else {
          console.log("please select a file or enter text");
        }
        //await PostService.createPost(this.post);
        //this.message = response.data.message;
      } catch (err) {
        console.log(err);
        //this.error = err.response.data.error;
      }
    },
    selectedFile(event) {
      this.post.attachmentUrl = event.target.files[0];
    },
    async get(){
      this.posts = (await PostService.getAllPosts()).data.data.sort((b, a) => new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf())

    }
  },
  async mounted() {
    // try {
      this.get();
    console.log("posts", this.posts);
    this.message = (await PostService.getAllPosts()).data.message
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


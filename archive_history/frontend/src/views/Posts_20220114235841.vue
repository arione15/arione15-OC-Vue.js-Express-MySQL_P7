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
                    <v-text-field required :rules="rules.required" label="Contenu" v-model="post.content" multi-line>Ajoutez un texte</v-text-field>
                    <label for="formFileSm" class="form-label d-flex align-items-start">Ajoutez une image</label>
                    <input name="image" type="file" v-on:change="selectedFile($event)" />
                    <v-text-field label="YoutubeID" v-model="post.youtubeId">Ajoutez une vidéo</v-text-field>
                  </div>
                  <div class="d-flex panel-footer form-group">
                    <v-btn color="light-green" dark @click="publishPost()">Créez votre post !!</v-btn>
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
            <v-img class="white--text align-end album-image" height="200px" :src="post.attachmentUrl"></v-img>
            <div>{{ post.youtubeId }}</div>
            <v-card-title>{{ post.title }}</v-card-title>

            <v-card-subtitle class="pb-0">{{ post.User.firstName }}{{ post.User.familyName }}</v-card-subtitle>
            <v-img class="white--text align-end album-image" height="50px" width="50px" :src="post.User.photoUrl"></v-img>
            <v-card-text class="text--primary">
              <div>{{ new Date(post.createdAt).toString().substring(0, 24) }}</div>
              <div>{{ post.content }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="#FD2D01" dark :to="{ name: 'Post', params: { postId: post.id } }">View Post</v-btn>
              <v-btn color="#FD2D01" dark :to="{ name: 'Profil', params: { id: post.User.id } }">View Profil</v-btn>
            </v-card-actions>

            <div class="card p-3 mt-3">
              <div>
                <h3>Commentaires</h3>
                <form action class>
                  <v-row>
                    <v-col v-for="comment of post.Comments" :key="comment.id">
                      <div class="d-flex align-items-start flex-column form-group">
                        <v-img class="white--text align-end avatar-image" :src="comment.User.photoUrl"></v-img>
                        <span>{{ comment.User.firstName }}{{ comment.User.familyName }}</span>
                        <div>{{ comment.message }}</div>
                      </div>
                    </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                    <div class="d-flex panel-footer form-group">
                      <v-text-field required :rules="rules.required" label="Comment" v-model="message" multi-line></v-text-field>
                      <v-btn color="light-blue" dark @click="publishComment(post.id)">Ajouter votre commentaire !!</v-btn>
                    </div>
                    </v-col>
                  </v-row>
                </form>
              </div>
              <!-- <h2>Commentaires</h2>
      <div
        class="d-flex flex-column mt-2"
        v-for="comment in comments"
        v-bind:key="comment.id"
        :comment="comment"
      >
        <div class="d-flex flex-column">
          <div class="d-flex flex-column">
            <h6 class="mb-0">
              {{ comment.User.firstName }} {{ comment.User.familyName }}
            </h6>
            <span class="date">{{ formatDate(comment.createdAt) }}</span>
          </div>
        </div>
        <div class="com d-flex justify-content-between">
          <p class="content">{{ comment.message }}</p>
          <button
            class="btn btn-outline-secondary btn-sm"
            v-if="comment.userId === user.id || user.admin === true"
            @click.prevent="deleteCom(comment)"
          >
            <span class="trash"><i class="fas fa-trash"></i></span>
          </button>
        </div>
              </div>-->
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



<script>
//import Panel from '../components/Panel'
import PostService from "../services/PostService.js";
import CommentService from "../services/CommentService.js";

//import axios from "axios";

export default {
  components: {
    // Panel
  },
  data() {
    return {
      posts: {},
      post: {
        title: "",
        content: "",
        attachmentUrl: "",
        youtubeId: "",
        userId: ""
      },
      comments: {},
      message: "",
      error: null,
      rules: {
        required: [value => !!value || "Ce champs est requis.."]
      },
    };
  },
  methods: {
    async publishPost() {
      this.error = null;
      // const areAllFieldsFilledIn = Object.keys(this.post).every(key => !!this.post[key])
      // if (!areAllFieldsFilledIn) {
      //   this.error = 'Veuillez remplir tous les champs !'
      //   return
      // }

      try {
        const formData = new FormData();
        if (this.post.attachmentUrl || this.post.content) {
          formData.append("image", this.post.attachmentUrl);
          formData.append("title", this.post.title);
          formData.append("content", this.post.content);
          formData.append("youtubeId", this.post.youtubeId);
          await PostService.createPost(formData);
          this.get();
          this.post.title = "";
          this.post.content = "";
          this.post.attachmentUrl = "";
          this.post.youtubeId = "";
          this.post.userId = "";
          //this.$router.push({ name: "Posts" });
        }
        else {
          console.log("please select a file or enter text");
        }
      } catch (err) {
        console.log(err);
        //this.error = err.response.data.error;
      }
    },
    selectedFile(event) {
      this.post.attachmentUrl = event.target.files[0];
    },
    async get() {
      this.posts = (await PostService.getAllPosts()).data
      console.log("1xx", this.posts);

    },

    async publishComment(id) {
      try {
        if (this.message) {
          await CommentService.createComment(id, this.message);
          this.get();
          this.message = "";
        }
        else {
          console.log("please select a file or enter text");
        }
      } catch (err) {
        console.log(err);
        //this.error = err.response.data.error;
      }
    },
    dateFormat(date) {
      const event = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return event.toLocaleDateString('fr-FR', options);
    },
  },
  created() {
    document.cookie = "snToken" + "=" + sessionStorage.getItem("token") + ";" + 24 * 60 * 60 * 1000 + ";path=/"
  },
  mounted() {
    // try {
    this.get();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-image{
  width: 10%;
  /* margin: auto; */
}
</style>


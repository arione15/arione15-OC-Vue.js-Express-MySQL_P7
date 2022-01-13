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
                    <v-btn color="#FD2D01" dark @click="publishPost()">Créez votre post !!</v-btn>
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
                            <div class="post-header">
                    <span class="post-info">Posté le {{dateFormat(post.createdAt)}} par {{post.User.firstName}} {{post.User.familyName}}</span>
                    <span class="post-modify" v-if="post.userId == post.User.userId">Modifier</span> 
                </div>
            <v-img
              class="white--text align-end album-image"
              height="200px"
              :src="post.attachmentUrl"
            ></v-img>
            <v-card-title>{{ post.title }}</v-card-title>
            <!-- <v-card-subtitle class="pb-0">{{ post.User.firstName }} {{ post.User.familyName }}</v-card-subtitle> -->

            <v-card-text class="text--primary">
              <!-- <div>{{ new Date(post.createdAt).toString().substring(0, 24) }}</div> -->

              <div>{{ post.content }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="#FD2D01"
                dark
                :to="{ name: 'Post', params: { postId: post.id } }"
              >Editer le post</v-btn>
              <v-btn
                color="#FD2D01"
                dark
                :to="{ name: 'Profil', params: { id: post.User.id } }"
              >Editer le profil</v-btn>
            </v-card-actions>
            <div>
            <h3>Commentaires</h3>
            <form action class>
                  <div class="d-flex align-items-start flex-column form-group">
                    <v-img class="white--text align-end album-image" height="50px" width="50px" :src="post.User.photoUrl"></v-img>
                    <span>{{ post.User.firstName }}</span>
                    <v-text-field required :rules="rules.required" label="Comment" v-model="comment.message" multi-line></v-text-field>
                    </div>
                  <div class="d-flex panel-footer form-group">
                  <v-btn color="#FD2D01" dark @click="publishComment()">Ajouter votre commentaire !!</v-btn> 
                  </div>
                </form>
              <div class="card p-3 mt-3">

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
      </div> -->

      
          </div>  </div>
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
        title: null,
        content: null,
        attachmentUrl: null,
        userId:""
      },
      comments:{},
      comment:{
      message: "",
      },
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
          //formData.append("userId", this.post.userId);
          await PostService.createPost(formData);
          this.getPosts();
          //this.$router.push({ name: "Posts" });
        }
        else {
          console.log("please select a file or enter text");
        }
        //await PostService.createPost(this.post);
        //this.message = response.data.message;
        this.post.title = "";
          this.post.content = "";
          this.post.attachmentUrl = "";
          this.post.userId = "";
      } catch (err) {
        console.log(err);
        //this.error = err.response.data.error;
      }
    },
    async publishComment() {
        try {
          //let texte= this.message;
        if (this.post.attachmentUrl || this.post.content) {
          //formData.append("userId", this.post.userId);
          await CommentService.createComment(this.post.id);
          this.getComments();
          //this.$router.push({ name: "Posts" });
        }
        else {
          console.log("please select a file or enter text");
        }
        //texte = "";
      } catch (err) {
        console.log(err);
        //this.error = err.response.data.error;
      }
    },
    selectedFile(event) {
      this.post.attachmentUrl = event.target.files[0];
    },
    async getPosts(){
      this.posts = (await PostService.getAllPosts()).data
      console.log("1", this.posts);
    },
    async getComments(){
      this.comments = (await CommentService.getAllComments(this.post.)).data
      console.log("1", this.comments);
    },
    dateFormat(date){
            const event = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return event.toLocaleDateString('fr-FR', options);
  },
  created(){
    document.cookie = "snToken" + "=" + sessionStorage.getItem("token") + ";" + 24*60*60*1000 + ";path=/"
  },
  async mounted() {
      this.getPosts();
      this.getComments();
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


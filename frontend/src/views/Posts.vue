<template>
  <div>

    <panel title="Créer votre post !" class="mb-10">

      <form name="post-form" autocomplete="off" enctype="multipart/form-data">
        <v-text-field placeholder="Titre" v-model="post.title"></v-text-field>
        <v-textarea class="text-justify" auto-grow rows="1" placeholder="Contenu" v-model="post.content"></v-textarea>

        <div class="d-flex  justify-start">
          <label for="files" class="label-file">Choisissez votre fichier </label>
          <span class="file-name"></span>
          <input type="file" id="files" v-on:change="selectedFile($event)" accept="image/png, image/jpeg, image/bmp, image/gif"/>
        </div>
      </form>

      <span class="red--text text--darken-1">{{ err }}</span>
      <span class="green--text text--darken-1">{{ messageSuccess }}</span>
      <v-btn class="btn mt-10" rounded color="green" dark type="submit" @click="publishPost"><span class="font-btn">Postez !</span></v-btn>
    </panel>

    <v-container class="grey lighten-5">
      <v-row class="d-flex justify-center mt-3">
        <v-col cols="12" sm="12" md="10" lg="8" xl="6">
            <div class="white elevation-2">
              <v-toolbar flat dense color="#FD2D01" dark>
                <v-toolbar-title><span class="font-panel">Forum</span></v-toolbar-title>
              </v-toolbar>

              <div class="pa-4">
                <Post v-for="post in posts" @likePost="likePost(post.id)" :post="post" :key="post.id">

                  <template v-slot:delPost v-if="post.User.id === $store.state.user.id || $store.state.user.role == true">
                    <v-list-item @click="removePost(post.id)">
                    <v-list-item-title>Supprimer le post</v-list-item-title>
                    </v-list-item>
                  </template>

                  <template v-slot:publishComment>
                    <!-- <v-text-field v-model="post.Comments.message" label="commentaire"></v-text-field> -->
                    <v-text-field v-model="post.message" label="commentaire"></v-text-field>
                    <v-btn color="green" type="submit" @click.prevent="publishComment(post.id, post.message)" dark class="mb-5">Commentez !</v-btn>
                  </template>

                  <template v-slot:likes>{{ post.Likes.length }}</template>

                  <template v-slot:comments>
                    <div v-for="comment in post.Comments" :key="comment.id">
                      <v-avatar size="50" class="mx-2 my-2" color="grey lighten-2">
                        <v-img alt="user" :src="`${$store.state.localUrl}/${comment.User.photoUrl}`"></v-img>
                      </v-avatar>
                      <div class="font-weight-normal">
                        <strong>{{ comment.User.firstName }} {{ comment.User.familyName }}</strong> @{{ comment.createdAt }}
                      </div>
                      <div>{{ comment.message }}</div>
                      <v-btn v-if="comment.User.id === $store.state.user.id || $store.state.user.role == true || post.userId === $store.state.user.id" v-on:click="delComment(comment.id)">Supprimer</v-btn>
                    </div>
                  </template>
                  
                </Post>
              </div>

            </div>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import PostService from "../services/PostService.js";
import CommentService from "../services/CommentService.js";
import LikeService from "../services/LikeService.js";
import Post from "../components/Post.vue";
import Panel from "../components/Panel";

export default {
  name: "Posts",
  components: {
    Post,
    Panel,
  },
  data() {
    return {
      posts: {},
      post: {
        title: "",
        content: "",
        attachmentUrl: "",
        userId: "",
      },
      comments: {},
      message:"",
      err: "",
      messageSuccess: "",
      rules: {
        required: [(value) => !!value || "Ce champs est requis.."],
      },
      user: {},
    };
  },
  methods: {
    async publishPost() {
      try {
        const formData = new FormData();
        if (this.post.content && this.post.title) {
          formData.append("image", this.post.attachmentUrl);
          formData.append("title", this.post.title);
          formData.append("content", this.post.content);
          const response = await PostService.createPost(formData);
          this.messageSuccess= response.data.message;
            setInterval(()=>{
            this.messageSuccess=""
          }, 2000)
          this.get();
          this.post.title = "";
          this.post.content = "";
          this.post.attachmentUrl = "";
          this.post.youtubeId = "";
          this.post.userId = "";
          //this.$router.push({ name: "Posts" });
        } else {
          this.err= "Il faut remplir tous les champs !";
          //this.err= "";
          setInterval(()=>{
            this.err=""
          }, 2000)
        }
      } catch (error) {
          this.err = error.response.data.message;
            setInterval(()=>{
            this.err=""
          }, 2000)
        }
    },
    selectedFile(event) {
      this.post.attachmentUrl = event.target.files[0];
    },
    async get() {
      this.posts = (await PostService.getAllPosts()).data;
      console.log("this posts", this.posts);
    },
    async publishComment(id, message) {
      try {
        if (message) {
          await CommentService.createComment(id, message);
          this.get();
          this.message = "";
        }
      } catch (error) {
          this.err = error.response.data.message;
      }
    },
    dateFormat(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-FR", options);
    },
    async likePost(id) {
      try {
        await LikeService.createLike(id);
        this.get();
      } catch (error) {
          this.err = error.response.data.message;      }
    },
    async removePost(id) {
      await PostService.deletePost(id);
      const indexPost = this.posts
        .map((element) => {
          // calculer les indices des éléménts puis les comparer avec le id en paramètre : si correspondance, la fonction retourne la valeur de l'index correspondant
          return element.id;
        })
        .indexOf(id);
      this.posts.splice(indexPost, 1);
    },
    async delComment(id) {
      await CommentService.deleteComment(id);
      this.get();
    },
  },
  created() {
    document.cookie = "snToken" + "=" + sessionStorage.getItem("token") +";" + 24 * 60 * 60 * 1000 +";path=/";
  },
  async mounted() {
    this.get();
    //console.log("response009", response);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  display:block;
  margin: auto;
  width:25%;
}
.font-btn{
  font-size: 1.2vw;
}
.posts{
  width: 150%;
}
</style>


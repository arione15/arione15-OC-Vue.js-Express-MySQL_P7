<template>
    <div>

        <form
          name="register-form"
          autocomplete="off"
          enctype="multipart/form-data"
        >
          <v-text-field label="Titre" v-model="post.title"></v-text-field>
          <v-text-field
            label="Contenu"
            v-model="post.content"
            multi-line
          ></v-text-field>
          <img
            class="d-block"
            src="https://img.icons8.com/ios-filled/50/000000/attach-resume-male.png"
          />
          <input
            class="d-block btn-upload"
            name="image"
            type="file"
            v-on:change="selectedFile($event)"
            placeholder="Ajoutez une imagr"
          />
          <!-- <v-text-field label="YoutubeID" v-model="post.youtubeId"></v-text-field> -->
        </form>
        <!-- <v-text-field class="red--text text--darken-1" v-html="error"></v-text-field>
        <v-text-field class="green--text text--darken-1" v-html="message"></v-text-field> -->
        <v-btn class="mt-10" color="#FD2D01" dark type="submit" @click="publishPost">Postez !</v-btn>
        <span class="red--text text--darken-1">{{ err }}</span>
        <span class="green--text text--darken-1">{{ message }}</span>

            <post v-for="post in posts" v-on:likePost="likePost(post.id)" class="post" :post="post" :key="post.id">
              <template v-slot:delPost v-if="post.User.id === $store.state.user.id || $store.state.user.role == true">
                <v-list-item @click="removePost(post.id)">
                  <v-list-item-title>Supprimer le post</v-list-item-title>
                </v-list-item>
              </template>

              <template v-slot:publishComment>
                <!-- <create-comment :message="message" v-on:comment-sent="updateCommentBody"> -->
                <v-text-field label="commenter" v-model="message"></v-text-field>
                <v-btn color="green" type="submit" v-on:click.prevent="publishComment(post.id, message)" dark class="mb-5">Commentez !</v-btn>
                <!-- </create-comment> -->
              </template>
              <template v-slot:likes>{{ post.Likes.length }}</template>

              <template v-slot:comments>
                <Comments
                  v-for="comment in post.Comments"
                  :key="comment.id"
                  :firstName="comment.firstName"
                  :lastName="comment.lastName">
                <template v-slot:comment>
                  <div class="font-weight-normal">
                    <strong>{{ comment.User.firstName }} {{ comment.User.familyName }}</strong> @{{ comment.createdAt }}
                  </div>
                  <div>{{ comment.message }}</div>
                  <v-btn v-if="comment.User.id === $store.state.user.id || $store.state.user.role == true || post.userId === $store.state.user.id" v-on:click="delComment(comment.id)">Supprimer</v-btn>
                </template>
                </Comments>
              </template>
            </post>
  </div>
</template>

<script>
//import Panel from "../components/Panel";
import PostService from "../services/PostService.js";
import CommentService from "../services/CommentService.js";
import LikeService from "../services/LikeService.js";
import Post from "../components/Post.vue";
import Comments from "../components/Comments.vue";


export default {
  name: "Posts",
  components: {
    Post,
    Comments,
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
      //videoId: "",
      comments: {},
      message: "",
      err: "",
      rules: {
        required: [(value) => !!value || "Ce champs est requis.."],
      },
      cards: ["Today", "Yesterday"],
      drawer: null,
      links: [
        ["mdi-inbox-arrow-down", "View Post"],
        ["mdi-send", "View Profil"],
        // ['mdi-delete', 'Trash'],
        // ['mdi-alert-octagon', 'Spam'],
      ],
      likes: {},
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
          this.message= response.data.message;
            setInterval(()=>{
            this.message=""
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
    },
    async publishComment(id, message) {
      try {
        if (message) {
          await CommentService.createComment(id, message);
          this.get();
          this.message = "";
        } else {
          this.err="Choisissez un fichier ou entrer un texte !";
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
    document.cookie =
      "snToken" +
      "=" +
      sessionStorage.getItem("token") +
      ";" +
      24 * 60 * 60 * 1000 +
      ";path=/";
  },
  async mounted() {
    
    this.get();
    console.log("v-if user.id", this.$store.state.user.role);
    //console.log("response009", response);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-image {
  width: 10%;
  /* margin: auto; */
}
.green-color {
  color: green;
}
</style>


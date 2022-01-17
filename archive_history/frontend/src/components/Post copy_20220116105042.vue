<template>
  <v-app id="inspire">

    <v-system-bar app>
      <v-spacer></v-spacer>
      <v-icon>mdi-square</v-icon>
      <v-icon>mdi-circle</v-icon>
      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
        <div>{{ post.User.firstName }}{{ post.User.familyName }}</div>
        <div>{{ new Date(post.createdAt).toString().substring(0, 24) }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-subheader>{{ card }}</v-subheader>
              <v-list two-line>
                <template v-for="n in 6">
                  <v-list-item :key="n">
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Commentaires {{ n }}</v-list-item-title>

                      <v-list-item-subtitle v-model="message"></v-list-item-subtitle>
                      <v-btn color="light-blue" dark @click="publishComment(post.id)">Ajouter votre commentaire !!</v-btn>

                    </v-list-item-content>
                  </v-list-item>

                    <v-btn class="ma-2" text icon color="blue lighten-2" @click="likePost(post.id)">
                      <span  class="material-icons green-color">thumb_up</span>
                    </v-btn>

                  <v-divider v-if="n !== 6" :key="`divider-${n}`" inset></v-divider>
                
                <!-- <v-row>
                          <v-col v-for="comment of post.Comments" :key="comment.id">
                            <div class="d-flex align-items-start flex-column form-group">
                              <v-img
                                class="white--text align-end avatar-image"
                                :src="comment.User.photoUrl"
                              ></v-img>
                              <span>{{ comment.User.firstName }}{{ comment.User.familyName }}</span>
                              <div>{{ comment.message }}</div>
                            </div>
                          </v-col>
                        </v-row>
                
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

  </v-app>
</template>


<script>
//import Panel from '../components/Panel'
import PostService from "../services/PostService.js";
import CommentService from "../services/CommentService.js";
import LikeService from "../services/LikeService.js";

export default {
  name: "Post",
  components: {

  },
  props: {
    post: {
      type: Object
      } 
  },
  data() {
    return {
          //videoId: "",
      comments: {},
      message: "",
      error: null,
      rules: {
        required: [value => !!value || "Ce champs est requis.."]
      },
      cards: ['Today', 'Yesterday'],
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'View Post'],
        ['mdi-send', 'View Profil'],
        // ['mdi-delete', 'Trash'],
        // ['mdi-alert-octagon', 'Spam'],
      ],
      likes:{},
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
      this.posts = (await PostService.getAllPosts()).data;
      
      console.log("1xx", this.post);
      //console.log("2xx", this.likes);

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
async likePost(id){
  try{
    await LikeService.createLike(id);
        console.log("11111Message");
    
  }catch (err) {
        console.log(err);
        //this.error = err.response.data.error;
      }
},

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-image {
  width: 10%;
  /* margin: auto; */
}
  .green-color {
        color:green;
    }
</style>


<template>
  <v-layout column>
    <v-flex xs4>
      <panel title="Modifier Profil">
        <v-text-field required :rules="rules.required" label="Prénom" v-model="user.firstName"></v-text-field>
        <v-text-field required :rules="rules.required" label="Nom" v-model="user.familyName"></v-text-field>
        <v-text-field required :rules="rules.required" label="Email" v-model="user.email"></v-text-field>
        <!-- <v-text-field
          required
          :rules="rules.required"
          label="Biographie"
          v-model="post.content"
          multi-line
        ></v-text-field> -->


        <!-- <v-btn color="success" @click="$refs.inputUpload.click()">Success</v-btn>
<input v-show="false" ref="inputUpload" type="file" @change="yourFunction" >
 -->

        <input name="image"
          type="file"
          v-on:change="selectedFile($event)"
        >

        <!-- <v-text-field label="Image" v-model="post.attachmentUrl"></v-text-field> -->
        <v-text-field
          required
          :rules="rules.required"
          label="Date de création du profil"
          v-model="user.createdAt"
        ></v-text-field>
      </panel>
      <v-alert type="success" v-if="message">{{ message }}</v-alert>
      <v-alert type="error" v-if="error">{{ error }}</v-alert>
    </v-flex>
    <!-- <v-text-field class="red--text text--darken-1" v-html="post.error"></v-text-field> -->
    <!-- <v-text-field class="green--text text--darken-1" v-html="post.message"></v-text-field> -->
    <v-btn color="#FD2D01" dark @click="saveNewProfil">Enregistrez votre profil !!</v-btn>
  <v-layout>
        <v-text-field required :rules="rules.required" label="Password" v-model="user.password"></v-text-field>
        <br><br>
<v-btn color="#FD2D01" dark @click="saveNewPwd()">Enregistrez votre nouveau mot de passe !!</v-btn>
  </v-layout>
  </v-layout>
</template>

<script>
import Panel from '../components/Panel'
import UserService from "../services/UserService.js";

export default {
  name: 'EditProfil',
  components: {
    Panel
  },
  data() {
    return {
      user: {
        firstName: '',
        familyName: null,
        email: null,
        photoUrl: null,
        password: null,
        createdAt: null,
      },
      error: null,
      message: "",
      rules: {
      required: [value => !!value || "Ce champs est requis.."]
      },
    };
  },
  methods: {
     async saveNewProfil() {
      this.error = null;
      try {
        const formData = new FormData();
        if (this.user.photoUrl) {
          formData.append("image", this.user.photoUrl);
          formData.append("firstName", this.user.firstName);
          formData.append("familyName", this.user.familyName);
          formData.append("email", this.user.email);
          await UserService.updateUser(formData);
          this.$router.push({ name: "Posts" });
        }
        else {
          console.log("please select a file or enter modification");
        }
      } catch (err) {
        console.log(err);
        //this.error = err.response.data.error;
      }
    },
    async saveNewPwd(){
      const id = this.$store.state.route.params.id;
      const password= this.user.passsword;
      const newPwd = { password };
      await UserService.updatePwd(id, newPwd);
      this.$router.push({name: 'Posts'});
    },
    async selectedFile(event) {
      let id = this.$store.state.route.params.id
      this.user.photoUrl = event.target.files[0]; 
      const formData = new FormData();
      console.log("photo",this.user.photoUrl);
      formData.append("image", this.user.photoUrl);
      
      try {
        await UserService.updateUser(id, formData)
        // this.$router.push({
        //   name: 'Post',
        //   params: {
        //     postId: postId
        //   }
        // })
      } catch (err) {
        console.log(err)
      }
      //console.log(this.post.attachmentUrl);
    }
  },
  async mounted () {
    try {
      let id = this.$store.state.route.params.id
      this.user = (await UserService.getOneUser(id)).data.data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.danger-alert {
  color: red;
}
</style> 


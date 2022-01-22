<template>
  <v-layout>
      <panel title="Inscription">
        <!-- <form action="/signup" method="POST" name="register-form" autocomplete="off" enctype="multipart/form-data"> -->
        <form name="register-form" autocomplete="off" enctype="multipart/form-data">
          <v-text-field label="Prénom" v-model="user.firstName"></v-text-field>
          <v-text-field label="Nom" v-model="user.familyName"></v-text-field>
          <v-text-field label="Email" v-model="user.email"></v-text-field>
          <v-text-field label="Mot de passe" type="password" v-model="user.password" autocomplete="new-password"></v-text-field>
          <!-- <v-file-input v-model="file"></v-file-input> -->
          <!-- <v-file-input placeholder="Choisissez votre avatar" prepend-icon="mdi-camera" v-on:change="selectedUser($event)" label="Avatar">
          </v-file-input> -->
<div d-flex align-center>
          <img class="d-block" src="https://img.icons8.com/ios-filled/50/000000/attach-resume-male.png" />
          <input class="d-block btn-upload" name="image" type="file" v-on:change="selectedUser($event)" placeholder="Enter your avatar">
</div>

<!-- 
  <span class="material-icons">camera_alt</span>
  <label for="files">Choisissez votre avatar</label>
  <input type="file" id="files" style="visibility:hidden;" v-on:change="selectedUser($event)" name="image"> -->

<!-- 
<span> Choisissez votre avatar</span>
<input type="file" v-on:change="selectedUser($event)" name="image" style="display:none;" /> -->




<!-- 
      <button class="btn-upload" v-on:change="selectedUser($event)" name="image" type="file">Choisissez votre avatar
          <input prepend-icon="mdi-camera" v-on:change="selectedUser($event)" name="image" type="file" class="responsive-img" style="display:none;"></button>
          -->


          <!-- <span class="material-icons" >camera_alt</span> -->


        </form>
        <!-- <v-text-field class="red--text text--darken-1" v-html="error"></v-text-field>
        <v-text-field class="green--text text--darken-1" v-html="message"></v-text-field> -->
        <v-btn class="mt-10" color="#FD2D01" dark type="submit" @click="signup">S'inscrire</v-btn>
      </panel>
  </v-layout>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService.js";
import Panel from '../components/Panel'

export default {
  name: "SignUp",
  components: {
    Panel
  },
  data() {
    return {
      user: {
        firstName: "",
        familyName: "",
        email: "",
        password: "",
        role: "basic",
        photoUrl: "",
      },
      file: null,
        error: null,
        message: "",
    };
  },
  methods: {
    signup: async function() {
      //qui récupère les identifiant entrées par l'utilisateur et les envoie (post) au backend
      try {
        const formData = new FormData(); 
        if (this.user.photoUrl) {
          formData.append("firstName", this.user.firstName);
          formData.append("familyName", this.user.familyName);
          formData.append("email", this.user.email);
          formData.append("password", this.user.password);
          formData.append("role", this.user.role);
          formData.append("image", this.user.photoUrl);
          //formData.append("image", this.file);
          const response = await AuthenticationService.signupUser(formData);

          this.$store.dispatch('setToken', response.data.token);
          this.$store.dispatch('setUser', response.data.user);

          this.$router.push({ name: "Login" });
        }
      } catch (err) {
        console.log("2", err);
        //this.user.error = err.response.data.error;
      }
    },
    selectedUser(event) {
      console.log("1", event.target.files[0]);
      this.user.photoUrl = event.target.files[0]; 
    }
  }
};
</script>

<style scoped>
.parent-div {
  display: inline-block;
  position: relative;
  overflow: hidden;
}
.parent-div input[type=file] {
  left: 0;
  top: 0;
  opacity: 0;
  position: absolute;
  font-size: 90px;
}
.btn-upload {
  background-color: #fff;
  border: 1px solid #000;
  color: #000;
  padding: 10px 25px;
  border-radius: 10px;
  font-size: 1rem;
}
</style>


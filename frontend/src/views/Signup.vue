<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="Inscription">
        <!-- <form action="/signup" method="POST" name="register-form" autocomplete="off" enctype="multipart/form-data"> -->
        <form name="register-form" autocomplete="off" enctype="multipart/form-data">
          <v-text-field label="First name" v-model="user.firstName"></v-text-field>
          <v-text-field label="Family name" v-model="user.familyName"></v-text-field>
          <v-text-field label="Email" v-model="user.email"></v-text-field>
          <v-text-field label="Password" type="password" v-model="user.password" autocomplete="new-password"></v-text-field>
          <v-text-field label="Rôle" v-model="user.role"></v-text-field>
          <!-- <v-text-field label="Image" v-model="photoUrl"></v-text-field> -->
          <input name="image" type="file" class="responsive-img" v-on:change="selectedUser($event)" placeholder="Enter your avatar">


        </form>
        <!-- <v-text-field class="red--text text--darken-1" v-html="error"></v-text-field>
        <v-text-field class="green--text text--darken-1" v-html="message"></v-text-field> -->
        <v-btn color="#FD2D01" dark type="submit" @click="signup">S'inscrire</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService.js";
import Panel from '../components/Panel'

export default {
  name: "SignUp",
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
        error: null,
        message: "",
    };
  },
  methods: {
    async signup() {
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
          const response = await AuthenticationService.signupUser(formData);

          this.$store.dispatch('setToken', response.data.token);
          this.$store.dispatch('setUser', response.data.user);

          this.$router.push({ name: "Login" });
          //console.log(formData);
        }
        // const response = await AuthenticationService.signup({
        //   firstName: this.user.firstName,
        //   familyName: this.user.familyName,
        //   email: this.user.email,
        //   password: this.user.password,
        //   role: this.user.role,
        //   photoUrl: this.user.photoUrl
        // });


        // this.user.message = response.data.message;
        // this.$store.dispatch("setToken", response.data.token);
        // this.$store.dispatch("setUser", response.data.user);
      } catch (err) {
        console.log("2", err);
        //this.user.error = err.response.data.error;
      }
    },
    
    selectedUser(event) {
      console.log("1", event.target.files[0]);
      this.user.photoUrl = event.target.files[0]; 
      //console.log(this.post.attachmentUrl);
    }
  },
  components: {
    Panel
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


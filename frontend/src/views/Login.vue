<template>
  <v-layout>
      <panel title="Identification">

        <form name="register-form" autocomplete="off">
          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field label="Password" type="password" v-model="password" autocomplete="new-password"></v-text-field>
        </form>
          <v-btn color="#FD2D01" dark type="submit" @click="login">S'identifier</v-btn>

          <span class="green--text text--darken-1">{{ message }}</span>
          <span class="red--text text--darken-1">{{ err }}</span>

      </panel>
  </v-layout>
</template>

<script>

import AuthenticationService from "../services/AuthenticationService.js";
import Panel from '../components/Panel'
import axios from 'axios'
//import setHeaders from '../utils'

export default {
  name: 'Login',
  data() {
    return {
      email: "",
      password: "",
      err: "",
      message: "",
    };
  },
  methods: {
    async login() {
      //qui récupère les identifiants entrées par l'utilisateur et les envoie (post) au backend
      try {
        const response = await AuthenticationService.loginUser({
          email: this.email,
          password: this.password
        });
        //this.message = response.data.message;
        sessionStorage.setItem("token", response.data.cryptedCookie);
        this.$axios.defaults.headers.common["Authorization"] = "Bearer " + sessionStorage.getItem("token")
        console.log("headers", axios.defaults.headers);
        this.$store.dispatch('setUser', response.data.user);
        console.log("mmmm", this.$store.state.user);
        this.$store.dispatch('setToken', response.data.cryptedCookie);
        this.$router.push({ name: 'Posts' });
      } catch (err) {
        console.log("myerr", err);
        //this.error = err.response.data.error;
      }
    },
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
.error {
  color: red;
}
.message {
  color: green;
}
</style>


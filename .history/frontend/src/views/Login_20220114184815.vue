<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="Identification">
        <form name="register-form" autocomplete="off">
          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            autocomplete="new-password"
          ></v-text-field>
        </form>
        <v-text-field class="red--text text--darken-1" v-html="error"></v-text-field>
        <v-text-field class="green--text text--darken-1" v-html="message"></v-text-field>
        <v-btn color="#FD2D01" dark type="submit" @click="login">S'identifier</v-btn>
      </panel>
    </v-flex>
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
      error: null,
      message: "",
    };
  },
  methods: {
    async login() {
      //qui récupère les identifiant entrées par l'utilisateur et les envoie (post) au backend
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
.message {
  color: green;
}
</style>


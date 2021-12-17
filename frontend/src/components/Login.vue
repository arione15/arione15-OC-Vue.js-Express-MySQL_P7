<template>
    <v-layout column>
      <v-flex xs6>
        <div class="white elevation-2">
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-img alt="Groupomania logo" max-height="150" max-width="250" :src="require('../assets/icon-above-font.png')"></v-img>
            <h1>Identifiez-vous</h1>
            <v-text-field label="Email" v-model="email"></v-text-field>
            <v-text-field label="Password" type="password" v-model="password" autocomplete="new-password"></v-text-field>
            <v-text-field label="Error" v-html="error"></v-text-field>
            <v-text-field label="Error" v-html="message"></v-text-field>
            <v-btn color="#FD2D01" dark type="submit" @click="login">S'identifier</v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
</template>

<script>

import AuthenticationService from "../services/AuthenticationService.js";

export default {
  name: 'Login',
  data() {
    return {
      email: "",
      password: "",
      error: null,
      message: ""
    };
  },
  methods: {
    async login() {
      //qui récupère les identifiant entrées par l'utilisateur et les envoie (post) au backend
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        });
        console.log(response.data);
      } catch (error) {
        this.error = error.response.data.error;
      }

      //console.log(response.data, 'hello');
    }
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


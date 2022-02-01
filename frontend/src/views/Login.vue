<template>
  <v-layout>
      <panel title="Identification">
        <form name="register-form" autocomplete="off">
          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field label="Password" type="password" v-model="password" autocomplete="new-password"></v-text-field>
        </form>
          <v-btn class="btn mt-10" rounded color="#FD2D01" dark type="submit" @click="login"><span class="font-panel">Envoyer</span></v-btn>
      <v-alert type="error" v-if="err">{{ err }}</v-alert>
      </panel>
  </v-layout>
</template>

<script>

import AuthenticationService from "../services/AuthenticationService.js";
import Panel from '../components/Panel'
//import setHeaders from '../utils'

export default {
  name: 'Login',
  data() {
    return {
      email: "",
      password: "",
      err: "",
    };
  },
  methods: {
    async login() {
      //qui récupère les identifiants entrées par l'utilisateur et les envoie (post) au backend
      try {
        if (this.email && this.password) {
          const response = await AuthenticationService.loginUser({
            email: this.email,
            password: this.password
        });
        sessionStorage.setItem("token", response.data.cryptedCookie);
        this.$axios.defaults.headers.common["Authorization"] = "Bearer " + sessionStorage.getItem("token")
        this.$store.dispatch('setUser', response.data.user);
        this.$store.dispatch('setToken', response.data.cryptedCookie);
        this.$router.push({ name: 'Posts' });
      } else {
          this.err= "Il faut remplir tous les champs !";
          setInterval(()=>{
            this.err=""
          }, 3000)
        }
      } catch (error) {
          this.err = error.response.data.message;
          }
  }
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
.btn {
      font-size:0.5vw;
      display:block;
      margin: auto;
      width:30%;
}
</style>


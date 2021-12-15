<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <img alt="Groupomania logo" src="../assets/icon-above-font.png" />
          <!-- <HelloWorld msg="Welcome to Groupomania social network"/> -->
          <h1>Inscription</h1>
          <input
            type="text"
            v-model="firstName"
            name="firstName"
            placeholder="First name"
          />
          <br /><br />
          <input
            type="text"
            v-model="familyName"
            name="familyName"
            placeholder="Family name"
          />
          <br /><br />
          <input
            type="email"
            v-model="email"
            name="email"
            placeholder="Email"
          />
          <br /><br />
          <input
            type="password"
            v-model="password"
            name="password"
            placeholder="Password"
          />
          <br /><br />
          <input type="text" v-model="role" name="role" placeholder="Rôle" />
          <br /><br />
          <!-- <br /><br />
          <img alt="bla"/>
          <br /><br /> -->
          <input type="" v-model="photoUrl" name="photoUrl" placeholder="Photo de profil"/>
          <br /><br />
          <div class="err" v-html="error"></div>
          <br /><br />
          <v-btn class="cyan" type="submit" @click="register" name="register" value="Signup">
            Signup
          </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService.js";
export default {
  data() {
    return {
      firstName: "",
      familyName: "",
      email: "",
      password: "",
      role: "",
      photoUrl: "",
      error: null,
    };
  },
  methods: {
    async register() {
      //qui récupère les identifiant entrées par l'utilisateur et les envoie (post) au backend
      try {
        await AuthenticationService.register({
          firstName: this.firstName,
          familyName: this.familyName,
          email: this.email,
          password: this.password,
          role: this.role,
        });
      } catch (error) {
        this.error = error.response.data.error;
      }

      //console.log(response.data, 'hello');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.err {
  color: red;
}
</style>


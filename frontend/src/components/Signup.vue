<template>
    <v-layout column>
      <v-flex xs6>
        <div class="white elevation-2">
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-img
              alt="Groupomania logo"
              max-height="150"
              max-width="250"
              :src="require('../assets/icon-above-font.png')"
            ></v-img>
            <h1>Inscription</h1>
            <v-text-field label="First name" v-model="firstName"></v-text-field>
            <br />
            <v-text-field label="Family name" v-model="familyName"></v-text-field>
            <br />
            <v-text-field label="Email" v-model="email"></v-text-field>
            <br />
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
              autocomplete="new-password"
            ></v-text-field>
            <v-text-field label="Rôle" v-model="role"></v-text-field>
            <!-- <br /><br />
          <img alt="bla"/>
            <br /><br />-->
            <!-- <input type="text" v-model="photoUrl" name="photoUrl" placeholder="Photo de profil"/> -->
            <div class="error" v-html="error"></div>
            <v-text-field label="Error" v-html="error"></v-text-field>
            <div class="message" v-html="message"></div>
            <v-text-field label="Error" v-html="message"></v-text-field>
            <v-btn color="#FD2D01" dark type="submit" @click="signup">S'inscrire</v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService.js";

export default {
  name: 'SignUp',
  data() {
    return {
      firstName: "",
      familyName: "",
      email: "",
      password: "",
      role: "",
      //photoUrl: "",
      error: null,
      message: "",
    };
  },
  methods: {
    async signup() {
      //qui récupère les identifiant entrées par l'utilisateur et les envoie (post) au backend
      try {
        const response = await AuthenticationService.signup({
          firstName: this.firstName,
          familyName: this.familyName,
          email: this.email,
          password: this.password,
          role: this.role,
          //photoUrl: this.photoUrl
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


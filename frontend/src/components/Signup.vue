<template>

  <div class="home">
    <img alt="Groupomania logo" src="../assets/icon-above-font.png">
    <!-- <HelloWorld msg="Welcome to Groupomania social network"/> -->
    <h1>Inscription</h1>
    <input type="text" v-model="firstName" name="firstName" placeholder="First name" />
    <br /><br />
    <input type="text" v-model="familyName" name="familyName" placeholder="Family name" />
    <br /><br />
    <input type="email" v-model="email" name="email" placeholder="Email" />
    <br /><br />
    <input type="password" v-model="password" name="password" placeholder="Password"/>
    <br /><br />
    <input type="text" v-model="role" name="role" placeholder="Rôle"/>
    <br /><br />
    <!-- <input type="" v-model="photoUrl" name="photoUrl" placeholder="Photo de profil"/> -->
    <br /><br />
    <button type="submit" @click="signup" name="signup" value="Signup">Signup</button>
  </div>
  
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
    };
  },
  methods: {
    async signup() { //qui récupère les identifiant entrées par l'utilisateur et les envoie (post) au backend
      const response = await AuthenticationService.signup({
        firstName: this.firstName,
        familyName: this.familyName,
        email: this.email,
        password: this.password,
        role: this.role,
      });
      console.log(response.data, 'hello');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>


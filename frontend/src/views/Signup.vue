<template>
  <v-layout>
    <panel title="Inscription">
      <!-- <form action="/signup" method="POST" name="register-form" autocomplete="off" enctype="multipart/form-data"> -->
      <form
        name="register-form"
        autocomplete="off"
        enctype="multipart/form-data"
      >
        <v-text-field label="Prénom" v-model="user.firstName"></v-text-field>
        <v-text-field label="Nom" v-model="user.familyName"></v-text-field>
        <v-text-field label="Email" v-model="user.email"></v-text-field>
        <v-text-field
          label="Mot de passe"
          type="password"
          v-model="user.password"
          autocomplete="new-password"
        ></v-text-field>

        <div>
          <input
            type="file"
            id="files"
            class="hidden"
            style="width: 90px"
            v-on:change="selectedUser($event)"
          />
          <label for="files">Select file</label>
        </div>
      </form>
      <span class="red--text text--darken-1">{{ err }}</span>
      <v-btn class="mt-10" color="#FD2D01" dark type="submit" @click="signup"
        >S'inscrire</v-btn
      >
    </panel>
  </v-layout>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService.js";
import Panel from "../components/Panel";

export default {
  name: "SignUp",
  components: {
    Panel,
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
      err: "",
    };
  },
  methods: {
    signup: async function () {
      //qui récupère les identifiant entrées par l'utilisateur et les envoie (post) au backend
      try {
        const formData = new FormData();
        //if (this.user.photoUrl) {
        formData.append("firstName", this.user.firstName);
        formData.append("familyName", this.user.familyName);
        formData.append("email", this.user.email);
        formData.append("password", this.user.password);
        formData.append("role", this.user.role);
        formData.append("image", this.user.photoUrl);
        console.log("2222");

        const response = await AuthenticationService.signupUser(formData);
        console.log("resp signup", response);

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$router.push({ name: "Login" });
      } catch (error) {
        if (JSON.parse(JSON.stringify(error)).status === 409) {
          this.err = "Cet email existe, choisissez un autre !";
        } else if (JSON.parse(JSON.stringify(error)).status === 400) {
          this.err = "Erreur serveur !";
        }
      }
    },
    selectedUser(event) {
      this.user.photoUrl = event.target.files[0];
    },
  },
};
</script>

<style scoped>
.parent-div {
  display: inline-block;
  position: relative;
  overflow: hidden;
}
.parent-div input[type="file"] {
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
input[type="file"] {
  width: 90px;
  color: transparent;
}
</style>


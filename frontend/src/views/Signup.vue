<template>
    <panel title="Inscription">

      <!-- <form action="/signup" method="POST" name="register-form" autocomplete="off" enctype="multipart/form-data"> -->
      <form name="register-form" autocomplete="off" enctype="multipart/form-data">
        <v-text-field placeholder="Prénom" v-model="user.firstName"></v-text-field>
        <v-text-field placeholder="Nom" v-model="user.familyName"></v-text-field>
        <v-text-field placeholder="Email" v-model="user.email"></v-text-field>
        <v-text-field placeholder="Mot de passe" type="password" v-model="user.password" autocomplete="new-password"></v-text-field>

        <div class="d-flex justify-start">
          <label for="files" class="label-file">Choisissez votre avatar </label>
          <span class="file-name"></span>
          <input type="file" id="files" v-on:change="selectedUser($event)" accept="image/png, image/jpeg, image/bmp, image/gif"/>
        </div>
      </form>

      <span class="red--text text--darken-1">{{ err }}</span>
      <v-btn class="btn mt-10" rounded color="#FD2D01" dark type="submit" @click="signup"><span class="font-btn">Envoyer</span></v-btn>

    </panel>
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
        photoUrl: "",
      },
      err: "",
    };
  },
  methods: {
    signup: async function () {
      //qui récupère les identifiant entrées par l'utilisateur et les envoie (post) au backend
      try {
        if (this.user.firstName && this.user.familyName && this.user.email && this.user.password && this.user.photoUrl) {
        const formData = new FormData();
        formData.append("firstName", this.user.firstName);
        formData.append("familyName", this.user.familyName);
        formData.append("email", this.user.email);
        formData.append("password", this.user.password);
        formData.append("image", this.user.photoUrl);

        const response = await AuthenticationService.signupUser(formData);

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$router.push({ name: "Login" });
        }else {
          this.err= "Il faut remplir tous les champs !";
          setInterval(()=>{
            this.err=""
          }, 3000)
        }
      } catch (error) {
        //console.log("resp signup", error.response); // error est un objet avec response comme propriété
          this.err = error.response.data.message;
        }
      },
    selectedUser(e) {
      this.user.photoUrl = e.target.files[0];
    // Get the selected file
    //const [file] = this.user.photoUrl;
    // Get the file name and size
    const { name: fileName, size } = this.user.photoUrl;
    // Convert size in bytes to kilo bytes
    const fileSize = (size / 1000).toFixed(2);
    // Set the text content
    const fileNameAndSize = `${fileName} - ${fileSize} KB`;
    document.querySelector('.file-name').textContent = fileNameAndSize;
  },
},
};
</script>

<style>
/*on personnalise le label */
.label-file {
    cursor: pointer;
    color: #555;
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    margin-top: 1.5rem;
    font-size: 0.85rem;
}
.label-file:hover {
    color: #73cbe0;
}
/* et on masque le input*/
input[type="file"] {
    display: none;
}
.file-name {
  font-size: 0.85rem;
  color: #555;
  margin-left: 10px;
  margin-top: 2rem;
}
.btn {
      display:block;
      margin: auto;
      width:auto;
}
.font-btn{
  font-size: 1.2vw;
}
v-text-field {
  font-size: 2vw;
}
</style>


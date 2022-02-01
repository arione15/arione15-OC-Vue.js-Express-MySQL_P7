<template>
  <v-layout column>
    <v-flex xs4>
      <panel title="Modifier Profil">
        <v-text-field
          required
          :rules="rules.required"
          label="Prénom"
          v-model="user.firstName"
        ></v-text-field>
        <v-text-field
          required
          :rules="rules.required"
          label="Nom"
          v-model="user.familyName"
        ></v-text-field>
        <v-text-field
          required
          :rules="rules.required"
          label="Email"
          v-model="user.email"
        ></v-text-field>

        <input name="image" type="file" v-on:change="selectedFile($event)" />

      </panel>
      <v-alert type="error" v-if="err">{{ err }}</v-alert>
    </v-flex>
  
    <v-btn color="#FD2D01" dark @click="saveNewProfil"
      >Enregistrez votre profil !!</v-btn
    >
    <v-layout>
      <v-text-field type="password" required :rules="rules.required" label="Password" v-model="password"></v-text-field>
      <br /><br />
      <v-btn color="#FD2D01" dark @click="saveNewPwd"
        >Enregistrez votre nouveau mot de passe !!</v-btn
      >
    </v-layout>
  </v-layout>
</template>

<script>
import Panel from "../components/Panel";
import UserService from "../services/UserService.js";

export default {
  name: "EditProfil",
  components: {
    Panel,
  },
  data() {
    return {
      user: {
        firstName: "",
        familyName: "",
        email: "",
        photoUrl: "",
        createdAt: null,
      },
      password: "",
      err: "",
      rules: {
        required: [(value) => !!value || "Ce champs est requis.."],
      },
    };
  },
  methods: {
    async saveNewProfil() {
      this.error = null;
      try {
        if(this.user.firstName == "" || this.user.familyName == "" || this.user.email == ""){
          this.err="Renseigner les champs !"
        }else{
        const formData = new FormData();
        let id = this.$store.state.route.params.id;
        formData.append("firstName", this.user.firstName);
        formData.append("familyName", this.user.familyName);
        formData.append("email", this.user.email);
        await UserService.updateUser(id, formData);
        const response = await UserService.getOneUser(this.$store.state.user.id);
        this.$store.dispatch('setUser', response.data.data);
        this.$router.push({ name: "Posts" });
        }
      } catch (error) {
          this.err = error.response.data.message;
      }
    },
    async saveNewPwd() {
      
      const id = this.$store.state.route.params.id;
      const password = this.password;
      const newPwd = { password: password }; // car le back attend un objet
      if (this.password==="") {
        this.err= "Remplissez le champs du mot de passe !";
      }else {
        try {
          await UserService.updatePwd(id, newPwd);
          this.$router.push({ name: "Posts" });
        } 
        catch (error) {
          this.err = error.response.data.message;
          }
        }
      
    },
    async selectedFile(event) {
      let id = this.$store.state.route.params.id;
      this.user.photoUrl = event.target.files[0];
      const formData = new FormData();
      formData.append("image", this.user.photoUrl);

      try {
        await UserService.updateUser(id, formData);
      } catch (error) {
          this.err = error.response.data.message;
      }
  },
  },
  async mounted() {
    try {
      let id = this.$store.state.route.params.id;
      this.user = (await UserService.getOneUser(id)).data.data;
    } catch (error) {
          this.err = error.response.data.message;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.danger-alert {
  color: red;
}
</style> 


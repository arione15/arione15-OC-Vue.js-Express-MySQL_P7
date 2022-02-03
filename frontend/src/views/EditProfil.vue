<template>
  <div>
    <panel title="Modifier le profil">

      <form name="editProfil-form" autocomplete="off" enctype="multipart/form-data">
        <v-text-field required :rules="rules.required" label="Prénom" v-model="user.firstName"></v-text-field>
        <v-text-field required :rules="rules.required" label="Nom" v-model="user.familyName"></v-text-field>
        <v-text-field required :rules="rules.required" label="Email" v-model="user.email"></v-text-field>
        <div class="d-flex  justify-start mb-5">
          <label for="files" class="label-file">Choisissez votre avatar</label>
          <span class="file-name"></span>
          <input type="file" id="files" v-on:change="selectedAvatar($event)" accept="image/png, image/jpeg, image/bmp, image/gif"/>
        </div>
      </form>

      <v-alert type="error" v-if="err">{{ err }}</v-alert>
      <v-btn class="btn font-btn mb-5" color="#FD2D01" dark @click="saveNewProfil"><span class="font-btn">Enregistrez le nouveau profil !!</span></v-btn>
      <v-text-field type="password" required :rules="rules.required" label="Nouveau mot de passe" v-model="password"></v-text-field>
      <v-btn class="btn font-btn mr-5" color="#FD2D01" dark @click="saveNewPwd"><span class="font-btn">Enregistrez le nouveau mot de passe !!</span></v-btn>
    
    </panel>
  </div>
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
    async selectedAvatar(event) {
      let id = this.$store.state.route.params.id;
      this.user.photoUrl = event.target.files[0];
      const formData = new FormData();
      formData.append("image", this.user.photoUrl);
      const { name: fileName, size } = this.user.photoUrl;
      const fileSize = (size / 1000).toFixed(2);
      const fileNameAndSize = `${fileName} - ${fileSize} KB`;
      document.querySelector('.file-name').textContent = fileNameAndSize;

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


<template>
  <v-layout column>
    <v-flex xs4>
      <panel title="Modifier Profil">
        <v-text-field required :rules="rules.required" label="Prénom" v-model="user.firstName"></v-text-field>
        <v-text-field required :rules="rules.required" label="Nom" v-model="user.familyName"></v-text-field>
        <v-text-field required :rules="rules.required" label="Email" v-model="user.email"></v-text-field>
        <!-- <v-text-field
          required
          :rules="rules.required"
          label="Biographie"
          v-model="post.content"
          multi-line
        ></v-text-field> -->


        <!-- <v-btn color="success" @click="$refs.inputUpload.click()">Success</v-btn>
<input v-show="false" ref="inputUpload" type="file" @change="yourFunction" >
 -->

        <input name="image"
          type="file"
          v-on:change="selectedFile($event)"
        >

        <!-- <v-text-field label="Image" v-model="post.attachmentUrl"></v-text-field> -->
        <v-text-field
          required
          :rules="rules.required"
          label="Date de création du profil"
          v-model="user.createdAt"
        ></v-text-field>
      </panel>
      <v-alert type="success" v-if="message">{{ message }}</v-alert>
      <v-alert type="error" v-if="error">{{ error }}</v-alert>
    </v-flex>
    <!-- <v-text-field class="red--text text--darken-1" v-html="post.error"></v-text-field> -->
    <!-- <v-text-field class="green--text text--darken-1" v-html="post.message"></v-text-field> -->
    <v-btn color="#FD2D01" dark @click="save">Enregistrez votre profil !!</v-btn>
  </v-layout>
</template>

<script>
import Panel from '../components/Panel'
import UserService from "../services/UserService.js";

export default {
  name: 'EditProfil',
  components: {
    Panel
  },
  data() {
    return {
      user: {
        firstName: '',
        familyName: null,
        email: null,
        photoUrl: null,
        createdAt: null,
       // bio:
      },
      error: null,
      message: "",
      rules: {
      required: [value => !!value || "Ce champs est requis.."]
      },
    };
  },
  methods: {
    async save () {
      this.error = null
      this.message = ""
      //const formData = new FormData();
      // const areAllFieldsFilledIn = Object
      //   .keys(this.song)
      //   .every(key => !!this.song[key])
      // if (!areAllFieldsFilledIn) {
      //   this.error = 'Please fill in all the required fields.'
      //   return
      // }
          
      const id = this.$store.state.route.params.id;
      //const userId= this.post.userId; 
      const firstName= this.user.firstName; 
      const familyName= this.user.familyName; 
      const email= this.user.email; 
      //const attachmentUrl= this.post.attachmentUrl; 
      const createdAt= this.user.createdAt;
      const newUser = {id, firstName, familyName, email, createdAt};
      console.log(newUser);
      try {
        await UserService.updateUser(id, newUser)
        this.$router.push({
          name: 'Profil',
          params: {
            id: id
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    async selectedFile(event) {
      let id = this.$store.state.route.params.id
      this.user.photoUrl = event.target.files[0]; 
      const formData = new FormData();
      console.log("photo",this.user.photoUrl);
      formData.append("image", this.user.photoUrl);
      
      try {
        await UserService.updateUser(id, formData)
        // this.$router.push({
        //   name: 'Post',
        //   params: {
        //     postId: postId
        //   }
        // })
      } catch (err) {
        console.log(err)
      }
      //console.log(this.post.attachmentUrl);
    }
  },
  async mounted () {
    try {
      let id = this.$store.state.route.params.id
      this.user = (await UserService.getOneUser(id)).data.data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.danger-alert {
  color: red;
}
</style> 


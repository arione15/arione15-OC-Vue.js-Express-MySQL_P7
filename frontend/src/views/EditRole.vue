<template>
<v-app>
      <v-container class="my-5">
    <v-layout>
      <h1>Le rôle de {{ user.firstName }}</h1>
            <v-row align="center">
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
     <select id="monselect" @click="(e)=>selectRole(e.target.value)">
  <option value="">Choisir le rôle</option>
  <option value=1>Admin</option>
  <option value=0>User</option>
</select>
      </v-col>
      </v-row>
          <v-alert type="error" v-if="err">{{ err }}</v-alert>
          <v-btn  color="#FD2D01" dark @click="save">Modifier</v-btn>
    </v-layout>
    </v-container>
    </v-app>
</template>

<script>
import UserService from "../services/UserService.js";
// import PostService from "../services/PostService.js";
// import Panel from '../components/Panel'

export default {
  name: 'EditRole',
  components: {
    
  },
  data() {
    return {
      user: {},
      role:"",
      err:"",

    }
  },
  methods:{
    selectRole(role){
this.role=role;
    },
    async save () {
      this.error = null
      this.message = ""
      const id = this.$store.state.route.params.id;
      console.log("id",id );
      const role = this.role;
      const firstName= this.user.firstName; 
      const familyName= this.user.familyName; 
      const email= this.user.email; 
      const createdAt= this.user.createdAt;
      const newUser = {id, firstName, familyName, email, createdAt, role};
      try {
        if(this.role==""){
          this.err ="Choisissez un rôle !"
        }else{
        await UserService.updateUser(id, newUser)
        this.$router.push({
          name: 'Admin'
        })
        }
      } catch (error) {
          this.err = error.response.data.message;
      }
  },
  async mounted () {
    try {
      let id = this.$store.state.route.params.id
      this.user = (await UserService.getOneUser(id)).data.data
    } catch (error) {
          this.err = error.response.data.message;
    }
  }
}}
</script>

<style scoped>
.post {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.post-title {
  font-size: 30px;
}
.post-content {
  font-size: 24px;
}
.post-userId {
  font-size: 18px;
}

.post-createdAt {
  font-size: 16px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
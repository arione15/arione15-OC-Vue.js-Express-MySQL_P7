<template>
  <panel title="Modifier le rôle">

    <v-form name="role-form" autocomplete="off" enctype="multipart/form-data">
      <!-- <h3>Le rôle de {{ user.firstName }} {{ user.familyName }}</h3> -->

      <div class="d-flex flex-column">
      <select id="monselect" @click="(e)=>selectRole(e.target.value)">
        <option value="">Clquer içi pour choisir le rôle</option>
        <option value=1>Admin</option>
        <option value=0>User</option>
      </select>

      <v-btn  class="red mt-16" dark @click="save">Enregistrer</v-btn>
      </div>
    </v-form>

    <v-alert type="error" v-if="err">{{ err }}</v-alert>

  </panel>
</template>

<script>
import UserService from "../services/UserService.js";
// import PostService from "../services/PostService.js";
import Panel from '../components/Panel'

export default {
  name: 'EditRole',
  components: {
    Panel,
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

</style>
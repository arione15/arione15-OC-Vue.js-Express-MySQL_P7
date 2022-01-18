<template>
  <v-app id="inspire" app>
    <h2 class="text-center">Admin</h2>
<div v-for="user in users.data" :key="user.id">
    
                <v-avatar size="56">
                  <img alt="user" :src="user.photoUrl" />
                </v-avatar>
                <span class="infoPost">{{ user.firstName }} {{ user.familyName }}</span>
                <v-btn color="red" v-on:click.prevent="changeRole(user.id)" :to="{ name: 'Role-edit' }" dark class="mb-5">Modifier le rôle</v-btn>
                <v-btn color="yellow" v-on:click.prevent="removeUser(user.id)" dark class="mb-5">Supprimer</v-btn>


</div>

  </v-app>
</template>



<script>
import UserService from "../services/UserService.js";


export default {
  name: "Admin",
  components : {
    //EditProfil
  },
  data() {
    return {
      users:{}
    }  
  },
  methods:{
async changeRole(id, role){
 await UserService.updateUser(id, role);
},
  },  
  async mounted() {
    this.users = await UserService.getAllUsers();
    console.log("users admin", this.users)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-image {
  width: 10%;
  /* margin: auto; */
}
  .green-color {
        color:green;
    }
</style>


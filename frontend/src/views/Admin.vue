<template>
<div>
            <v-alert type="error" v-if="err">{{ err }}</v-alert>
  <v-simple-table fixed-header height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">Utilisateur</th>
          <th class="text-center">Rôle</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users.data" :key="user.id">
          <td class="text-xs-center">
            <v-avatar size="56">
              <img alt="user" :src="`${$store.state.localUrl}/${user.photoUrl}`" />
              

            </v-avatar>
            <span>{{ user.firstName }} {{ user.familyName }}</span>
          </td>
          <td>
            <span v-if="user.role === '0'">User</span>
            <span v-if="user.role === '1'">Admin</span>
          </td>  
          <td>
            <v-container fill-height>
              <v-layout row wrap align-center>
                <v-flex class="text-xs-center">
                  <v-btn color="red" :to="{ name: 'Role-edit',  params: { id: user.id } }" dark class="mb-5 mr-4">Modifier le rôle</v-btn>
                  <v-btn color="yellow" @click.prevent="removeUser(user.id)" dark class="mb-5">Supprimer</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </td>
          
        
        </tr>

      </tbody>
    </template>
  </v-simple-table>
  </div>
</template>
    

<script>
import UserService from "../services/UserService.js";

export default {
  name: "Admin",
  components: {
    //EditProfil
  },
  data() {
    return {
      users: {},
      err:"",
    };
  },
  methods: {
    async removeUser(id) {

      try{
       await UserService.deleteUser(id);
        this.users = await UserService.getAllUsers(); // pour afficher les users sans celui qui a été supprimé
      }catch (error) {
        
        if (JSON.parse(JSON.stringify(error)).status === 400) {
          this.err = "Ne pas supprimer l'Admin !";
          setInterval(()=>{
            this.err=""
          }, 2000)
        } else if (JSON.parse(JSON.stringify(error)).status === 500) {
          this.err = "Erreur serveur !";
          setInterval(()=>{
            this.err=""
          }, 2000)
        }
      }
    },
  },
  async mounted() {
    this.users = await UserService.getAllUsers();
    console.log("users admin", this.users);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-image {
  width: 10%;
  /* margin: auto; */
}
.green-color {
  color: green;
}
.action {
  vertical-align: middle;
}
</style>


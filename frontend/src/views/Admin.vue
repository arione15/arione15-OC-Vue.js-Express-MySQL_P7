<template>
  <v-simple-table fixed-header height="300px">
    <h2 class="text-center">Espace Administrateur</h2>
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
              <img alt="user" :src="user.photoUrl" />
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
                  <v-btn color="red" v-on:click.prevent="changeRole(user.id)" :to="{ name: 'Role-edit' }" dark class="mb-5 mr-4">Modifier le rôle</v-btn>
                  <v-btn color="yellow" v-on:click.prevent="removeUser(user.id)" dark class="mb-5">Supprimer</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </td>
        </tr>

      </tbody>
    </template>
  </v-simple-table>
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
    };
  },
  methods: {
    async changeRole(id, role) {
      await UserService.updateUser(id, role);
    },
    async removeUser(id) {
      await UserService.deleteUser(id);
      this.users = await UserService.getAllUsers(); // pour afficher les users sans celui qui a été supprimé
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


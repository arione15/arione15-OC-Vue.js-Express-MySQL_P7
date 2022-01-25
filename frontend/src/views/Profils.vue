<template>
  <v-layout column>
    <v-flex xs4>
      <panel title="Tous les utilisateur">
        <!-- <router-link :to="{name: 'user-create'}"> -->
        <!-- <v-btn
          slot="action"
          @click="navigateTo({ name: 'user-create' })"
          class="red accent-1"
          light
          small
          absolute
          right
          middle
          fab
        > -->
          <!-- <i class="material-icons">add</i> -->
          <!-- <v-icon>add</v-icon>
        </v-btn> -->
        <!-- </router-link> -->
        <div v-if="users">
          <div v-for="user in users" class="user" :key="user.id">
            <v-layout>
              <v-flex xs6>
                <div class="user-firstname">{{ user.firstName }}</div>
                <div class="user-familyname">{{ user.familyName }}</div>
                <div class="user-createdAt">{{ new Date(user.createdAt).toString().substring(0, 15) }}</div>
                <v-btn dark color="red" @click="navigateTo({ name: 'Profil', params: { id: user.id } })">{{ user.id }} Voir profil</v-btn>
              </v-flex>

              <v-flex xs6>
                <img class="album-image" :src="`${$store.state.localUrl}/${user.photoUrl}`" />
              </v-flex>
            </v-layout>
          </div>
        </div>
        <!-- <div v-for="message in users" :key="message.id" :message="message.content" :title="message.title" ></div> -->
      </panel>
    </v-flex>
    <!-- <v-text-field class="red--text text--darken-1" v-html="user.error"></v-text-field>
    <v-text-field class="green--text text--darken-1" v-html="user.message"></v-text-field>-->
  </v-layout>
</template>

<script>
import Panel from '../components/Panel'
import UserService from "../services/UserService.js";

export default {
  name: 'Profils',
  components: {
    Panel
  },
  data() {
    return {
      users: null
      //response: null
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  },
  async mounted() {
    // try {
    this.users = (await UserService.getAllUsers()).data.data
    this.message = (await UserService.getAllUsers()).data.message
    //console.log(this.users)
    //console.log(this.message)
    //  this.users = response;

    //   this.message = response.message;
    // } catch (err) {
    //   this.error = err.response.error;
  }
}
//   created (){
//     this.alluser();
//   },
//   methods :{
//   alluser: function() {
//       Axios
//       .get ('http://localhost:3000/api/user')
//       .then ((response) => {this.response = response.data;
//       console.log(response.data);
//       })
//       .catch ( error=> console.log(error))
//     }
// }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.user-title {
  font-size: 30px;
}
.user-content {
  font-size: 24px;
}
.user-userId {
  font-size: 18px;
}

.user-createdAt {
  font-size: 16px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>


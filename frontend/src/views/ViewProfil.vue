<template>
  <panel title="User">
    <v-layout>
      <v-flex xs6>
        <div class="user-firstname">
          {{user.firstName}}
        </div>
        <div class="user-familyname">
          {{user.familyName}}
        </div>
        <v-btn dark class="cyan" :to="{name: 'Profil-edit', params() {return {id: user.id}}}">Edit</v-btn>
      </v-flex>
      <v-flex xs6>
        <img class="album-image" :src="user.photoUrl" />
        <br>
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import UserService from "../services/UserService.js";
import Panel from '../components/Panel'

export default {
  name: 'ViewProfil',
    components: {
    Panel
  },
    data(){
        return{
            user: {}
        }
    },
    async mounted () {
    const id = this.$store.state.route.params.id
    this.user = (await UserService.getOneUser(id)).data.data
    console.log(this.user)
    // if (this.isUserLoggedIn) {
    //   PostHistoryService.post({
    //     postId: postId
    //   })
    // }
  },
}
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
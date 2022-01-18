<template>
  <panel title="User">
      <v-container class="my-5">
    <v-layout>
      <h1>Le rôle de {{ user.firstName }}</h1>
            <v-card-title>{{ user.role }}</v-card-title>
             <v-btn  color="#FD2D01" dark :to="{ name: 'Profil', params: { id: post.User.id } }"
                >Modifier</v-btn>
    </v-layout>
    </v-container>
  </panel>
</template>

<script>
// import UserService from "../services/UserService.js";
// import PostService from "../services/PostService.js";
// import Panel from '../components/Panel'

export default {
  name: 'EditRole',
  components: {
    
  },
  data() {
    return {
      user: {},

    }
  },
  methods:{
   
  },
  async mounted() {
    
  }
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
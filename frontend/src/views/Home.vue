<template>
  <v-container class="home-container">
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo_transparent.png')"
          class="my-2 "
          contain
          height="100"
          alt="logo"
        />
      </v-col>

      <v-col class="mb-4 px-5">
        <h1 class="display-1 font-weight-bold mb-5">
          Bienvenue sur le réseau social de Groupomania !
        </h1>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-space-around">
      <div class= "col-lg-4">
        <div class= "bg-white text-left d-flex justify-space-around">
          <router-link to="Signup" class="font-weight-bold btn btn-dark mx-1 p-3">Nouveau ?</router-link>
          <router-link to="Login" class="font-weight-bold btn btn-dark mx-1 p-3">Déjà inscrit ?</router-link>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  mounted(){
    sessionStorage.removeItem("token");
      document.cookie = "snToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  },
}
</script>

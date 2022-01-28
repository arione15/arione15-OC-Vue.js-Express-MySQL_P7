<template>
  <div>
    <h1 class="router-link display-1 font-weight-bold mb-5 mt-10" style="font-size:1.3rem; color: #FD522E;">Bienvenue sur le réseau social de Groupomania !</h1>
    
    <v-container class="home-container">
      <v-row class="d-flex justify-space-around" justify="center" align="center">
        <v-col class="mb-5 px-5" justify="center">
          <v-img :src="require('../assets/logo_transparent.png')" class="logo" contain height="100" alt="logo"/>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row class="d-flex justify-space-around mt-2">
        <v-col xs="12" sm="12" md="6" lg="6" xl="6">
          <router-link to="Signup" style="font-size:1.3rem; text-decoration: none; color: #FD522E;" class="font-weight-bold btn mx-auto">Nouveau ?</router-link>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="6" xl="6">
          <router-link to="Login" style="font-size:1.3rem; text-decoration: none; color: #FD522E;" class="font-weight-bold btn mx-auto">Déjà inscrit ?</router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted(){
    sessionStorage.removeItem("token");
    document.cookie = "snToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  },
}
</script>

<style>
.home-container {
  background: url('../assets/bat-colore.jpg') no-repeat center center;
  background-size: cover;
  /*background-color: #FD522E;*/
  max-width: 100%;
  height:50vh;
  position: relative;
  background-color: transparent;
  margin-top: 5rem;
}
.logo{
  position: absolute;
  top:-4rem
}
</style>
<template>
  <div>
    <h1 class="router-link fonts font-weight-bold mb-5 mt-10" style="color: #FD522E;">Bienvenue sur le réseau social de Groupomania !</h1>
    
    <v-container class="home-container">
          <v-img :src="require('../assets/logo_transparent.png')" class="logo" alt="logo"></v-img>
          <v-img :src="require('../assets/bat-colore.jpg')" class="batiment" alt="batiment"></v-img>
    </v-container>

    <v-container>
      <v-row class="d-flex justify-space-around mt-2">
        <v-col xs="12" sm="12" md="6" lg="6" xl="6">
          <router-link to="Signup" style="text-decoration: none; color: #FD522E;" class="fonts font-weight-bold btn mx-auto">Nouveau ?</router-link>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="6" xl="6">
          <router-link to="Login" style="text-decoration: none; color: #FD522E;" class="fonts font-weight-bold btn mx-auto">Déjà inscrit ?</router-link>
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

<style scoped>
.home-container {
  position: relative;
  width: 100%;
}
.batiment{
  width: 100%;
  height: auto;
  margin-top:10%;
}
.logo{
  z-index: 100; 
  position: absolute;
  display: inline-block;
  top: 13%;
  width: 10%;
  transform: translateX(-50%);
}
.fonts{
  font-size: 2vw;
}
</style>
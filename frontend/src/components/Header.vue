<template>
<v-app>
  <main>
    <v-toolbar fixed color="#FD2D01" dark>
      <!-- <v-toolbar-title class="mr-4">
        <router-link class="home" tag="span" :to="{ name: 'Home' }">Accueil</router-link>
      </v-toolbar-title> -->
      <v-toolbar-items>
        <v-btn text dark :to="{ name: 'Home', }">Accueil</v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn text dark :to="{ name: 'Posts', }">Mur</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text dark :to="{ name: 'Signup', }">Signup</v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn text dark :to="{ name: 'Login', }">Login</v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn text dark :to="{ name: 'Logout', }">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    </main>
    </v-app>
</template>

<script>
export default {

}


</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: #e9e;
}
</style>
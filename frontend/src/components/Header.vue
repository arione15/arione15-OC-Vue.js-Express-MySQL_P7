<template>
      <v-app-bar fixed color="#FD2D01" dark>
        <v-toolbar-items>
          <v-img alt="Groupomania logo" max-height="75" max-width="125" :src="require('../assets/icon-above-font.png')"></v-img>
        </v-toolbar-items>
        <v-toolbar-items>
          <v-btn text dark :to="{ name: 'Home', }">Home</v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
          <v-btn v-if="$store.state.isUserLoggedIn" text dark :to="{ name: 'Posts', }">Wall</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn v-if="!$store.state.isUserLoggedIn" text dark :to="{ name: 'Signup', }">Signup</v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
          <v-btn v-if="!$store.state.isUserLoggedIn" text dark :to="{ name: 'Login', }">Login</v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
          <v-btn v-if="$store.state.isUserLoggedIn" text dark @click="logout">Logout</v-btn>
        </v-toolbar-items>
      </v-app-bar>
</template>

<script>
export default {
methods: {
  logout(){
    this.$store.dispatch('setToken', null)
    this.$store.dispatch('setUser', null)
    // redirect to homepage
    this.$router.push({name: 'Home'})
  }
}
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
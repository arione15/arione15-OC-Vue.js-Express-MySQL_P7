<template>
      <v-app-bar fixed color="#FD2D01" dark>
        <v-toolbar-items>
          <v-img alt="Groupomania logo" max-height="75" max-width="125" :src="require('../assets/icon-above-font.png')"></v-img>
        </v-toolbar-items>
        <v-toolbar-items>
          <v-btn text dark :to="{ name: 'Home'}"><span class="material-icons">home</span></v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
          <v-btn v-if="$store.state.isUserLoggedIn" text dark :to="{ name: 'Posts'}"><span class="material-icons">dynamic_feed</span></v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn v-if="!$store.state.isUserLoggedIn" text dark :to="{ name: 'Signup' }"><span class="material-icons">subscriptions</span></v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
          <v-btn v-if="$store.state.isUserLoggedIn" text dark :to="{ name: 'Login' }"><span class="material-icons">login</span></v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
          <v-btn v-if="!$store.state.isUserLoggedIn" text dark @click="logout" :to="{ name: 'Home' }"><span class="material-icons">logout</span></v-btn>
        </v-toolbar-items>
      </v-app-bar>
</template>

<script>
export default {
methods: {
  logout(){
    this.$store.dispatch('setToken', null);
    this.$store.dispatch('setUser', null);
    this.$store.state.isUserLoggedIn=false;
    sessionStorage.setItem("token", null);
    // redirect to homepage
    //this.$router.push({name: 'Home'}).catch(()=>{}); //tip to avoid redundant navigation to current location error message (it's not a real error!)
  console.log("bbbb", this.$store.state.isUserLoggedIn);
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
<template>
  <v-app-bar fixed color="#FD2D01" dark>
    <v-toolbar-items>
      <v-img
        alt="Groupomania logo"
        max-height="75"
        max-width="125"
        :src="require('../assets/icon-above-font.png')"
      ></v-img>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" text dark :to="{ name: 'Home' }"
            ><span class="material-icons">home</span></v-btn
          >
        </template>
        <span>Accueil</span>
      </v-tooltip>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs"
            v-on="on"
            v-if="$store.state.isUserLoggedIn"
            text
            dark
            :to="{ name: 'Posts' }"
            ><span class="material-icons">dynamic_feed</span></v-btn
          >
        </template>
        <span>Mur</span>
      </v-tooltip>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" v-if="!$store.state.isUserLoggedIn" text dark :to="{ name: 'Signup' }"><span class="material-icons">subscriptions</span></v-btn
          >
        </template>
        <span>Inscription</span>
      </v-tooltip>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs"
            v-on="on"
            v-if="!$store.state.isUserLoggedIn"
            text
            dark
            :to="{ name: 'Login' }"
            ><span class="material-icons">login</span></v-btn
          >
        </template>
        <span>Login</span>
      </v-tooltip>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            v-if="$store.state.isUserLoggedIn" text
            dark
            @click="logout"
            :to="{ name: 'Home' }"
            ><span class="material-icons">logout</span></v-btn
          >
        </template>
        <span>Sortir</span>
      </v-tooltip>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            v-if="$store.state.isUserLoggedIn && $store.state.user && $store.state.user.role == 1" text
            dark
            :to="{ name: 'Admin' }"
            ><span class="material-icons"> admin_panel_settings</span></v-btn
          >
        </template>
        <span>Administrateur</span>
      </v-tooltip>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$store.state.isUserLoggedIn = false;
      //sessionStorage.setItem("token", null);
      sessionStorage.clear();

      // redirect to homepage
      //this.$router.push({name: 'Home'}).catch(()=>{}); //tip to avoid redundant navigation to current location error message (it's not a real error!)
    },
  },
};
</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: #e9e;
}
</style>
<template>
  <v-app-bar fixed color="#FD2D01" dark>
    <v-toolbar-items>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            text
            dark
            color="#FD2D01"
            :to="{ name: 'Home' }"
          >
            <v-img
              alt="Groupomania logo"
              max-height="25px"
              max-width="150px"
              :src="require('../assets/icon-left-font-monochrome-white.png')"
            ></v-img>
          </v-btn>
        </template>
        <span>Accueil</span>
      </v-tooltip>
    </v-toolbar-items>

    <v-btn v-if="$store.state.isUserLoggedIn" text dark :to="{ name: 'Posts' }">
      Forum
    </v-btn>

    <v-spacer></v-spacer>

    <v-avatar v-if="$store.state.user" size="40" class="grey lighten-2">
      <img alt="avatar" :src="$store.state.user.photoUrl"/>
    </v-avatar>
    <span v-if="$store.state.user" class="text-caption white--text mb-2">{{
      $store.state.user.firstName
    }}</span>

    <v-btn
      v-if="!$store.state.isUserLoggedIn"
      text
      dark
      :to="{ name: 'Signup' }"
      >Inscription
    </v-btn>

    <v-btn v-if="!$store.state.isUserLoggedIn" text dark :to="{ name: 'Login' }"
      >Login
    </v-btn>

    <v-btn
      v-if="$store.state.isUserLoggedIn"
      text
      dark
      @click="logout"
      :to="{ name: 'Home' }"
      >Sortir
    </v-btn>

    <v-btn
      v-if="$store.state.isUserLoggedIn === true && $store.state.user && $store.state.user.role == true" text dark :to="{ name: 'Admin' }">Admin
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$store.state.isUserLoggedIn = false;
      sessionStorage.clear();
    },
  },
};
</script>

<style>
</style>
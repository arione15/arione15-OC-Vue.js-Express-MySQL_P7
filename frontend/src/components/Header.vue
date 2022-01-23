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

    <v-toolbar-items>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="$store.state.isUserLoggedIn"
            v-bind="attrs"
            v-on="on"
            text
            dark
            :to="{ name: 'Posts' }"
          >
            <span class="material-icons">dynamic_feed</span>
          </v-btn>
        </template>
        <span>Forum</span>
      </v-tooltip>
    </v-toolbar-items>

    <v-spacer></v-spacer>
      <v-flex >
    <v-layout column align-center fill-height class="pt-3">
        <v-avatar size="40" class="grey lighten-2">
          <img
            v-if="$store.state.isUserLoggedIn"
            alt="avatar"
            :src="$store.state.user.photoUrl"
          />
        </v-avatar>
      <span class="text-caption white--text mb-2">{{
        $store.state.user.firstName
      }}</span>
    </v-layout>
      </v-flex>

    <v-toolbar-items>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="!$store.state.isUserLoggedIn"
            v-bind="attrs"
            v-on="on"
            text
            dark
            :to="{ name: 'Signup' }"
          >
            <span class="material-icons">subscriptions</span>
          </v-btn>
        </template>
        <span>Inscription</span>
      </v-tooltip>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="!$store.state.isUserLoggedIn"
            v-bind="attrs"
            v-on="on"
            text
            dark
            :to="{ name: 'Login' }"
          >
            <span class="material-icons">login</span>
          </v-btn>
        </template>
        <span>Login</span>
      </v-tooltip>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="$store.state.isUserLoggedIn"
            text
            dark
            @click="logout"
            v-bind="attrs"
            v-on="on"
            :to="{ name: 'Home' }"
          >
            <span class="material-icons">logout</span>
          </v-btn>
        </template>
        <span>Sortir</span>
      </v-tooltip>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="
              $store.state.isUserLoggedIn === true &&
              $store.state.user &&
              $store.state.user.role === '1'
            "
            v-bind="attrs"
            v-on="on"
            text
            dark
            :to="{ name: 'Admin' }"
          >
            <span class="material-icons"> admin_panel_settings</span>
          </v-btn>
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
      sessionStorage.clear();
    },
  },
};
</script>

<style>
</style>
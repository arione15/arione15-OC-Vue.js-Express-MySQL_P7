<template>
<div>
  <v-toolbar fixed color="#FD2D01" dark>

  
    <v-toolbar-title>
      <v-tooltip bottom>
        
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-if="!$store.state.isUserLoggedIn" v-bind="attrs" v-on="on" text dark color="#FD2D01" :to="{ name: 'Home' }">
              <v-img alt="Groupomania logo" max-height="25px" max-width="150px" :src="require('../assets/icon-left-font-monochrome-white.png')"></v-img>
            </v-btn>
            <v-btn v-else-if="$store.state.isUserLoggedIn" v-bind="attrs" v-on="on" text dark color="#FD2D01" :to="{ name: 'Posts' }">
              <v-img alt="Groupomania logo" max-height="25px" max-width="150px" :src="require('../assets/icon-left-font-monochrome-white.png')"></v-img>
            </v-btn>
          </template>

          <span>Accueil</span>
        </v-tooltip>
    </v-toolbar-title>

          <v-spacer></v-spacer>

      <v-btn v-if="$store.state.user" text dark :to="{ name: 'Profil', params: { id: $store.state.user.id  }}">
        <v-avatar size="40">
          <v-img v-if="$store.state.user.photoUrl" alt="avatar" :src="`${$store.state.localUrl}/${$store.state.user.photoUrl}`"></v-img>
        </v-avatar>
      <span v-if="$store.state.user" class="fonts">{{ $store.state.user.firstName }}</span>
      </v-btn>

          <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-if="$store.state.isUserLoggedIn" text dark :to="{ name: 'Posts' }"><span class="fonts">Forum</span></v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" text dark :to="{ name: 'Signup' }"><span class="fonts">Inscription</span></v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" text dark :to="{ name: 'Login' }"><span class="fonts">Login</span></v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" text dark @click="logout" :to="{ name: 'Home' }"><span class="fonts">Sortir</span></v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn === true && $store.state.user && $store.state.user.role == true" text dark :to="{ name: 'Admin' }"><span class="fonts">Admin</span></v-btn>
    </v-toolbar-items>

    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <span class="hidden-md-and-up material-icons">more_vert</span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-if="$store.state.isUserLoggedIn" text dark :to="{ name: 'Posts' }">
          <v-list-item-title>Forum</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="!$store.state.isUserLoggedIn" text :to="{ name: 'Signup' }"><v-list-item-title>Inscription</v-list-item-title>
        </v-list-item>

          <v-list-item v-if="!$store.state.isUserLoggedIn" text :to="{ name: 'Login' }"><v-list-item-title>Login</v-list-item-title>
        </v-list-item>

          <v-list-item v-if="$store.state.isUserLoggedIn" text @click="logout" :to="{ name: 'Home' }"><v-list-item-title>Sortir</v-list-item-title>
        </v-list-item>

          <v-list-item v-if="$store.state.isUserLoggedIn === true && $store.state.user && $store.state.user.role == true" text :to="{ name: 'Admin' }"><v-list-item-title>Admin</v-list-item-title>
        </v-list-item>
          </v-list>
    </v-menu>


</v-toolbar>
  </div>
</template>

<script>
export default {
  data(){
    return {
    drawer: false,
    tab: null,
    }
  },
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
.fonts{
  font-size: 1.5vw;
}
</style>
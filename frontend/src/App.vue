<template>
  <div id="app">
    <v-app>
      <header-compo />
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import HeaderCompo from './components/Header.vue';

export default {
  name: 'App',
  components: {
    HeaderCompo
  }
};

</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 60px;
}

</style>

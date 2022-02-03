<template>
  <v-container class="grey lighten-5">
    <v-row class="d-flex justify-center mt-5 mb-3">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
          <div class="white elevation-2">
            <v-toolbar flat dense color="#FD2D01" dark>
            <v-toolbar-title><span class="font-panel">{{ title }}</span></v-toolbar-title>
              <!-- pour ne pas avoir le bouton dans tous les 'Panels' -->
            </v-toolbar>
            <div class="pa-4">
              <slot></slot>
            </div>
          </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>  
export default {
props: ['title']
}
</script>

<style>
.font-panel{
  font-size: 2.5vw;
}
</style>


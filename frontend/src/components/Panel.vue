<template>
  <v-row class="d-flex justify-center mt-5">
    <v-col sm="12" md="8" lg="6" xl="4">
      <v-flex>
        <div class="white elevation-2">
          <v-toolbar flat dense color="#FD2D01" dark>
          <v-toolbar-title><span class="font-panel">{{ title }}</span></v-toolbar-title>
            <!-- <slot name="action"></slot>  -->
            <!-- pour ne pas avoir le bouton dans tous les 'Panels' -->
          </v-toolbar>
          <div class="pa-4">
            <slot></slot>
          </div>
        </div>
      </v-flex>
    </v-col>
  </v-row>
</template>

<script>  
export default {
props: ['title']
}
</script>

<style>
.font-panel{
  font-size: 2vw;
}
</style>


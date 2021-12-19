<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="Logout">
        <form name="register-form" autocomplete="off">
          <v-text-field label="First name" v-model="firstName"></v-text-field>
          <v-text-field label="Family name" v-model="familyName"></v-text-field>
        </form>

      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from './Panel'

export default {
    components:{
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>


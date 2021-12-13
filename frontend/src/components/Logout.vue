<template>

  <div class="home">
    <img alt="Vue logo" src="../assets/icon-above-font.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>Inscription</h1>
    <input type="email" v-model="email" name="email" placeholder="Email" />
    <br /><br />
    <input type="password" v-model="password" name="password" placeholder="Password"/>
    <br /><br />
    <button type="submit" @click="register" name="register" value="Register">Register</button>
  </div>
  
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>


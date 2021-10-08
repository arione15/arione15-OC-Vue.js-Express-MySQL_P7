<template>
<div>
<h1>Registration</h1>
<input type="email" v-model="email" name="email" placeholder="Email">
<input type="password" v-model="password" name="password" placeholder="Password">
<br><br>
<button type="submit" @clicj="register" name="register" value="Register">Register</button>
</div>
</template>

<script>
export default {
  data(){
    return {
email:'',
password: ''
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

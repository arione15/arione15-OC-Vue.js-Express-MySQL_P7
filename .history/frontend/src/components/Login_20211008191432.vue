<template>
<div>
<h1>Registration</h1>
<input type="email" v-model="email" name="email" placeholder="Email">
<input type="password" v-model="password" name="password" placeholder="Password">
<br><br>
<button type="submit" name="register" value="Register">Register</button>
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
  mounted(){
      setTimeout(() => {
          this.email='hello P7'
      }, 2000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

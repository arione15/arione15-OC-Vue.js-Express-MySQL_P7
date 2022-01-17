<template>
  <form>
    <v-text-field label="commenter" v-model="message" v-on:input="sendComment"></v-text-field>
    <slot></slot>
    <!-- Bouton pour le publier -->
  </form>
</template>

<script>
export default {
  name: "CreateComment",
  data: () => {
    return {
      message: "",
    };
  },
  methods: {
    sendComment() {
      // Envois du corps du commentaire au parent pour traiter l'envoi à l'api
      this.$emit("comment-sent", this.$data);
    },
  },
};
</script>

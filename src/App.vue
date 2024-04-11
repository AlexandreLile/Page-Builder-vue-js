<template>
  <button @click="sendData">Envoyer les Données</button>
  <MyGridStructure></MyGridStructure>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello world",
    };
  },
  methods: {
    sendData() {
      this.$store.dispatch("sendComponentsListToServer");
    },
  },
};
</script>

<style scoped></style>

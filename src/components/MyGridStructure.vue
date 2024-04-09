<template>
  <div class="flex">
    <div class="grid">
      <MySideMenu class="a"></MySideMenu>
      <MyBuildContainer class="b"></MyBuildContainer>
    </div>
  </div>
</template>

<script>
import MySideMenu from "./MySideMenu.vue";
import MyBuildContainer from "./MyBuildContainer.vue";
export default {
  data() {
    return {};
  },
  components: {
    MySideMenu,
    MyBuildContainer,
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.grid {
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  gap: 25px; /* Si vous n'avez pas besoin d'espacement entre les colonnes, gardez-le à 0 */
  grid-template-areas: "A B";
  width: 100%;
  max-width: 100%;
  min-height: 80vh;
  margin: 0 5%;
}

.a {
  grid-area: A;
}

.b {
  grid-area: B;
}
</style>

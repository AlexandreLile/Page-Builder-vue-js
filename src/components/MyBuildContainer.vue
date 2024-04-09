<template>
  <div class="container">
    <draggable
      v-model="draggableComponentsList"
      @end="handleListChange"
      itemKey="id"
    >
      <template #item="{ element, index }">
        <component
          @select-component="handleSelectComponent"
          :is="element.type"
          :key="element.id"
          :id="element.id"
          v-bind="element.props"
          @delete-component="handleDeleteComponent"
        ></component>
      </template>
    </draggable>
  </div>
</template>

<script>
import MyHero from "./MyHero.vue";
import draggable from "vuedraggable";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["componentsList"]),
    draggableComponentsList: {
      get() {
        return this.$store.state.componentsList;
      },
      set(value) {
        this.$store.commit("SET_COMPONENTS_ORDER", value);
      },
    },
  },
  components: {
    MyHero,
    draggable,
  },
  methods: {
    handleListChange(event) {
      console.log(event);
      this.$store.dispatch("setComponentOrder", this.draggableComponentsList);
    },
    handleDeleteComponent(componentId) {
      // Supprimer les données associées de localStorage
      localStorage.removeItem(`${componentId}-title`);
      localStorage.removeItem(`${componentId}-subTitle`);

      // Supprimer le composant de la liste dans Vuex
      this.$store.commit("DELETE_COMPONENT", componentId);
    },
    handleSelectComponent(component) {
      // Stockez les informations du composant sélectionné dans un état ou une propriété réactive
      // et basculez l'affichage vers la section de modification
      this.$store.dispatch("selectComponent", component); // Si vous utilisez Vuex
      // ou
      this.selectedComponent = component; // Si vous gérez l'état localement
      this.showComponents = false; // Basculez vers l'affichage de la section de modification
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  max-height: 80vh;

  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
  background-color: #fcfcfc;
  overflow-y: auto;
}


</style>

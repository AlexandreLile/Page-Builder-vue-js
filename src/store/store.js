import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// Plugin pour sauvegarder l'état dans localStorage
const localStoragePlugin = (store) => {
  store.subscribe((mutation, state) => {
    localStorage.setItem(
      "componentsList",
      JSON.stringify(state.componentsList)
    );
  });
};

// Charger l'état initial depuis localStorage ou définir un état initial par défaut
const initialState = () => {
  const savedState = localStorage.getItem("componentsList");
  return savedState ? JSON.parse(savedState) : [];
};

export default createStore({
  state: {
    componentsList: initialState(), // Utiliser l'état chargé ou l'état initial par défaut ici
  },
  mutations: {
    ADD_COMPONENT(state, component) {
      if (!component.type) {
        console.error("Tentative d'ajout d'un composant sans type.", component);
        return; // Ne pas ajouter le composant s'il manque un type.
      }

      const newComponent = {
        id: uuidv4(),
        type: component.type, // Assurez-vous que le 'type' est bien fourni
        ...component.props,
      };
      state.componentsList.push(newComponent);
    },
    SET_COMPONENTS_ORDER(state, newList) {
      state.componentsList = newList;
    },
    DELETE_COMPONENT(state, componentId) {
      state.componentsList = state.componentsList.filter(
        (component) => component.id !== componentId
      );
    },
    UPDATE_COMPONENT(state, { id, newProps }) {
      const componentIndex = state.componentsList.findIndex((c) => c.id === id);
      if (componentIndex !== -1) {
        state.componentsList[componentIndex] = {
          ...state.componentsList[componentIndex],
          ...newProps,
        };
      }
    },
  },
  actions: {
    addComponent({ commit }, component) {
      commit("ADD_COMPONENT", component);
    },
    setComponentOrder({ commit }, newList) {
      commit("SET_COMPONENTS_ORDER", newList);
    },
    updateComponent({ commit }, { id, newProps }) {
      commit("UPDATE_COMPONENT", { id, newProps });
    },
    async sendComponentsListToServer({ state }) {
      try {
        const response = await axios.post("http://localhost:3000/Page", {
          name: "Test",
          components: state.componentsList,
        });
        console.log("Réponse du serveur :", response.data);
      } catch (error) {
        console.error("Erreur lors de l’envoi des données au serveur:", error);
      }
    },
  },
  plugins: [localStoragePlugin],
});

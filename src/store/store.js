import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

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
      const newComponent = {
        id: uuidv4(),
        type: component.type,
        ...component.props,
      };
      state.componentsList.push(newComponent);
    },
    SET_COMPONENTS_ORDER(state, newList) {
      state.componentsList = newList;
    },
    DELETE_COMPONENT(state, componentId) {
      // Suppression d'un composant basé sur son ID
      state.componentsList = state.componentsList.filter(
        (component) => component.id !== componentId
      );
    },
    UPDATE_COMPONENT(state, { id, newProps }) {
      const componentIndex = state.componentsList.findIndex((c) => c.id === id);
      if (componentIndex !== -1) {
        // Mise à jour des props du composant sélectionné avec les nouvelles propriétés
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
  },
  plugins: [localStoragePlugin],
});

<template>
  <div class="container_builder">
    <section
      class="text"
      :style="{
        backgroundColor: bgColor,
        height: heroHeight + 'vh',
        backgroundImage: 'url(' + imageURL + ')',
      }"
    >
      <div class="content_text">
        <h2
          :class="backgroundClass"
          :style="{ color: titleColor, fontSize: titleFontSize + 'rem' }"
          contenteditable="true"
          @blur="updateText('title', $event)"
          @keydown.enter.prevent="removeFocus"
          ref="editableTitle"
        >
          {{ title }}
        </h2>
        <h3
          :style="{ color: subTitleColor }"
          contenteditable="true"
          @blur="updateSubtitle('updateSubtitle', $event)"
          @keydown.enter.prevent="removeFocus"
          ref="editableSubtitle"
        >
          {{ subTitle }}
        </h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque quas
          iste assumenda error libero veritatis sapiente culpa id iusto autem.
          Autem eligendi quo accusantium inventore cupiditate quaerat sit, illo
          repellendus non exercitationem libero laudantium nulla officiis
          voluptatem delectus cumque, vero ab fuga magnam! Dicta ad debitis
          natus recusandae pariatur iste!
        </p>
      </div>
      <div class="btn_edit">
        <MyButton
          size="md"
          text="Modifier"
          class="update-button"
          @click="openUpdateModal"
        />
      </div>
      <div
        class="container_modale_update"
        v-if="isUpdateModalOpen"
        @click.self="closeUpdateModal"
      >
        <div class="update-modal">
          <div class="btn_action">
            <MyButton size="sm" text="Appliquer" @click="applyUpdates" />
            <MyButton size="sm" text="Fermer" @click="closeUpdateModal" />
            <MyButton
              size="sm"
              text="Supprimer"
              class="delete-button"
              @click="deleteComponent"
            />
          </div>
          <div class="container_edit_modal">
            <div class="container_edit_modal_flex">
              <p>Titre</p>
              <input id="title" type="text" v-model="title" />
            </div>

            <div class="container_edit_modal_flex">
              <p>Sous Titre</p>
              <input id="title" type="text" v-model="subTitle" />
            </div>
            <div class="container_edit_modal_flex">
              <p>Couleur du Titre</p>
              <input type="color" id="titleColor" v-model="titleColor" />
            </div>
            <div class="container_edit_modal_flex">
              <p>Couleur du sous</p>
              <input type="color" id="titleColor" v-model="subTitleColor" />
            </div>
            <div class="container_edit_modal_flex">
              <p>Couleur de fond</p>
              <input type="color" id="bgColor" v-model="bgColor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isUpdateModalOpen: false,
      title: "",
      subTitle: "",
    };
  },

  methods: {
    removeFocus(event) {
      event.preventDefault();
      event.target.blur();
    },
    // Enregistrer le contenu dans le Local Storage
    updateText(propertyName, event) {
      this[propertyName] = event.target.innerText;
      this.saveToLocalStorage(propertyName, this[propertyName]);
    },
    // Enregistre en fontion de l'id
    saveToLocalStorage(key, value) {
      localStorage.setItem(`${this.id}-${key}`, value);
    },

    loadLocalStorage() {
      const properties = ["title", "subTitle"];

      properties.forEach((property) => {
        const savedValue = localStorage.getItem(`${this.id}-${property}`);
        this[property] = savedValue || "Lorem"; // Utilisez une valeur par défaut si rien n'est trouvé
      });
    },

    deleteComponent() {
      // Utilisation de this.id pour accéder à l'ID du composant
      this.$emit("delete-component", this.id);

      // Supprimer les données associées de localStorage
    },

    openUpdateModal() {
      this.isUpdateModalOpen = true;
    },

    closeUpdateModal() {
      this.isUpdateModalOpen = false;
    },
    applyUpdates() {
      // Créez un objet avec les clés correspondant aux propriétés que vous voulez sauvegarder
      // et les valeurs étant celles actuelles à sauvegarder.
      const propertiesToSave = {
        title: this.title,
        subTitle: this.subTitle,
      };

      // Itérez sur l'objet et sauvegardez chaque propriété.
      Object.entries(propertiesToSave).forEach(([key, value]) => {
        this.saveToLocalStorage(key, value);
      });

      this.closeUpdateModal();
    },
  },

  mounted() {
    this.loadLocalStorage();
  },
};
</script>

<style scoped>
.text {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 15px;
  text-align: center;
}

.content_text {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: 15px;
}
</style>

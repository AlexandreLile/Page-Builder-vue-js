<template>
  <div class="container_builder">
    <section
      class="hero"
      :style="{
        backgroundColor: bgColor,
        height: heroHeight + 'vh',
        backgroundImage: 'url(' + imageURL + ')',
      }"
    >
      <div class="content_hero">
        <h1
          :class="backgroundClass"
          :style="{ color: titleColor, fontSize: titleFontSize + 'rem' }"
          contenteditable="true"
          @blur="updateText('title', $event)"
          @keydown.enter.prevent="removeFocus"
          ref="editableTitle"
        >
          {{ title }}
        </h1>
        <h2
          :style="{ color: subTitleColor }"
          contenteditable="true"
          @blur="updateSubtitle('updateSubtitle', $event)"
          @keydown.enter.prevent="removeFocus"
          ref="editableSubtitle"
        >
          {{ subTitle }}
        </h2>
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
            <input type="file" @change="onImageChange" accept="image/*" />
            <div class="container_edit_modal_flex">
              <p>Titre</p>
              <input id="title" type="text" v-model="title" />
            </div>
            <div class="container_edit_modal_flex">
              <p>Taille du Titre</p>
              <input
                type="range"
                id="heightControl"
                v-model="titleFontSize"
                min="1"
                max="10"
                step="1"
              />
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
            <div class="container_edit_modal_flex">
              <p>Hauteur</p>
              <input
                type="range"
                id="heightControl"
                v-model="heroHeight"
                min="10"
                max="80"
                step="1"
              />
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
      title: "",
      subTitle: "",
      isUpdateModalOpen: false,
      titleColor: "#000",
      subTitleColor: "#000",
      bgColor: "#fff",
      heroHeight: "50",
      titleFontSize: "4",
      imageURL: "",
    };
  },

  methods: {
    saveHeightToLocalStorage() {
      localStorage.setItem("elementHeight", this.elementHeight);
    },
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
      const properties = [
        "title",
        "subTitle",
        "titleColor",
        "subTitleColor",
        "bgColor",
        "heroHeight",
        "imageURL",
      ];

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
        titleColor: this.titleColor,
        bgColor: this.bgColor,
        subTitleColor: this.subTitleColor,
        heroHeight: this.heroHeight,
        imageURL: this.imageURL,
      };

      // Itérez sur l'objet et sauvegardez chaque propriété.
      Object.entries(propertiesToSave).forEach(([key, value]) => {
        this.saveToLocalStorage(key, value);
      });

      this.closeUpdateModal();
    },

    onImageChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = (e) => {
          // Supposons que vous ayez une propriété de données `imageURL`
          // pour stocker l'URL de l'image et l'afficher dans le template.
          this.imageURL = e.target.result;
        };

        reader.readAsDataURL(file);
      }
    },
  },

  mounted() {
    this.loadLocalStorage();
  },
};
</script>

<style scoped>
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.hero::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
}

.content_hero {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  height: 100%;
  z-index: 110;
}
</style>

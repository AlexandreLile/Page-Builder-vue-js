<template>
  <div class="container_builder">
    <section class="container-grid" :style="{ backgroundColor: bgColor }">
      <div class="grid">
        <article class="grid-item" :style="{ backgroundColor: bgColorCard }">
          <h3
            :style="{ color: titleColor }"
            contenteditable="true"
            @blur="updateText('title_1', $event)"
            @keydown.enter.prevent="removeFocus"
            ref="editableTitle1"
          >
            {{ title_1 }}
          </h3>
          <p
            contenteditable="true"
            @blur="updateText('paragraphe_1', $event)"
            @keydown.enter.prevent="removeFocus"
            ref="editableTitle1"
          >
            {{ paragraphe_1 }}
          </p>
        </article>
        <article class="grid-item" :style="{ backgroundColor: bgColorCard }">
          <h3
            :style="{ color: titleColor }"
            contenteditable="true"
            @blur="updateText('title_2', $event)"
            @keydown.enter.prevent="removeFocus"
            ref="editableTitle2"
          >
            {{ title_2 }}
          </h3>
          <p
            contenteditable="true"
            @blur="updateText('paragraphe_2', $event)"
            @keydown.enter.prevent="removeFocus"
            ref="editableTitle2"
          >
            {{ paragraphe_2 }}
          </p>
        </article>
        <article class="grid-item" :style="{ backgroundColor: bgColorCard }">
          <h3
            :style="{ color: titleColor }"
            contenteditable="true"
            @blur="updateText('title_3', $event)"
            @keydown.enter.prevent="removeFocus"
            ref="editableTitle3"
          >
            {{ title_3 }}
          </h3>
          <p
            contenteditable="true"
            @blur="updateParagraphe3"
            @keydown.enter.prevent="removeFocus"
            ref="editableTitle3"
          >
            {{ paragraphe_3 }}
          </p>
        </article>
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
              <p>Carte 1</p>

              <input id="title" type="text" v-model="title_1" />

              <textarea
                id="paragraphe"
                type="text"
                v-model="paragraphe_1"
              ></textarea>
            </div>
            <div class="container_edit_modal_flex">
              <p>Carte 2</p>
              <div>
                <input id="title" type="text" v-model="title_2" />
              </div>
              <div>
                <textarea
                  id="paragraphe"
                  type="text"
                  v-model="paragraphe_2"
                ></textarea>
              </div>
            </div>
            <div class="container_edit_modal_flex">
              <p>Carte 3</p>
              <div>
                <input id="title" type="text" v-model="title_3" />
              </div>
              <div>
                <textarea
                  id="paragraphe"
                  type="text"
                  v-model="paragraphe_3"
                ></textarea>
              </div>
            </div>

            <div class="container_edit_modal_flex">
              <p>Couleur des Titre</p>
              <input type="color" id="titleColor" v-model="titleColor" />
            </div>
            <div class="container_edit_modal_flex">
              <p>Couleur de fond</p>
              <input type="color" id="bgColor" v-model="bgColor" />
            </div>
            <div class="container_edit_modal_flex">
              <p>Couleur de fond des cartes</p>
              <input type="color" id="bgColor" v-model="bgColorCard" />
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
      title_1: "",
      paragraphe_1: "",
      title_2: "",
      paragraphe_2: "",
      title_3: "",
      paragraphe_3: "",
      isUpdateModalOpen: false,
      titleColor: "#000",
      bgColor: "#fff",
      bgColorCard: "#fff",
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

    //Charger Le contenu avec une boucle
    loadLocalStorage() {
      const properties = [
        "title_1",
        "title_2",
        "title_3",
        "paragraphe_1",
        "paragraphe_2",
        "paragraphe_3",
        "titleColor",
        "bgColor",
        "bgColorCard",
      ];

      properties.forEach((property) => {
        const savedValue = localStorage.getItem(`${this.id}-${property}`);
        this[property] = savedValue || "Lorem"; // Utilisez une valeur par défaut si rien n'est trouvé
      });
    },

    deleteComponent() {
      this.$emit("delete-component", this.id);
    },

    openUpdateModal() {
      this.isUpdateModalOpen = true;
    },
    closeUpdateModal() {
      this.isUpdateModalOpen = false;
    },
    applyUpdates() {
      const propertiesToSave = {
        title: this.title,
        subTitle: this.subTitle,
        titleColor: this.titleColor,
        bgColor: this.bgColor,
        bgColorCard: this.bgColorCard,
      };

      // Itérez sur l'objet et sauvegardez chaque propriété.
      Object.entries(propertiesToSave).forEach(([key, value]) => {
        this.saveToLocalStorage(key, value);
      });

      this.closeUpdateModal();
    },
  },
  // Charge le contenu
  mounted() {
    this.loadLocalStorage();
  },
};
</script>

<style scoped>
.container-grid:hover .btn_edit {
  display: block;
}

.container-grid {
  position: relative;
  margin: 15px;
  height: 100%;
  padding: 15px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 35px;
  height: 100%;
  grid-auto-rows: minmax(100px, auto);
}

.grid-item {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #fff;
  text-align: center;
  padding: 30px 20px;
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;
  gap: 15px;
  position: relative;
  transition: all 0.5s ease;
}

.grid-item::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 54%;
  left: 53%;
  border-radius: 5px;
  background-color: var(--primary-color);
  transform: translate(-50%, -50%);
  z-index: -2;
  transition: all 0.3s ease;
}

.grid-item:hover::after {
  top: 50%;
  left: 50%;
}

.grid-item:hover {
  box-shadow: 0 0 3px var(--primary-color), 0 0 3px var(--primary-color) inset;
}
</style>

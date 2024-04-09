<template>
  <aside class="aisde">
    <div class="container">
      <input type="search" v-model="searchButton" placeholder="recherche" />
      <div class="grid">
        <MyButton
          v-for="(button, index) in sortedButtons"
          :key="index"
          :text="button.text"
          :size="button.size"
          @click="button.onClick"
        ></MyButton>
      </div>
    </div>
  </aside>
</template>

<script>
import MyButton from "./MyButton.vue";
import MyHero from "./MyHero.vue";
import MyItems from "./MyItems.vue";
import Mytext from "./Mytext.vue";
export default {
  data() {
    return {
      showComponents: true,
      searchButton: "",
      buttons: [
        {
          text: "Menu",
          size: "builder",
          onClick: () => this.addComponent({ type: "MyHero", props: {} }),
        },
        {
          text: "Hero",
          size: "builder",
          onClick: () => this.addComponent({ type: "MyHero", props: {} }),
        },
        {
          text: "Carte",
          size: "builder",
          onClick: () => this.addComponent({ type: "MyItems", props: {} }),
        },
        {
          text: "Texte",
          size: "builder",
          onClick: () => this.addComponent({ type: "Mytext", props: {} }),
        },
        {
          text: "Image pleine largeur",
          size: "builder",
          onClick: () => this.addComponent({ type: "MyHero", props: {} }),
        },
        {
          text: "Image et texte",
          size: "builder",
          onClick: () => this.addComponent({ type: "MyHero", props: {} }),
        },
      ],
    };
  },
  methods: {
    addComponent(component) {
      this.$store.dispatch("addComponent", component);
    },
    displayComponents() {
      this.showComponents = true; // Utilisez la nouvelle variable `showComponents`
    },
    displayUpdate() {
      this.showComponents = false; // Utilisez la nouvelle variable `showComponents`
    },
  },

  computed: {
    sortedButtons() {
      if (!this.searchButton) {
        return this.buttons;
      }
      return [...this.buttons].sort((a, b) => {
        const aMatch = a.text
          .toLowerCase()
          .includes(this.searchButton.toLowerCase());
        const bMatch = b.text
          .toLowerCase()
          .includes(this.searchButton.toLowerCase());
        return aMatch === bMatch ? 0 : aMatch ? -1 : 1;
      });
    },
  },
  components: {
    MyHero,
    MyItems,
    Mytext,
  },
};
</script>

<style scoped>
.container {
  max-height: 80vh;
  overflow-y: auto;
  padding: 25px 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
  background-color: #fcfcfc;
  height: 100%;
  display: flex;
  gap: 15px;
  flex-direction: column;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: minmax(auto, 80px);
  gap: 5px;

  min-width: 100px;
}

.container > * {
  max-height: 80px;
}

input {
  border: solid 2px #2b303a;
  border-radius: 0.5rem;
  height: 35px;
  padding: 5px;
}
</style>

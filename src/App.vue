<template>
  <div id="app">
    <Search
      @searchPokemon="updateQueryValue"
      @browsePokemon="browsePokemon"
      @randomPokemon="randomPokemon"
    />
    <Detail v-if="this.view == 'detail'" :pokemon="this.pokemon" />
    <Browse v-if="this.view == 'browse'" @getDetails="getDetails($event)" />
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import Detail from "./components/Detail.vue";
import Browse from "./components/Browse";
import Pokemon from "./assets/js/pokemon";

export default {
  name: "App",
  components: {
    Search,
    Detail,
    Browse,
  },
  data() {
    return {
      api: `https://pokeapi.co/api/v2`,
      query: null,
      pokemon: null,
      view: "home",
      max: 898,
    };
  },
  watch: {
    query(query) {
      this.lookupPokemon(query);
    },
  },
  methods: {
    updateQueryValue: function (query) {
      this.query = query;
    },
    randomPokemon: function () {
      this.query = Math.floor(Math.random() * this.max) + 1;
    },
    browsePokemon: function () {
      this.view = "browse";
    },
    getDetails: function (pokemon) {
      this.pokemon = pokemon;
      this.view = "detail";
    },
    async lookupPokemon(query) {
      let url = `${this.api}/pokemon/`;
      if (Number.isFinite(query)) {
        url = `${this.api}/pokemon/${query}`;
      } else {
        url = `${this.api}/pokemon/${query.toLowerCase()}`;
      }

      fetch(url)
        .then((response) => response.json())
        .catch((e) => {
          console.warn(e);
        })
        .then((result) => {
          this.pokemon = new Pokemon(result);
          this.view = "detail";
        });
    },
  },
};
</script>

<style lang="scss">
@import "./assets/css/reset.css";
body {
  padding: 60px;
}
#app {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>

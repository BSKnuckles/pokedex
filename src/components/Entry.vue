<template>
  <div>
    <div v-if="this.pokemon">
      <h2>{{ this.pokemon.name }}</h2>
      <p>ID: {{ this.pokemon.id }}</p>
      <img :src="this.pokemon.sprites.artwork" :alt="this.pokemon.name" />
      <button @click="getDetails()">Details</button>
    </div>
    <div v-else>Loading Data...</div>
  </div>
</template>

<script>
import Pokemon from "../assets/js/pokemon";

export default {
  name: "Entry",
  props: {
    entry: Object,
  },
  data() {
    return {
      pokemon: null,
    };
  },
  beforeMount() {
    this.lookupPokemon(this.entry.name);
  },
  methods: {
    async lookupPokemon(name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .catch((e) => {
          console.warn(e);
        })
        .then((result) => {
          this.pokemon = new Pokemon(result);
        });
    },
    getDetails() {
      this.$emit("getDetails", this.pokemon);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
img {
  width: 92px;
  height: 92px;
}
</style>

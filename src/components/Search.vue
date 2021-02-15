<template>
  <form @submit="searchPokemon($event)">
    <div>
      <label for="search">Search</label>
      <input type="text" name="Search" id="search" />
    </div>
    <button type="submit">Search Pokémon!</button>
    <button @click="random($event)" type="button">Random</button>
    <button @click="browse($event)" type="button">Browse All</button>
  </form>
</template>

<script>
export default {
  name: "Search",
  methods: {
    searchPokemon(e) {
      if (e.target[0].value) {
        e.preventDefault();
        this.$emit("searchPokemon", e.target[0].value);
        e.target.reset();
      } else {
        console.warn("Search field cannot be empty");
      }
    },
    random(e) {
      this.$emit("randomPokemon");
      e.target.parentNode.reset();
    },
    browse(e) {
      this.$emit("browsePokemon");
      e.target.parentNode.reset();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>

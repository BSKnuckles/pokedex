<template>
  <main>
    <header>
      <h1>{{ pokemon.id }} - {{ pokemon.name }}</h1>
      <p v-for="(type, index) in pokemon.types" :key="index">
        {{ type.type.name }}
      </p>
    </header>
    <img :src="pokemon.sprites.artwork" :alt="pokemon.name" />
    {{ pokemon }}
    <div v-if="this.evolutionChain">
      <h3>Evolution Chain</h3>
      <p>Base Form: {{ this.evolutionChain.chain.species.name }}</p>
      <div v-if="this.evolutionChain.chain.evolves_to">
        <p
          v-for="(pokemon, index) in this.evolutionChain.chain.evolves_to"
          :key="index"
        >
          {{ pokemon.species.name }}
        </p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Detail",
  props: {
    pokemon: Object,
  },
  data() {
    return {
      species: null,
      evolutionChain: null,
    };
  },
  beforeMount() {
    this.loadData();
  },
  watch: {
    pokemon() {
      this.loadData();
    },
  },
  methods: {
    async loadData() {
      // reset data
      this.species = null;
      this.evolutionChain = null;
      // lookup species
      let url = this.pokemon.species.url;
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          this.species = result;

          // lookup evolution chain
          url = result.evolution_chain.url;
          fetch(url)
            .then((response) => response.json())
            .then((result) => {
              this.evolutionChain = result;
            });
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>

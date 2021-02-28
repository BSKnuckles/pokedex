<template>
  <form @submit="searchPokemon($event)">
    <div class="input-group">
      <label for="search">Search</label>
      <input
        type="text"
        name="Search"
        id="search"
        placeholder="Enter a Pokémon name of Pokédex ID"
      />
    </div>
    <div>
      <button class="btn" type="submit">Search Pokémon!</button>
      <button class="btn" @click="random($event)" type="button">Random</button>
      <button class="btn" @click="browse($event)" type="button">
        Browse All
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Search",
  props: {
    view: String,
  },
  methods: {
    searchPokemon(e) {
      e.preventDefault();
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
<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  & > div {
    flex-wrap: wrap;
    justify-content: center;
  }

  button {
    margin-left: 6px;
    margin-right: 6px;
  }

  label {
    font-size: 0;
  }
  input {
    border: 1px solid #ba2225;
    border-radius: 10px;
    padding: 8px 12px;
    color: #ba2225;
    flex-grow: 1;

    &:focus {
      outline: none;
    }
  }
  ::placeholder {
    color: #f0494a80;
  }
  @media screen and (min-width: 600px) {
    .input-group {
      min-width: 400px;
    }
  }
}
</style>

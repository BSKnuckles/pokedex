<template>
  <div
    :class="this.bgClass"
    class="pokemonEntry"
    v-if="this.pokemon"
    @click="getDetails()"
  >
    <img :src="this.pokemon.sprites.artwork" :alt="this.pokemon.name" />
    <div>
      <h2>#{{ this.pokemon.id }} {{ this.pokemon.name }}</h2>
      <div>
        <TypeBadge
          v-for="(type, index) in pokemon.types"
          :key="index"
          :type="type.type.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pokemon from "../../assets/js/pokemon";
import TypeBadge from "@/components/blocks/TypeBadge";

export default {
  name: "BrowseEntry",
  components: {
    TypeBadge,
  },
  props: {
    entry: Object,
  },
  data() {
    return {
      pokemon: null,
      bgClass: null,
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
          this.setBackground();
        });
    },
    getDetails() {
      this.$emit("getDetails", this.pokemon);
    },
    setBackground: function () {
      switch (this.pokemon.types[0].type.name) {
        case "grass": {
          this.bgClass = "bg-grass";
          break;
        }
        case "fire": {
          this.bgClass = "bg-fire";
          break;
        }
        case "water": {
          this.bgClass = "bg-water";
          break;
        }
        case "electric": {
          this.bgClass = "bg-electric";
          break;
        }
        case "normal": {
          this.bgClass = "bg-normal";
          break;
        }
        case "ice": {
          this.bgClass = "bg-ice";
          break;
        }
        case "fighting": {
          this.bgClass = "bg-fighting";
          break;
        }
        case "poison": {
          this.bgClass = "bg-poison";
          break;
        }
        case "ground": {
          this.bgClass = "bg-ground";
          break;
        }
        case "flying": {
          this.bgClass = "bg-flying";
          break;
        }
        case "psychic": {
          this.bgClass = "bg-psychic";
          break;
        }
        case "bug": {
          this.bgClass = "bg-bug";
          break;
        }
        case "rock": {
          this.bgClass = "bg-rock";
          break;
        }
        case "ghost": {
          this.bgClass = "bg-ghost";
          break;
        }
        case "dark": {
          this.bgClass = "bg-dark";
          break;
        }
        case "dragon": {
          this.bgClass = "bg-dragon";
          break;
        }
        case "steel": {
          this.bgClass = "bg-steel";
          break;
        }
        case "fairy": {
          this.bgClass = "bg-fairy";
          break;
        }
        default: {
          this.bgClass = "bg-normal";
          break;
        }
      }
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
.pokemonEntry {
  cursor: pointer;
  display: flex;
  background-color: #7ac74c;
  padding: 8px;
  border-radius: 10px;
  color: white;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 10px;

    h2 {
      color: white;
    }

    & > div {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      gap: 6px;
    }
  }
}
</style>

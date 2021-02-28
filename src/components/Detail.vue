<template>
  <div class="detail">
    <header class="row">
      <h2>#{{ pokemon.id }} - {{ pokemon.name }}</h2>
      <div>
        <TypeBadge
          v-for="type in pokemon.types"
          :key="type.type.name"
          :type="type.type.name"
        />
      </div>
    </header>
    <div class="row" id="overview">
      <h3>About</h3>
      <div>
        <img
          :src="pokemon.sprites.artwork"
          :alt="pokemon.name"
          class="infoCard"
        />
        <p class="infoCard wideCard">{{ this.flavorText }}</p>
      </div>
    </div>
    <div class="row">
      <h3>Info</h3>
      <div class="infoCard">
        <table>
          <tbody>
            <tr>
              <th>Height:</th>
              <td>{{ pokemon.height }}</td>
            </tr>
            <tr>
              <th>Weight:</th>
              <td>{{ pokemon.weight }}</td>
            </tr>
            <tr>
              <th>Gender:</th>
              <td>{{ pokemon.gender }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <h3>Base Stats</h3>
      <div class="infoCard">
        <table>
          <tbody>
            <tr>
              <th>HP:</th>
              <td>{{ this.stats[0].base }}</td>
            </tr>
            <tr>
              <th>Attack:</th>
              <td>{{ this.stats[1].base }}</td>
            </tr>
            <tr>
              <th>Defense:</th>
              <td>{{ this.stats[2].base }}</td>
            </tr>
            <tr>
              <th>Special Attack:</th>
              <td>{{ this.stats[3].base }}</td>
            </tr>
            <tr>
              <th>Special Defense:</th>
              <td>{{ this.stats[4].base }}</td>
            </tr>
            <tr>
              <th>Speed:</th>
              <td>{{ this.stats[5].base }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <h3>Moves</h3>
      <div class="infoCard">
        <table>
          <tbody>
            <tr>
              <th>Move</th>
              <th>Level</th>
              <th>Method</th>
              <th>Version</th>
            </tr>
            <tr v-for="(move, index) in this.moves" :key="index">
              <td>{{ move.move.name }}</td>
              <td>{{ move.version_group_details[0].level_learned_at }}</td>
              <td>
                {{ move.version_group_details[0].move_learn_method.name }}
              </td>
              <td>{{ move.version_group_details[0].version_group.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row" v-if="this.evolutionChain">
      <h3>Evolution</h3>
      <p>Base Form: {{ this.evolutionChain.chain.species.name }}</p>
      <div v-if="this.evolutionChain.chain.evolves_to.length > 0">
        <p
          v-for="(pokemon, index) in this.evolutionChain.chain.evolves_to"
          :key="index"
        >
          {{ pokemon.evolution_details[0].trigger.name }} -
          {{ pokemon.species.name }}
        </p>
      </div>
    </div>
    <div class="row" id="sprites">
      <h3>Sprites</h3>
      <div>
        <h4>Default (Front)</h4>
        <Sprite :sprite="pokemon.sprites.front_default" />
      </div>
      <div>
        <h4>Default (Back)</h4>
        <Sprite :sprite="pokemon.sprites.back_default" />
      </div>
      <div>
        <h4>Default (Shiny, Front)</h4>
        <Sprite :sprite="pokemon.sprites.front_shiny" />
      </div>
      <div>
        <h4>Default (Shiny, Back)</h4>
        <Sprite :sprite="pokemon.sprites.back_shiny" />
      </div>
      <div>
        <h4>Female (Front)</h4>
        <Sprite :sprite="pokemon.sprites.front_female" />
      </div>
      <div>
        <h4>Female (Back)</h4>
        <Sprite :sprite="pokemon.sprites.back_female" />
      </div>
      <div>
        <h4>Female (Shiny, Front)</h4>
        <Sprite :sprite="pokemon.sprites.front_shiny_female" />
      </div>
      <div>
        <h4>Female (Shiny, Back)</h4>
        <Sprite :sprite="pokemon.sprites.back_shiny_female" />
      </div>
    </div>
  </div>
</template>

<script>
import TypeBadge from "@/components/blocks/TypeBadge";
import Sprite from "@/components/blocks/Sprite";

export default {
  name: "Detail",
  components: {
    TypeBadge,
    Sprite,
  },
  props: {
    pokemon: Object,
  },
  data() {
    return {
      species: null,
      evolutionChain: null,
      flavorText: null,
    };
  },
  computed: {
    moves: function () {
      let moves = [];
      this.pokemon.moves.forEach((move) => {
        moves.push(move);
      });
      return moves;
    },
    stats: function () {
      let stats = [];
      this.pokemon.stats.forEach((reference) => {
        let stat = {};
        switch (reference.name) {
          case "hp": {
            stat.name = reference.name;
            stat.base = reference.base;
            stat.effort = reference.effort;
            break;
          }
          case "attack": {
            stat.name = reference.name;
            stat.base = reference.base;
            stat.effort = reference.effort;
            break;
          }
          case "defense": {
            stat.name = reference.name;
            stat.base = reference.base;
            stat.effort = reference.effort;
            break;
          }
          case "special-attack": {
            stat.name = reference.name;
            stat.base = reference.base;
            stat.effort = reference.effort;
            break;
          }
          case "special-defense": {
            stat.name = reference.name;
            stat.base = reference.base;
            stat.effort = reference.effort;
            break;
          }
          case "speed": {
            stat.name = reference.name;
            stat.base = reference.base;
            stat.effort = reference.effort;
            break;
          }
          default: {
            break;
          }
        }
        stats.push(stat);
      });
      return stats;
    },
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
      this.flavorText = null;
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
            })
            .then(this.pickFlavorText());
        });
    },
    pickFlavorText() {
      let possibilities = this.species.flavor_text_entries.filter(
        (entry) => entry.language.name == "en"
      );
      let max = possibilities.length - 1;
      this.flavorText =
        possibilities[Math.floor(Math.random() * max) + 1].flavor_text;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.row {
  max-width: 900px;
  margin: 10px 0;

  h3 {
    margin-bottom: 20px;
    width: 100%;
  }
}
#overview > div {
  display: flex;
  justify-content: flex-start;
  column-gap: 20px;
}

.infoCard {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
}
.wideCard {
  flex-grow: 1;
}
.detail {
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    display: flex;
    justify-content: space-between;

    & > div {
      display: flex;
    }
  }

  & > * {
    width: 100%;
  }
}
#sprites {
  display: grid;
  grid-template-rows: 1fr 3fr 3fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;

  h3 {
    grid-column: 1 / span 4;
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
table {
  width: 100%;
}
th {
  text-align: left;
  color: #767676;
  padding: 10px 0;
}
td {
  padding: 4px 0;
}
</style>

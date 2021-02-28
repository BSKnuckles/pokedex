<template>
  <div>
    <h1>Browse</h1>
    <form id="controls">
      <fieldset>
        <legend>Filter</legend>
        <div>
          <label for="limit">Results per Page</label>
          <select @change="updateLimit($event)" name="limit" id="limit">
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
        </div>
      </fieldset>
    </form>
    <div v-if="this.entries.results" id="pokemon-list">
      <ul>
        <li v-for="pokemon in this.entries.results" :key="pokemon.name">
          <BrowseEntry :entry="pokemon" v-on="$listeners" />
        </li>
      </ul>
      <div>
        <form @submit="formSubmit($event)">
          <button
            class="btn"
            @click="paginateEntries($event)"
            v-if="this.entries.previous"
          >
            Previous
          </button>
          <button
            class="btn"
            @click="paginateEntries($event)"
            v-if="this.entries.next"
          >
            Next
          </button>
        </form>
      </div>
    </div>
    <div v-else>No results found</div>
  </div>
</template>

<script>
import BrowseEntry from "@/components/blocks/BrowseEntry";

export default {
  name: "Browse",
  components: {
    BrowseEntry,
  },
  data() {
    return {
      offset: 0,
      limit: 20,
      entries: {},
    };
  },
  computed: {
    api: function () {
      return `https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`;
    },
  },
  beforeMount() {
    this.lookupPokemon();
  },
  watch: {
    limit: function () {
      this.lookupPokemon();
    },
    offset: function () {
      this.lookupPokemon();
    },
  },
  methods: {
    updateLimit(e) {
      this.limit = parseInt(e.target.value, 10);
    },
    paginateEntries(e) {
      let url = "";
      // Figure out which pagination button was pressed
      switch (e.target.outerText.toLowerCase()) {
        case "next": {
          url = this.entries.next;
          break;
        }
        case "previous": {
          url = this.entries.previous;
          break;
        }
        default: {
          url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
        }
      }
      // Get the query strings separated from the rest of the URL
      let queryStrings = url.split("?")[1].split("&");

      // Set offset and limit based on API results for next and previous sets
      this.offset = queryStrings[0].split("=")[1];
      this.limit = queryStrings[1].split("=")[1];
    },
    async lookupPokemon() {
      fetch(this.api)
        .then((response) => response.json())
        .catch((e) => {
          console.warn(e);
        })
        .then((results) => {
          this.entries = results;
        });
    },
    formSubmit(e) {
      e.preventDefault();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  font-size: 0;
}
#pokemon-list {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;

    li {
      width: 330px;
    }
  }
}
#controls {
  legend {
    font-size: 0;
  }
  label {
    color: #ba2225;
    margin-right: 10px;
  }
  select {
    border: 1px solid #ba2225;
    border-radius: 10px;
    color: #ba2225;
    padding: 4px 8px;
  }
}
form {
  margin: 20px 0;
  width: 100%;
}
#controls fieldset,
#pokemon-list form {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  column-gap: 10px;
}
</style>

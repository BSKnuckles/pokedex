<template>
  <div id="app" :class="this.view">
    <header>
      <div class="container">
        <a class="logo" href="/">Pokedex</a>
        <Search
          @searchPokemon="updateQueryValue"
          @browsePokemon="browsePokemon"
          @randomPokemon="randomPokemon"
          :view="this.view"
        />
      </div>
    </header>
    <main v-if="this.view != 'home'">
      <Detail v-if="this.view == 'detail'" :pokemon="this.pokemon" />
      <Browse v-if="this.view == 'browse'" @getDetails="getDetails($event)" />
    </main>
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
  created() {
    document.title = "Mike's Pokédex";
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
@import "./assets/css/variables.css";
@import url("https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,600;0,700;1,400&family=Roboto:wght@700;900&display=swap");

body {
  background-color: #fef2f2;
  height: 100vh;
  width: 100vw;
}
h1,
h2,
h3 {
  font-family: "Roboto", sans-serif;
  color: #ba2225;
}
body,
h4,
h5 {
  font-family: "Cabin", sans-serif;
}
h1 {
  font-size: 32px;
  font-weight: 700;
}
h2 {
  font-size: 24px;
  font-weight: 700;
}
h3 {
  font-size: 20px;
  font-weight: 900;
  text-transform: uppercase;
}
h4 {
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
}
h5,
label,
th,
.btn {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
}
p {
  font-size: 18px;
  font-weight: 400;
}
#app.home {
  header {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;

      form {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        div {
          display: flex;
          flex-grow: 1;
          margin-bottom: 20px;
          input {
            flex-grow: 1;
          }
        }
      }
    }
  }
  .logo {
    width: 220px;
    height: 42px;
  }
}
#app.detail,
#app.browse {
  display: grid;
  grid-template-rows: 80px 1fr;
  grid-template-columns: 1fr;
  & > header {
    background-color: white;
    box-shadow: 0px 3px 6px #00000029;
  }
}
#app,
#app.detail,
#app.browse {
  height: 100vh;
  width: 100vw;

  @media screen and (max-width: 799px) {
    & > header {
    }
  }
  // @media screen and (max-width: 799px) {
  //   display: flex;

  //   header > div {
  //     display: flex;
  //     flex-direction: column;
  //     align-items: center;

  //     form {
  //       display: flex;
  //       flex-wrap: wrap;
  //       align-items: center;

  //       & > div,
  //       input {
  //         width: 100%;
  //       }
  //     }
  //   }
  // }

  // @media screen and (min-width: 800px) {

  //   header > div {
  //     justify-content: space-between;
  //   }
  // }
}
.container {
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.logo {
  font-size: 0;
  width: 165px;
  height: 31.5px;
  background: url(/images/logo/logo.png) no-repeat center center;
  background-size: contain;
}
.btn {
  color: white;
  background-color: #ba2225;
  border-radius: 10px;
  border: none;
  padding: 8px 12px;

  &:focus {
    outline: none;
  }
}
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px;
}
</style>

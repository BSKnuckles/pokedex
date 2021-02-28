<template>
  <p class="type" :class="this.class">
    <img :src="this.icon" />{{ this.name }}
  </p>
</template>

<script>
export default {
  name: "TypeBadge",
  props: {
    type: String,
  },
  data() {
    return {
      name: null,
      class: null,
      icon: null,
    };
  },
  beforeMount() {
    this.setData();
  },
  methods: {
    setData: function () {
      switch (this.type) {
        case "grass": {
          this.name = "Grass";
          this.class = "badge-grass";
          this.icon = "/images/icons/grass.svg";
          break;
        }
        case "fire": {
          this.name = "Fire";
          this.class = "badge-fire";
          this.icon = "/images/icons/fire.svg";
          break;
        }
        case "water": {
          this.name = "Water";
          this.class = "badge-water";
          this.icon = "/images/icons/water.svg";
          break;
        }
        case "electric": {
          this.name = "Electric";
          this.class = "badge-electric";
          this.icon = "/images/icons/electric.svg";
          break;
        }
        case "normal": {
          this.name = "Normal";
          this.class = "badge-normal";
          this.icon = "/images/icons/normal.svg";
          break;
        }
        case "ice": {
          this.name = "Ice";
          this.class = "badge-ice";
          this.icon = "/images/icons/ice.svg";
          break;
        }
        case "fighting": {
          this.name = "Fighting";
          this.class = "badge-fighting";
          this.icon = "/images/icons/fighting.svg";
          break;
        }
        case "poison": {
          this.name = "Poison";
          this.class = "badge-poison";
          this.icon = "/images/icons/poison.svg";
          break;
        }
        case "ground": {
          this.name = "Ground";
          this.class = "badge-ground";
          this.icon = "/images/icons/ground.svg";
          break;
        }
        case "flying": {
          this.name = "Flying";
          this.class = "badge-flying";
          this.icon = "/images/icons/flying.svg";
          break;
        }
        case "psychic": {
          this.name = "Psychic";
          this.class = "badge-psychic";
          this.icon = "/images/icons/psychic.svg";
          break;
        }
        case "bug": {
          this.name = "Bug";
          this.class = "badge-bug";
          this.icon = "/images/icons/bug.svg";
          break;
        }
        case "rock": {
          this.name = "Rock";
          this.class = "badge-rock";
          this.icon = "/images/icons/rock.svg";
          break;
        }
        case "ghost": {
          this.name = "Ghost";
          this.class = "badge-ghost";
          this.icon = "/images/icons/ghost.svg";
          break;
        }
        case "dark": {
          this.name = "Dark";
          this.class = "badge-dark";
          this.icon = "/images/icons/dark.svg";
          break;
        }
        case "dragon": {
          this.name = "Dragon";
          this.class = "badge-dragon";
          this.icon = "/images/icons/dragon.svg";
          break;
        }
        case "steel": {
          this.name = "Steel";
          this.class = "badge-steel";
          this.icon = "/images/icons/steel.svg";
          break;
        }
        case "fairy": {
          this.name = "Fairy";
          this.class = "badge-fairy";
          this.icon = "/images/icons/fairy.svg";
          break;
        }
        default: {
          break;
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
.type {
  padding: 8px 12px;
  border-radius: 20px;
  margin-left: 10px;
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;

  img {
    height: 18px;
    width: auto;
  }
}
</style>
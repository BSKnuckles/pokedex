<template>
  <div>
    <img v-if="this.hasUrl" :src="sprite" :alt="sprite" />
    <p v-if="!this.hasUrl">Not available</p>
  </div>
</template>

<script>
export default {
  name: "Sprite",
  props: {
    sprite: String,
  },
  computed: {
    hasUrl: function () {
      if (this.sprite == null) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
<style scoped lang="scss">
</style>
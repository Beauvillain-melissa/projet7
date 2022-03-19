<template>
  <div>
    <NavBar />
    <b-container>
      <router-view />
      <!-- pour afficher la vue de la route  -->
    </b-container>
  </div>
</template>
<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar
  }
}
</script>
<style lang="scss">
</style>

<template>
  <div>
    <b-navbar toggleable="lg" type="light" style="background-color: #fcd7d7">
      <b-navbar-brand href="#"><img src="../../public/image/icon-left-font-monochrome-black.png" alt="Kitten" class="img-nav"></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="me-auto mb-2 mb-lg-0">
            <b-nav-item>
              <router-link class="nav-link" to="/">Accueil</router-link>
            </b-nav-item>
              
            <b-nav-item>
              <router-link class="nav-link" to="/posts">Posts</router-link>
            </b-nav-item>
            <b-nav-item v-if="isLoggedIn">
              <a @click="logout" class="nav-link">Deconnexion</a>
            </b-nav-item>
            <b-nav-item v-if="!isLoggedIn">
              <router-link class="nav-link" to="/inscription"
                >Inscription</router-link
              >
            </b-nav-item>
            <b-nav-item v-if="!isLoggedIn">
              <router-link class="nav-link" to="/connexion">Connexion</router-link>
            </b-nav-item>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/connexion");
    },
  },
};
</script>
<style>
.img-nav {
  height: 50px;
}
</style>

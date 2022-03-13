<template>
  <div class="Connection">
    <h1>Connexion</h1>
    <div>
        <b-form @submit.prevent="submit">
          <b-form-group
            id="input-group-1"
            label="Adresse email:"
            label-for="input-1"
            description="Nous ne partagerons jamais votre e-mail."
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Entrer email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Mot de passe:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              v-model="form.password"
              type="password"
              placeholder="Enter votre mot de passe"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Connection</b-button>
        </b-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Connection",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      // const User = new FormData();
      // User.append("email", this.form.email);
      // User.append("password", this.form.mdp);
      try {
          await this.LogIn(this.form);
          this.$router.push("/posts");
          this.showError = false
      } catch (error) {
        this.showError = true
      }
    }
  },
};
</script>

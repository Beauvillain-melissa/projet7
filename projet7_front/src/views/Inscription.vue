<template>
  <div class="inscription">
    <h1>Bienvenue</h1>
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
          id="input-group-2"
          label="Nom de famille:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.name"
            placeholder="Entrer nom de famille"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Prenom:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.prenom"
            placeholder="Entrer votre prénom"
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
            v-model="form.mdp"
            type="password"
            placeholder="Entrer votre mot de passe"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Confirmation mot de passe:"
          label-for="input-5"
        >
          <b-form-input
            id="input-5"
            v-model="form.confirmationmdp"
            type="password"
            placeholder="Confirmer mot de passe"
            required
          ></b-form-input>
        </b-form-group>

       

        <b-button type="submit" variant="primary">Inscription</b-button>
      </b-form>
    </div>
    <p v-if="showError" id="error">L'utilisateur existe déjà.</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Inscription",
  components: {},
  data() {
    return {
      form: {
        name: "",
        prenom: "",
        email: "",
        mdp: "",
        confirmationmdp: "",
        date: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["Register"]),
    async submit() {
      try {
        await this.Register(this.form);
        this.$router.push("/");
        this.showError = false
      } catch (error) {
        this.showError = true
      }
    }
  },
};
</script>

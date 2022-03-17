<template>
  <div class="container">
    <h2 class="h2-sujet">Sujet : {{ Post[0].title }}</h2>
    <b-card
      class="cardP"
      v-bind:title="Post[0].author_prenom + ' ' + Post[0].author_name"
      v-bind:sub-title="Post[0].created_at | formatDate"
    >
      <b-card-text>
        <hr class="my-4" />
        {{ Post[0].message }}
      </b-card-text>
      <a v-if="Post[0].image" target="_blank" :href="Post[0].image">
        <img :src="Post[0].image" class="img-post" />
      </a>
    </b-card>
    <b-card
      v-for="response in Responses"
      :key="response.id"
      class="cardP"
      v-bind:title="response.author_prenom + ' ' + response.author_name"
      v-bind:sub-title="response.created_at | formatDate"
    >
      <b-card-text>
        <hr class="my-4" />
        {{ response.message }}
      </b-card-text>
    </b-card>
    <form class="form-reponse" @submit.prevent="submitResponse()">
      <b-form-group
        id="input-group-2"
        label="Réponse :"
        label-for="message"
        label-cols="2"
      >
        <b-form-textarea
          id="message"
          v-model="newMessage"
          placeholder="..."
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
      </b-form-group>
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <div>
          <b-button class="poster" type="submit" variant="primary"
            >Poster</b-button
          >
          <router-link :to="`/posts`">
            <b-button class="poster" variant="outline-danger">
              Liste des sujets
            </b-button>
            </router-link
          >
          </div>
        </b-col>
      </b-row>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Post",
  components: {},
  data() {
    return {
      postId: this.$route.params.id,
      newMessage: "",
    };
  },
  created: function () {
    // a function to call getposts action
    this.GetPost(this.$route.params.id);
  },
  computed: {
    ...mapGetters({
      Post: "StateCurrentPost",
      User: "StateUser",
      Responses: "StateResponses",
    }),
  },
  methods: {
    ...mapActions(["GetPost", "GetResponses", "CreateResponse"]),
    async submitResponse() {
      try {
        let data = {
          postId: this.postId,
          message: this.newMessage,
        };
        await this.CreateResponse(data);
      } catch (error) {
        throw "Sorry you can't make a post now!";
      }
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.textarea-reponse {
  width: 100%;
  resize: vertical;
  padding: 15px;
  border-radius: 15px;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  margin: 15px;
}
ul {
  list-style: none;
}
#post-div {
  border: 3px solid #000;
  width: 500px;
  margin: auto;
  margin-bottom: 5px;
}
.img-post {
  height: 100px;
}
.responses {
  border: 3px solid rgb(252, 215, 215);
}
.posts {
  margin-top: 20px;
  margin-bottom: 50px;
}
.form-post {
  margin-bottom: 20px;
}
.hello-user {
  margin-top: 10px;
}
.h2-sujet {
  margin-top: 10px;
}
.cardP {
  margin-top: 30px;
}
.cardP:nth-child(2n) {
  background-color: #eef1f6;
}
.form-reponse {
  margin-top: 30px;
}
.poster {
  margin-bottom: 30px;
  margin-right: 20px;
}
</style>
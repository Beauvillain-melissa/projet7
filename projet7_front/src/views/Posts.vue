<template>
  <div class="container">
    <div v-if="User">
      <p>Bonjour {{ User.prenom }} !</p>
    </div>
    <div>
      <form @submit.prevent="submit">
        <div>
          <label for="title">Titre:</label>
          <input type="text" name="title" v-model="form.title" />
        </div>
        <div>
          <textarea
            name="message"
            v-model="form.message"
            placeholder="..."
            class="textarea-post"
          ></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
    <div class="posts" v-if="Posts">
      <ul>
        <li v-for="post in Posts" :key="post.id">
          <div id="post-div">
            <p>{{ post.title }}</p>
            <p>{{ post.message }}</p>
            <p>Ecrit par : {{ post.author_prenom + " " + post.author_name }}</p>
            <span v-for="response in Responses" :key="response.id"> 
              <div v-if="response.post_id === post.id">
              {{ response.message }}
              </div>
            </span>
            <div id="post-div">
              <div>Répondre :</div>
              <form @submit.prevent="submitResponse(post)">
                <b-row>
                  <b-col lg="8" class="pb-2">
                    <textarea
                      name="message"
                      v-model="post.newMessage"
                      class="textarea-reponse"
                      placeholder="..."
                    ></textarea>
                  </b-col>
                  <b-col lg="4" class="pb-2"
                    ><b-button size="sm" type="submit">Envoyer</b-button></b-col
                  >
                </b-row>
              </form>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>Aucun post trouvé !</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Posts",
  components: {},
  data() {
    return {
      form: {
        title: "",
        message: "",
      },
    };
  },
  created: function () {
    // a function to call getposts action
    this.GetPosts();
    this.GetResponses();
  },
  computed: {
    ...mapGetters({ Posts: "StatePosts", User: "StateUser", Responses: "StateResponses" }),
  },
  methods: {
    ...mapActions(["CreatePost", "CreateResponse", "GetPosts", "GetResponses"]),
    async submit() {
      try {
        await this.CreatePost(this.form);
      } catch (error) {
        throw "Sorry you can't make a post now!";
      }
    },
    async submitResponse(post) {
      try {
        await this.CreateResponse(post);
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
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 30px;
  margin: 10px;
}
button[type="submit"]:hover {
  background-color: #45a049;
}
input {
  width: 60%;
  margin: 15px;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 30px;
}
.textarea-post {
  width: 75%;
  resize: vertical;
  padding: 15px;
  border-radius: 15px;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  height: 150px;
  margin: 15px;
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
</style>
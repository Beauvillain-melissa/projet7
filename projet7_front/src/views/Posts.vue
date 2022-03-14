<template>
  <div class="container">
    <div v-if="User">
      <p>Bonjour {{ User.prenom }} !</p>
    </div>
    <div>
      <b-form @submit.prevent="submit">
        <b-form-group
          id="input-group-1"
          label="Titre :"
          label-for="input-1"
          label-cols="2"
        >
          <b-form-input
            id="input-1"
            v-model="form.title"
            placeholder="Titre"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Message :"
          label-for="message"
          label-cols="2"
        >
          <b-form-textarea
            id="message"
            v-model="form.message"
            placeholder="..."
            rows="3"
            max-rows="6"
            required
          ></b-form-textarea>
        </b-form-group>
        <b-form-group
          id="input-group-3"
          label=""
          label-for="file-post"
          label-cols="2"
        >
          <b-form-file
            id="file-post"
            placeholder="Choisissez un fichier à envoyer"
            drop-placeholder="Déposer le fichier ici ..."
            accept="image/*"
            @change="uploadFile($event)"
            
          ></b-form-file>
        </b-form-group>
        <b-row>
          <b-col cols="2"></b-col>
          <b-col><b-button type="submit" variant="primary" pill>Poster !</b-button></b-col>
        </b-row>
      </b-form>
    </div>
    <div class="posts" v-if="Posts">
      <ul>
        <li v-for="post in Posts" :key="post.id">
          <div id="post-div">
            <p>{{ post.title }}</p>
            <p>{{ post.message }}</p>
            <div v-if="post.image">
              <img :src="post.image" class="img-post" >
            </div>
            <p>Ecrit par : {{ post.author_prenom + " " + post.author_name }}</p>
            <span v-for="response in Responses" :key="response.id">
              <div v-if="response.post_id === post.id" class="responses">
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
                    ><b-button size="sm" type="submit" variant="primary" pill
                      >Envoyer</b-button
                    ></b-col
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
      images: null
    };
  },
  created: function () {
    // a function to call getposts action
    this.GetPosts();
    this.GetResponses();
  },
  computed: {
    ...mapGetters({
      Posts: "StatePosts",
      User: "StateUser",
      Responses: "StateResponses",
    }),
  },
  methods: {
    ...mapActions(["CreatePost", "CreateResponse", "GetPosts", "GetResponses"]),
    async submit() {
      // try {
        const formData = new FormData();
        formData.append('image', this.images);
        formData.append('postTitle', this.form.title);
        formData.append('postMessage', this.form.message);

        await this.CreatePost(formData);
      // } catch (error) {
      //   throw error;
      // }
    },
    async submitResponse(post) {
      try {
        await this.CreateResponse(post);
      } catch (error) {
        throw "Sorry you can't make a post now!";
      }
    },
    uploadFile(event) {
        this.images = event.target.files[0];
      },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
/* button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 30px;
  margin: 10px;
}
button[type="submit"]:hover {
  background-color: #45a049;
} */
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
</style>
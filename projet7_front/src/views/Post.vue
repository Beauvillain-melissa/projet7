<template>
  <div class="container">
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from 'moment';

export default {
  name: "Post",
  components: {},
  data() {
    return {
      form: {
        title: "",
        message: "",
      },
      images: null,
      fields: [
          {
            key: 'title',
            label: 'Sujet',
            sortable: true
          },
          {
            key: 'author_name',
            label: 'Nom de l\'auteur',
            sortable: true
          },
          {
            key: 'author_prenom',
            label: 'Prénom de l\'auteur',
            sortable: true
          },
          {
            key: 'nb_responses',
            label: 'Nb',
            sortable: true
          },
          {
            key: 'created_at',
            label: 'Date de création',
            sortable: true,
            formatter: (value) => {
              return moment(value).format('DD/MM/YYYY')
            }
          }
        ],
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
</style>
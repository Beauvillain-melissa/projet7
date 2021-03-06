//store/modules/auth.js
// state = variable crée dans le store
import axios from 'axios';
const state = {
    user: null,
    posts: null,
    responses: null,
    currentPost: null
};
const getters = {
    isAuthenticated: state => !!state.user,    
    StatePosts: state => state.posts,
    StateUser: state => state.user,
    StateCurrentPost: state => state.currentPost,
    StateResponses: state => state.responses,
};
const actions = {
    async Register({ dispatch }, form) {
        await axios.post('api/auth/signup', form)
        let UserForm = {
            email: form.email,
            password: form.mdp
        };
        await dispatch('LogIn', UserForm)
    },
    async LogIn({ commit }, User) {
        let response = await axios.post('api/auth/login', User)
        await commit('setUser', response.data.user)
    },
    async CreatePost({ dispatch, getters }, post) {
        let user = getters.StateUser;
        post.append('userId', user.id);
        await axios.post('post', post, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          })
        await dispatch('GetPosts')
    },
    async CreateResponse({ dispatch, getters }, response) {
        let user = getters.StateUser;
        let postData = {
            response : response.message,
            postId : response.postId,
            userId : user.id
        }
        await axios.post('response', postData)
        await dispatch('GetResponse', response.postId)
    },
    async GetPosts({ commit }) {
        let response = await axios.get('posts')
        commit('setPosts', response.data.posts)
    },
    async GetPost({ dispatch, commit }, PostId) {
        let post = await axios.get('post/' + PostId)
        commit('setCurrentPost', post.data.post)
        await dispatch('GetResponse', PostId)
    },
    async GetResponse({ commit }, PostId) {
        let responses = await axios.get('response/' + PostId )
        commit('setResponses', responses.data.responses)
    },
    async LogOut({ commit }) {
        let user = null
        commit('LogOut', user)
    }
};
const mutations = {
    setUser(state, username) {
        state.user = username
    },
    setPosts(state, posts) {
        state.posts = posts
    },
    setResponses(state, responses) {
        state.responses = responses;
    },
    setCurrentPost(state, currentPost) {
        state.currentPost = currentPost;
    },
    LogOut(state) {
        state.user = null
        state.posts = null
        state.responses = null
    },
};
export default {
    state,
    getters,
    actions,
    mutations
};

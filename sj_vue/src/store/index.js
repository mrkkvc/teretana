import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    members : [],
    cards : [],
    user : {},
  },
  mutations: {
    setUser: function(state, user) {
      state.user = user;
    },

    removeUser: function(state) {
      state.user = {};
    },

    set_members : function (state, members) {
      state.members = members;
    },

    set_cards : function (state, cards) {
      state.cards = cards;
    },

    add_member: function (state, member) {
      state.members.push(member);
    },

    remove_member: function (state, id) {
      for(let i = 0; i < state.members.length; i++){
        if(state.members[i].id === id){
            state.members.splice(i, 1);
            break;
        }
      }
    },

    update_member: function (state, payLoad) {
      for(let i = 0; i < state.members.length; i++){
        if(state.members[i].id === parseInt(payLoad.msg.id)){
            state.members[i].ime = payLoad.msg.ime;
            state.members[i].prezime = payLoad.msg.prezime;
            state.members[i].ulica = payLoad.msg.ulica;
            break;
        }
      }
    }
  },
  actions: {
    login: function({ commit }, user) {
      fetch("http://localhost:800/api/members", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ime: user.username,
          prezime: user.prezime,
          pass: user.password,
        }),
      })
          .then((response) => {
            if (!response.ok) throw response;

            return response.json();
          })
          .then((jsonData) => {
            commit("setUser", jsonData);
          })
          .catch((error) => {
            if (typeof error.text === "function")
              error.text().then((errorMessage) => {
                console.log(errorMessage);
              });
            else console.log(error);
          });
    },

    logout: function({ commit }) {
      commit("removeUser");
    },

    load_members: function ({ commit }){
      fetch('http://localhost:800/api/members', { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('set_members', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    load_cards: function ({ commit }){
      fetch('http://localhost:800/api/kartice', { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('set_cards', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    delete_member: function({ commit }, id) {
      fetch(`http://localhost:800/api/members/${id}`, { method: 'delete' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('remove_member', jsonData.id)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    new_member: function({ commit }, members) {
      fetch('http://localhost:800/api/members', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: members
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('add_member', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    change_member: function({ commit }, payload) {
      fetch(`http://localhost:800/api/members/${payload.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload.msg
      }).then((response) => {
        if (!response.ok){
          throw response;
        }

        return response.json();
      }).then((jsonData) => {
        commit('update_member', {msg:jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    }
  }
})
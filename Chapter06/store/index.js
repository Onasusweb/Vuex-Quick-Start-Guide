// src/store/index.js
import Vuex from 'vuex';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import createLogger from 'vuex/dist/logger';
import createPersistedState from 'vuex-persistedstate';
import { mutations } from '../../Chapter04/store/mutations';
import actions from '../../Chapter04/store/actions';
import plugins from './plugins';
import router from '../router';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
if (debug) {
  plugins.push(createLogger({}));
}
plugins.push(createPersistedState());
const store = new Vuex.Store({
  state: {
    noteList: [],
    currentNote: { title: '', content: '' },
    editNote: null,
    editIndex: -1,
  },
  mutations,
  actions,
  strict: debug,
  plugins,
});

sync(store, router);

export default store;

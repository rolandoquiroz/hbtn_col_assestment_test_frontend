<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/api/v1/users/all/" class="navbar-brand">Retail Company</router-link>
      
      <div class="navbar-nav mr-auto">

        <li class="nav-item">
          <router-link to="/api/v1/users/all/" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>

        <li class="nav-item">
          <router-link v-if="currentUser" to="/api/v1/users/all/" class="nav-link">Users</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/api/v1/users/" class="nav-link">Add</router-link>
        </li>

      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import EventBus from "./common/EventBus";

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
    mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBus.remove("logout");
  }
};
</script>

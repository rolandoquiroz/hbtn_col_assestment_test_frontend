<template>
    <div class="container">
        <header class="jumbotron">
            <h3 class="mt-2 mb-3 float-left text-primary">Users</h3>
        </header>
    <!-- Users Table -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user">
                    <th scope="row">{{ index + 1 }}</th>
                    <td> {{ user.id }} </td>
                    <td> {{ user.email }} </td>
                    <td> {{ user.name }} </td>
                    <td> {{ user.last_name }} </td>
                    <td>
                        <form>
                            <button v-on:click.prevent="getUserDetail(user.id)" class="btn btn-sm btn-info mr-1">Detail</button>
                        </form>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default {
    name: "users-all",
    data() {
        return {
            users: [],
        };
    },
    methods: {
        retrieveUsers() {
            UserService.getUsersAll()
                .then(response => {
                    this.users = response.data;
                    console.log(response.data);
                    }
                )
                .catch(error => {
                    this.users =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                    
                    if (error.response && error.response.status === 403) {
                        EventBus.dispatch("logout");
                        }
                    }
                );
        },
        refreshList() {
            this.retrieveUsers();
        },
        getUserDetail(id) {
            this.$router.push({name: 'get-user-id', params: {id: id}});
        },
    },
    mounted() {
        this.retrieveUsers();
    },
};

</script>

<style scoped>
h3 {
    text-align: center;
}

.container {
    margin-top: 2rem;
}

</style>

<template>
<div class="container">
    <div class="submit-form">

        <header class="jumbotron">
            <h3 class="mt-2 mb-3 float-left text-primary">Add User</h3>
        </header>

        <div v-if="!submitted">

            <div class="form-group">
                <label for="name">Name</label>
                <input
                    class="form-control"
                    id="name"
                    v-model="user.name"
                    name="name"
                />
            </div>

            <div class="form-group">
                <label for="last-name">Last name</label>
                <input
                    class="form-control"
                    id="last-name"
                    v-model="user.last_name"
                    name="last-name"
                />
            </div>

            <div class="form-group">
                <label for="gov-id">Government issued ID</label>
                <input
                    class="form-control"
                    id="gov-id"
                    v-model="user.gov_id"
                    name="gov-id"
                />
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    class="form-control"
                    id="email"
                    required
                    v-model="user.email"
                    name="email"
                />
            </div>

            <div class="form-group">
                <label for="campany">Company</label>
                <input
                    class="form-control"
                    id="company"
                    v-model="user.company"
                    name="company"
                />
            </div>

            <button @click="saveUser" class="btn btn-success">Submit</button>

        </div>

        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" @click="newUser">Add</button>
        </div>
    </div>
</div>
</template>

<script>
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default {
    name: "add-user",
    data() {
        return {
            user: {
            id: null,
            email: "",
            name: "",
            last_name: "",
            gov_id: "",
            company: "",
        },
        submitted: false
        };
    },
    methods: {
        saveUser() {
            var data = {
                email: this.user.email,
                name: this.user.name,
                last_name: this.user.last_name,
                gov_id: this.user.gov_id,
                company: this.user.company,
        };
        UserService.postUser(data)
            .then(response => {
            this.user.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
        })
        .catch(e => {
            if (e.response && e.response.status === 403) {
                EventBus.dispatch("logout");
            }
            console.log(e);
        }
        );
    },
    
    newUser() {
        this.submitted = false;
        this.user = {};
    }
},

};
</script>

<style>
h3 {
    text-align: center;
}

.container {
    margin-top: 2rem;
}

.submit-form {
    max-width: 500px;
    margin: auto;
}

.form-group {
margin-bottom: 1.5rem;
}
</style>

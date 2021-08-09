<template>
	<div class="container">
	<div class="userid">
				<header class="jumbotron">
					<h3 class="mt-2 mb-3 float-left text-primary">User detail</h3>
				</header>

				<!-- User Table -->
				<table class="table table-bordered">
						<tr>
							<th scope="row">ID</th>
							<td> {{user.id}} </td>
						</tr>
						<tr>
							<th scope="row">Name</th>
							<td> {{user.name}} </td>
						</tr>
						<tr>
							<th scope="row">Last name</th>
							<td> {{user.last_name}} </td>
						</tr>
						<tr>
							<th scope="row">Government issued ID</th>
							<td> {{user.gov_id}} </td>
						</tr>
						<tr>
							<th scope="row">Email</th>
							<td> {{user.email}} </td>
						</tr>
						<tr>
							<th scope="row">Company</th>
							<td> {{user.company}} </td>
						</tr>
				</table>
			</div>				
	</div>
</template>

<script>
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default {
	name: "user-id",
	data() {
		return {
			user: [],
		};
	},
	methods: {
		getUser(id) {
			UserService.getUserId(id)
				.then(response => {
					this.user = response.data;
					console.log(response.data);
				})
				.catch(error => {
					this.user =
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
	},
	mounted() {
	this.getUser(this.$route.params.id);
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

.userid {
	max-width: 500px;
	margin: auto;
}

</style>
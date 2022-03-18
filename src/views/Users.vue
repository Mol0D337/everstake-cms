<template>
	<div>
		<a-row type="flex" :gutter="24">
			<a-col :span="24" :md="24" class="mb-24">
				<a-card :loading="isLoading" :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }">
					<template #title>
						<h6 class="font-semibold m-0">Users Information</h6>
					</template>

					<a-empty v-if="!isLoading && !usersData.length"/>

					<a-row v-else :gutter="[24, 24]">
						<a-col v-for="user in usersData" :span="24">
							<a-card :bordered="false" class="card-billing-info">
								<div class="col-info">
									<a-descriptions :title="user.name" :column="1">
										<a-descriptions-item label="Email Address">
											{{ user.email }}
										</a-descriptions-item>
										<a-descriptions-item label="Role">
											{{ user.role }}
										</a-descriptions-item>
										<a-descriptions-item label="Created">
											{{ user.created_at.slice(0, 10) }}
										</a-descriptions-item>
									</a-descriptions>
								</div>
								<div class="col-action">
									<a-button type="link" @click="editUser.email = user.email; editUser.role = user.role;" v-b-modal.EditRoleUserModal size="small">
										<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path class="fill-muted" d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z" fill="#111827"/>
											<path class="fill-muted" d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z" fill="#111827"/>
										</svg>
										<span class="text-dark">EDIT</span>
									</a-button>
								</div>
							</a-card>
						</a-col>
					</a-row>
				</a-card>
			</a-col>
		</a-row>
		<b-modal
				id="EditRoleUserModal"
				title="Edit Role User"
				centered
				hide-footer
		>
			<a-form
					id="components-form-demo-normal-login"
					class="login-form"
			>
				<a-form-item style="margin: 10px" v-for="(value, label) in editUser" :label="label.toUpperCase()" :colon="false">
					<a-input :disabled="label === 'email'" v-model="editUser[label]" :placeholder="label.toUpperCase()" />
				</a-form-item>
			</a-form>

			<a-form-item style="margin: 10px">
				<a-button type="primary" block @click="putAdminUserRole" class="login-form-button">EDIT ROLE USER</a-button>
			</a-form-item>

		</b-modal>
	</div>
</template>

<script>
	import { getUsers, putUserRole } from '@/api';
	import { handleError, handleSuccess } from '@/utils/errorsHandler';

	export default ({
		name: 'Users',
		data() {
			return {
				usersData: [],
				editUser: {
					email: null,
					role: null,
				},
				isLoading: false,
			}
		},
		created() {
			this.getAdminUsers()
		},
		methods: {
			async getAdminUsers() {
				try {
					this.isLoading = true;
					const resp = await getUsers();
					this.usersData = resp.data;
				} catch (e) {
					handleError(e);
				} finally {
					this.isLoading = false;
				}
			},
			async putAdminUserRole() {
				try {
					await putUserRole(this.editUser);
					this.$bvModal.hide('EditRoleUserModal');
          handleSuccess('User role changed successfully!')
					await this.getAdminUsers();
				} catch (e) {
					handleError(e);
				}
			},
		}
	})

</script>

<style lang="scss">
</style>

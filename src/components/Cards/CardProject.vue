<template>

	<!-- Project Card -->
	<a-card class="card-project">
		<img
			slot="cover"
			alt="example"
			:src="cover"
		/>
		<div class="card-tag">Block</div>
		<h5>{{ title }}</h5>
		<p>
			{{ content }}
		</p>
		<a-row type="flex" :gutter="6" class="card-footer" align="middle">
			<a-col :span="12">
				<a-button size="small">EDIT BLOCK</a-button>
			</a-col>
		</a-row>
	</a-card>
	<!-- / Project Card -->

</template>

<script>

	export default ({
		props: {
			title: {
				type: String,
				default: "",
			},
			content: {
				type: String,
				default: "",
			},
			cover: {
				type: String,
				default: "",
			},
		},
		data() {
			return {
			}
		},
	})

</script>

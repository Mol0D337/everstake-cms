<template>
	<div>

		<!-- Header Background Image -->
		<div class="profile-nav-bg" style="background-image: url('images/bg-profile.jpg')"></div>
		<!-- / Header Background Image -->

		<!-- User Profile Card -->
		<a-card :bordered="false" class="card-profile-head" :bodyStyle="{padding: 0,}">
			<template #title>
				<a-row type="flex" align="middle">
					<a-col :span="24" :md="12" class="col-info">
						<a-avatar :size="74" shape="square" src="images/face-1.jpg" />
						<div class="avatar-info">
							<h4 class="font-semibold m-0">Yevhenii Molodyk</h4>
							<p>Front-end engineer</p>
						</div>
					</a-col>
					<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
						<a-radio-group v-model="pageSelected" size="small">
							<a-radio-button v-for="(page, index) in pages" :key="index" :value="page">{{ page.toUpperCase() }}</a-radio-button>
						</a-radio-group>
					</a-col>
				</a-row>
			</template>
		</a-card>
		<!-- User Profile Card -->

		<!-- Projects Card -->
		<Home :projects="projects"/>
		<!-- / Projects Card -->

	</div>
</template>

<script>

	import CardPlatformSettings from "../components/Cards/CardPlatformSettings"
	import CardProfileInformation from "../components/Cards/CardProfileInformation"
	import CardConversations from "../components/Cards/CardConversations"
	import CardProject from "../components/Cards/CardProject"
	import Home from "@/components/Page/Home"

	export default ({
		components: {
			CardPlatformSettings,
			CardProfileInformation,
			CardConversations,
			CardProject,
			Home,
		},
		data() {
			return {
				projects: [
					{
						title: "Everstake validation stats",
						content: "Here you can edit: Digital Assets Staked, Unique users, Uptime",
						cover: "images/everstake-validation-stats.png",
					},
					{
						title: "Сoins under active development",
						content: "Here you can edit: Сoins under active development",
						cover: "images/dev-coin.png",
					},
				],
				pageSelected: 'home',
				pages: ['home', 'portfolio', 'learning-center', 'balance', 'statistics', 'coin-page', 'profile'],
			}
		},
	})

</script>

<style lang="scss">
</style>

<template>
  <a-card :bordered="false" class="header-solid h-full mb-24" :bodyStyle="{paddingTop: '14px'}">
  <template #title>
   <h6 class="font-semibold">Home Page</h6>
   <a href="https://everstake.one/" target="_blank">everstake.one</a>
  </template>

  <a-row type="flex" :gutter="24" align="stretch">

   <!-- Project Column -->
   <a-col :span="24" :md="8" :xl="6" v-for="(project, index) in projects" :key="index">
    <CardProject
        :title="project.title"
        :content="project.content"
        :cover="project.cover"
    ></CardProject>
   </a-col>
   <!-- / Project Column -->

  </a-row>
 </a-card>
</template>

<script>
    import CardProject from "../../components/Cards/CardProject"
    export default {
        name: "Home",
        props: {
            projects: {
                type: Array,
                required: true,
                default() {
                    return []
                }
            }
        },
        components: {
            CardProject,
        },
    }

</script>

<style lang="sass" scoped>
a
 color: #8C8C8C
</style>

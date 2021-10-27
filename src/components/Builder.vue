<template>

  <section class="container mx-auto my-5 px-5 md:px-16 xl:px-0 space-x-10 flex">
    <div class="mt-8 sm:mx-auto space-y-10">

      <div>
        <h1 class="text-3xl font-medium">{{ content.title }}</h1>
      </div>
      <div>
        <div v-if="compiledMarkdown" v-html="compiledMarkdown"></div>
      </div>
      <div>
        <div class="space-y-2">
          <img class="h-96" :src="image" alt="">
        </div>
      </div>

    </div>
  </section>
</template>

<script>

import marked from "marked";

export default {

  name: "Builder",
  props: {
    content: Object
  },

  computed: {
    image() {
      return `${this.$cms}${this.content.image?.url}`
    },
    compiledMarkdown: function () {
      return marked(this.content.description ?? '', {sanitize: true})
    }

  },
}
</script>

<style scoped>

</style>

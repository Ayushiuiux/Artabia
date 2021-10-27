<template>
  <Builder :content="content"/>

</template>


<script>
import Builder from "../components/Builder";

export default {
  name: "Privacy",
  components: {
    Builder
  },

  data() {
    return {
      content: {}
    }
  },
  async created() {
    try {
      const {data} = await this.axios.get(`${this.$cms}/menus`);
      this.content = data.find(obj => obj.name === "Privacy Policy");

    } catch (e) {
      console.log(e)
    }
  }

}
</script>

<style scoped>

</style>

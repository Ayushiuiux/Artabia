<template>
  <div ref="loading"
       class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-100 flex flex-col items-center justify-center loading-spinner">
    <div id="loading" class="my-3"></div>
    <h3 ref="error" class="text-red-400 error-spinner"></h3>
  </div>
</template>

<script>
export default {
  name: "Spinner"
}
</script>

<style scoped>

</style>

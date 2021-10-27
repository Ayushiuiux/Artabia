<template>
  <section class="container mx-auto my-5 px-5 md:px-16 xl:px-0 space-x-10 flex">


      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4  sm:rounded-lg sm:px-10">
          <h1 class="text-3xl mb-8">Contact Us</h1>
          <form class="space-y-6" action="#" method="POST">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 font-bold   ">
               Title
              </label>
              <div class="mt-1">
                <input id="title" placeholder="Enter title" name="title" type="text" autocomplete="title" required class="appearance-none block w-full px-3 py-2 border-b border-gray-300  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 font-bold   ">
                Email
              </label>
              <div class="mt-1">
                <input id="email" placeholder="Enter email" name="email" type="email" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
            </div>

            <div>
              <div class="space-y-2">
                <p class="text-sm font-medium text-gray-700 font-bold   ">Description</p>
                <textarea
                  rows="6"
                  class="p-2 shadow-sm block w-full focus:outline-none sm:text-sm border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div class="flex flex-col space-y-10">


              <div class="flex justify-start">
                <vue-recaptcha sitekey="Your key here"></vue-recaptcha>
              </div>

              <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Send
              </button>
            </div>
          </form>

        </div>
      </div>


  </section>
</template>


<script>
import VueRecaptcha from 'vue-recaptcha';

export default {


  name: "Contact",
  components: { VueRecaptcha }
}
</script>

<style scoped>

</style>

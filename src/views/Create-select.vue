<style scoped>
.multi_select{
  position: relative;
}
.multi_select img {
  filter: blur(1.2px) !important;
  opacity: .5;
  position: relative;
}
.multi_select::before {
  content: 'Coming Soon';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8575c6;
  font-size: 22px;
  font-weight: 600;
  text-shadow: 0 0 10px #fffdfd;
}
</style>
<template>
  <section class="container mx-auto my-5 px-5 md:px-16 xl:px-0">

    <div class="flex space-x-2 items-center mb-3 group">
      <breadcrumb link="/"/>
    </div>

    <div class="space-y-2">
      <h2 class="text-3xl font-bold">Create collectible</h2>
      <p class="text-gray-500 font-semibold text-lg">Choose "Single" if you want your collectible to be one of a kind or
        "Multiple" if you want to sell one collectible multiple times</p>
    </div>

    <figure class="flex items-center justify-around my-10">
      <icon link="/create?type=single" :img="single.path" :title="single.name"/>
      <icon :img="multiple.path" :title="multiple.name" class="multi_select"/>
    </figure>

    <p class="text-gray-500 font-semibold text-lg">We do not own your private keys and cannot access your funds without
      your confirmation</p>

  </section>
</template>

<script>

import Icon from '@/components/Icon'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'Home',
  components: {Breadcrumb, Icon},
  data() {
    return {
      single: {
        path: '/img/single.png',
        name: 'Single'
      },
      multiple: {
        path: '/img/multiple.png',
        name: 'Multiple'
      }
    }
  },


}
</script>
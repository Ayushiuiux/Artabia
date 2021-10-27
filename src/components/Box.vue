<template>
    <div
        :class="active?'artabia-border-dark-color':'border-gray-300'"
        class="border-2 rounded border-gray-300 artabia-border-dark-color-hover flex flex-col p-3 hover:scale-105 transform transition-all group cursor-pointer"
    >
        <img class="object-contain h-12 w-full" :src="img" :alt="title">
        <p class="text-center font-semibold duration-300	">{{ title }}</p>
    </div>
</template>

<script>
    export default {
        name: 'Box',
        props: {
            img: String,
            title: String,
            active: Boolean
        }

    }
</script>

<style scoped>

</style>

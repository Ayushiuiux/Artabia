<template>
    <div class="flex space-x-3">
        <arrow-left />
        <router-link
            :to="link"
            class="font-semibold group-hover:scale-95 transform transition-all group-hover:underline
    group-hover:text-red-500"
        >
            <span class="artabia-dark-color-text">Go Back</span>
        </router-link>
    </div>

</template>

<script>
    import ArrowLeft from '@/components/svg/ArrowLeft'

    export default {
        name: 'Breadcrumb',
        components: { ArrowLeft },
        props: {
            link: String
        }
    }
</script>

<style scoped>

</style>

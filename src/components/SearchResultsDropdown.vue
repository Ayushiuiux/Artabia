<template>
    <transition name="fade">
        <div v-if="isOpen" class="search-results">
            <div v-if="results.items" class="result-category">
                <span class="result-category-title">Items</span>
                <div
                    v-for="item in results.items"
                    :key="item.id"
                    @click="emitClick"
                >
                    <router-link to="/" class="result-item">
                        <div class="result-avatar">
                            <img :src="item.avatar" alt="avatar">
                        </div>
                        <div class="result-info-container">
                            <span class="result-title">
                                {{ item.name }}
                            </span>
                            <span class="result-info">
                                {{ item.type }}
                            </span>
                        </div>
                    </router-link>
                </div>
            </div>
            <div v-if="results.users" class="result-category">
                <span class="result-category-title">Users</span>
                <div
                    v-for="user in results.users"
                    :key="user.id"
                    @click="emitClick"
                >
                    <router-link to="/" class="result-item">
                        <div class="result-avatar">
                            <img :src="user.avatar" alt="avatar">
                        </div>
                        <div class="result-info-container">
                            <span class="result-title">
                                {{ user.name }}
                            </span>
                            <span class="result-info">
                                {{ user.followers }}
                            </span>
                        </div>
                    </router-link>
                </div>
            </div>
            <!-- <div class="all-results">
                All results
            </div> -->
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'SearchResultsDropdown',
        props: {
            results: {
                type: Object,
                required: true
            },
            isOpen: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            emitClick() {
                this.$emit('clicked')
            }
        }
    }
</script>

<style scoped>
.search-results {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-radius: 4px;
}

.result-category {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.result-category-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    align-self: flex-start;
}

.result-item {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    text-decoration: none;
}

.result-avatar {
    max-width: 50px;
    max-height: 50px;
}

.result-avatar img {
    width: 100%;
    border-radius: 50%;
}

.result-info-container {
    margin-left: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.result-title {
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
}

.result-info {
    font-size: 0.9rem;
    color: rgb(156, 156, 156);
}

.all-results {
    display: block;
    margin: 0 auto;
    line-height: 2.5rem;
    width: 90%;
    background-color: #242424;
    color: #fff;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media screen and (min-width: 992px) {
    .search-results {
        background: #2f3030;
        width: 100%;
        max-width: 600px;
        position: absolute;
        z-index: 1;
        padding: 1rem;
        top: 100%;
        left: 0;
        transform: translateX(-4%);
    }
}
</style>

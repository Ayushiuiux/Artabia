<template>
    <b-card
        v-if="user"
        :img-src="user.coverImage"
        :img-alt="user.name"
        img-top
        tag="article"
        class="mb-2"
    >
        <img :src="user.profileImage" alt="" class="user-avatar">
        <h4 class="card-title">{{ user.name }}</h4>
        <router-link to="#" class="username">
            <span>@{{ user.username }}</span>
        </router-link>
        <span class="user-bio">{{ user.bio }}</span>
        <template #footer>
            <div class="footer-slot">
                <div class="followers">
                    <span>
                        {{ user.followerCount }}
                    </span>
                    Followers
                </div>
                <div class="follow-btn">
                    Unfollow
                </div>
            </div>
        </template>
    </b-card>
</template>

<script>
    import moment from 'moment-timezone'
    export default {
        name: 'ItemCard',
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        computed: {
            formatedDate() {
                if (this.user.createdDate) {
                    return moment(this.card.user.createdDate).format('MMM Do, YYYY')
                }
                return ''
            }
        }
    }
</script>

<style scoped>
    .card {
        max-width: 17rem;
        box-shadow: 0px 0px 48px -13px rgba(0,0,0,0.36);
        border-radius: 11px;
    }

    .card-title {
        margin-bottom: 0.5rem;
    }

    .card-img-top {
        border-top-left-radius: 11px;
        border-top-right-radius: 11px;
    }

    .card-body {
        padding: 0 1rem 1rem;
        display: flex;
        flex-direction: column;
    }

    .user-avatar {
        border-radius: 50%;
        transform: translateY(-35%);
        border: 3px solid #fff;
        width: 45px;
        height: auto;
    }

    .username {
        font-size: 0.9rem;
        text-decoration: none;
        color: #8575c6;
    }

    .user-bio {
        font-size: 0.9rem;
    }

    .footer-slot {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .followers {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 0.9rem;
        color: rgb(90, 90, 90);
        font-weight: bold;
    }

    .followers span {
        font-size: 1.3rem;
        color: #000;
    }

    .follow-btn {
        padding: 0.5rem 1rem;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 20px;
    }
</style>

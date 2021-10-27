<template>
    <div class="sidebar-container">
        <div class="profile-avatar">
            <img :src="require(`@/${user.profileImage}`)" alt="avatar">
        </div>
        <div class="eth-address">
            <span>{{ shortenAddress() }}</span> <font-awesome-icon :icon="['far', 'copy']" size="lg" class="copy-icon" @click="copyToClipBoard" />
            <transition name="fade">
                <div v-if="showToolTip" class="copy-tooltip">
                    <span class="tooltip-text">Address copied!</span>
                </div>
            </transition>
        </div>
        <h2 class="name">{{ user.name }}</h2>
        <h3 class="username">@ {{ user.username }}</h3>
        <div class="followers-section">
            <div class="following">
                {{ user.followingCount }}
                <span class="text-muted">Following</span>
            </div>
            <div class="followers">
                {{ user.followerCount }}
                <span class="text-muted">Followers</span>
            </div>
            <router-link to="/edit-profile" class="edit-profile-btn">Edit Profile</router-link>
        </div>
        <div class="bio-section">
            <div class="section-title">Bio</div>
            <div class="bio">{{ user.bio }}</div>
        </div>
        <div class="links-section">
            <div class="section-title">Links</div>
            <div v-if="user.social.website" class="social-link">
                <font-awesome-icon :icon="['fas', 'globe']" /> <span>{{ user.social.website }}</span>
            </div>
            <div v-if="user.social.discord" class="social-link">
                <font-awesome-icon :icon="['fab', 'discord']" /> <span>{{ user.social.discord }}</span>
            </div>
            <div v-if="user.social.facebook" class="social-link">
                <font-awesome-icon :icon="['fab', 'facebook']" /> <span>{{ user.social.facebook }}</span>
            </div>
        </div>
        <div class="joined-section">
            <span>
                Joined
            </span>
            <span>
                {{ formatedDate() }}
            </span>
        </div>
    </div>
</template>

<script>
    import userProfile from '@/UserProfile.json'
    import moment from 'moment-timezone'
    export default {
        data() {
            return {
                user: null,
                ethAddress: '0xDC25EF3F5B8A186998338A2ADA83795FBA2D695E',
                showToolTip: false
            }
        },
        created() {
            this.user = userProfile
        },
        methods: {
            shortenAddress() {
                return this.ethAddress.substring(0, 6) + '...' + this.ethAddress.substring(this.ethAddress.length - 4)
            },
            copyToClipBoard() {
                navigator.clipboard.writeText(this.ethAddress).then(() => {})
                this.showToolTip = true
                setTimeout(() => {
                    this.showToolTip = false
                }, 3000)
            },
            formatedDate() {
                if (this.user.createdAt) {
                    return moment(parseInt(this.user.createdAt)).format('MMM YYYY')
                }
                return ''
            }
        }
    }
</script>

<style scoped>

.sidebar-container {
    width: 100%;
    padding: 2rem 0;
}

.profile-avatar {
    margin: 0 auto;
    border: double 3px transparent;
    border-radius: 50%;
    background-image: linear-gradient(#2f3030, #2f3030), linear-gradient(to bottom, #ae9cf8, #e5c3c3);
    background-origin: border-box;
    background-clip: content-box, border-box;
    cursor: pointer;
    max-width: 100px;
}

.profile-avatar img {
    width: 100%;
}

.eth-address {
    margin: 1rem auto;
    text-align: center;
    position: relative;
    border: 1px solid #d8d8d8;
    border-radius: 20px;
    width: 60%;
    padding: 0.25rem 0.75rem;
}

.copy-icon {
    margin-left: 0.35rem;
    color: #e1e1e1;
    cursor: pointer;
}

.copy-tooltip {
    position: relative;
    display: inline;
}

.copy-tooltip .tooltip-text {
    width: 120px;
    background-color: #2b2c2c;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    position: absolute;
    top: 50%;
    left: 100%;
    margin-left: 0.5rem;
    transform: translateY(-50%);
    z-index: 1;
}

.copy-tooltip .tooltip-text::after {
    content: " ";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent #2b2c2c transparent transparent;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.name,
.username {
    font-weight: bold;
    text-align: center;
}

.name {
    font-size: 2.5rem;
    margin-top: 1.5rem;
}

.username {
    font-size: 2rem;
    color: #e5c3c3;
}

.followers-section {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.1rem;
}

.followers-section .text-muted {
    font-size: 0.9rem;
}

.following,
.followers {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.edit-profile-btn {
    text-decoration: none;
    color: #000;
    border: 2px solid #d8d8d8;
    border-radius: 20px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
}

.section-title {
    font-weight: bold;
    border-bottom: 1px solid #d8d8d8;
    padding-bottom: 0.75rem;
}

.bio-section,
.links-section {
    margin-top: 2rem;
}

.bio {
    color: #6c757d;
}

.bio,
.social-link {
    margin-top: 1rem;
}

.social-link span{
    margin-left: 0.75rem;
    font-weight: bold;
}

.joined-section {
    margin-top: 2rem;
    border-bottom: 1px solid #d8d8d8;
    border-top: 1px solid #d8d8d8;
    padding: 0.75rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    color: #6c757d;
}

.joined-section span:first-child {
    color: #44484b;
}

@media screen and (min-width: 992px) {
    .sidebar-container {
        width: 25%;
    }

    .eth-address {
        width: 100%;
    }
}

</style>

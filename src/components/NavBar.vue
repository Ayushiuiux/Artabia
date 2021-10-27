<template>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="">
        <div class="container">
            <b-navbar-brand href="." class="logo-container">
                <img :src="require('@/assets/images/logo.svg')" alt="Artabia Logo">
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse">
                <template #default="{ expanded }">
                    <burger :is-open="expanded" />
                </template>
            </b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <div class="search-box">
                    <div class="search px-7">
                        <form class="search-form">
                            <b-icon icon="search" />
                            <input
                                v-model.trim="searchQuery"
                                type="text"
                                placeholder="Search items and account"
                            >
                            <img
                                v-if="searchQuery.length > 0"
                                :src="require('@/assets/images/clear-btn.png')"
                                alt="clear input"
                                class="clear-btn"
                                @click="clearInput"
                            >
                        </form>
                    </div>
                    <search-results-dropdown
                        :results="results"
                        :is-open="resultsPopup"
                        @clicked="clearInput"
                    />
                </div>
                <div class="custom-select-menu-container">
                    <img :src="require('@/assets/images/icons/globe-icon.png')" alt="icon">
                    <select class="custom-select-menu">
                        <option value="en">en</option>
                        <option value="el">el</option>
                    </select>
                </div>
                <div class="buttons">
                    <router-link to="/create-select" class="nav-link">
                        Create
                    </router-link>
                </div>
                <div class="wallet_drop_grp">
                    <div class="wallet_select_txt">
                        <span>0.083</span> <b>BNB</b>
                    </div>
                    <b-form-select v-model="selected" :options="options" class="wallet_select_option"></b-form-select>
                </div>
                <div class="profile-nav-container">
                    <div class="profile-avatar" @click="toggleProfileMenu">
                        <router-link to="/profile">
                            <img :src="require(`@/${user.profileImage}`)" alt="avatar">
                        </router-link>
                    </div>
                    <!-- <transition name="fade">
                        <div v-if="profileMenuOpen" class="profile-menu" @click="profileMenuOpen=false">
                            <div class="profile-menu-item">
                                <span>Wallet Balance</span>
                                <span>0.00 ETH</span>
                            </div>
                            <div class="profile-menu-item">
                                <router-link to="/edit-profile">
                                    <span>My profile</span>
                                </router-link>
                            </div>
                            <div class="profile-menu-item">
                                <router-link to="/edit-profile">
                                    <span>Edit Profile</span>
                                </router-link>
                            </div>
                        </div>
                    </transition> -->
                </div>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
    import Burger from '@/components/Burger'
    import SearchResultsDropdown from '@/components/SearchResultsDropdown'
    import user from '@/UserProfile.json'
    export default {
        name: 'NavBar',
        components: {
            Burger, SearchResultsDropdown
        },
        data() {
            return {
                user: null,
                searchQuery: '',
                profilePopup: false,
                profileMenuOpen: false,
                results: {
                    collections: [
                        {
                            id: 1,
                            name: 'Collection 1',
                            avatar: 'https://source.unsplash.com/random/50x50',
                            type: 'ERC-721'
                        },
                        {
                            id: 2,
                            name: 'Collection 2',
                            avatar: 'https://source.unsplash.com/random/50x50',
                            type: 'ERC-721'
                        },
                        {
                            id: 3,
                            name: 'Collection 3',
                            avatar: 'https://source.unsplash.com/random/50x50',
                            type: 'ERC-721'
                        }
                    ],
                    items: [
                        {
                            id: 1,
                            name: 'Item 1',
                            avatar: 'https://source.unsplash.com/random/50x50',
                            type: 'Not For Sale'
                        },
                        {
                            id: 2,
                            name: 'Item 2',
                            avatar: 'https://source.unsplash.com/random/50x50',
                            type: 'Not For Sale'
                        },
                        {
                            id: 3,
                            name: 'Item 3',
                            avatar: 'https://source.unsplash.com/random/50x50',
                            type: 'Not For Sale'
                        }
                    ],
                    users: [
                        {
                            id: 1,
                            name: 'User 1',
                            avatar: 'https://source.unsplash.com/random/50x50',
                            followers: '132 followers'
                        },
                        {
                            id: 2,
                            name: 'User 2',
                            avatar: 'https://source.unsplash.com/random/50x50',
                            followers: '235 followers'
                        },
                        {
                            id: 3,
                            name: 'User 3',
                            avatar: 'https://source.unsplash.com/random/50x50',
                            followers: '54 followers'
                        }
                    ]
                },
                selected: 'bnb',
                options: [
                    { value: 'bnb', text: 'Binance' },
                    { value: 'eth', text: 'Ethereum'},                    
                ]
            }
        },
        computed: {
            resultsPopup() {
                if (this.searchQuery.length > 0) {
                    return true
                } else {
                    return false
                }
            }
        },
        async created() {
            this.user = user
        },
        methods: {
            toggleProfileMenu() {
                this.profileMenuOpen = !this.profileMenuOpen
            },
            clearInput() {
                this.searchQuery = ''
            }
        }
    }
</script>


<style scoped>
.wallet_drop_grp {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 25px;
}
.wallet_select_txt {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 140px;
    background: #000;
    color: #fff;
    height: 40px;
    border: 1px solid #444;
    box-shadow: inset 0 0 2px 0px rgb(245 229 229 / 50%);
}
.wallet_select_option {
    min-width: 140px;
    background: #000;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    height: 40px;
    border: 1px solid #444;
    box-shadow: inset 0 0 2px 0px rgb(245 229 229 / 50%);
}
.wallet_select_txt b{
    padding-left: 5px;
}
.navbar {
    padding: 1rem;
}

.bg-dark {
    background: #2f3030 !important;
}

.navbar-dark .navbar-toggler {
    border-color: transparent!important;
}

.logo-container {
    position: relative;
    border-top: 10px solid #e4ccbd;
    max-width: 100px;
}

.logo-container::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    background-color: #2f3030;
    height: 10px;
    width: 15%;
}

.logo-container::after {
    content: '';
    position: absolute;
    top: -10px;
    right: 0;
    background-color: #2f3030;
    height: 10px;
    width: 15%;
}

.logo-container img {
    width: 100%;
}

.search-box {
    width: 100%;
    margin-top: 2rem;
    position: relative;
}

.search-form {
    margin: 0 auto;
    max-width: 550px;
    background-color: transparent;
    border: 1px solid rgb(185, 185, 185);
    border-radius: 4px;
    color: #8575c6;
    padding-left: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-form input {
    border: none;
    margin-left: 0.5rem;
    background-color: transparent;
    color: #fff;
    outline: none;
    width: 100%;
    height: 2rem;
}

.clear-btn {
    width: 1rem;
    margin-right: 0.25rem;
    cursor: pointer;
}

.custom-select-menu-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 0.2rem;
}

.custom-select-menu {
    background-color: transparent;
    cursor: pointer;
    color: #e4ccbd;
    width: max-content;
    font-size: 0.9rem;
    font-weight: bold;
    border: 0;
    position: relative;
}

.custom-select-menu::after {
    content: "\25BC";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    pointer-events: none;
}

.network {
    margin-top: 0.5rem;
    text-align: center;
    color: #e4ccbd;
    white-space: nowrap;
}

.buttons {
    display: flex;
    justify-content: center;
    align-items: center;
}

.buttons .nav-link {
    border: 1px solid #e4ccbd;
    background-color: transparent;
    color: #e4ccbd;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
}

.nav-link + .nav-link{
    margin-left: 1rem;
}

.profile-avatar {
    margin: 0 auto;
    border: double 2px transparent;
    border-radius: 50%;
    background-image: linear-gradient(#2f3030, #2f3030), linear-gradient(to bottom, #ae9cf8, #e5c3c3);
    background-origin: border-box;
    background-clip: content-box, border-box;
    cursor: pointer;
    max-width: 64px;
}

.profile-avatar img {
    width: 100%;
}

.profile-nav-container {
    margin-top: 2rem;
    position: relative;
}

.profile-menu {
    position: absolute;
    top: 110%;
    left: 50%;
    transform: translateX(-50%);
    min-width: 164px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem;
    background-color: #2f3030;
    color: #837c79;
    border-radius: 4px;
    z-index: 1;
}

.profile-menu-item {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    padding: 0rem 0.75rem;
    cursor: pointer;
}
.profile-menu-item + .profile-menu-item {
    margin-top: 0.5rem;
}
.profile-menu-item a {
    color: #837c79;
    text-decoration: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.custom-select-menu-container,
.buttons,
.profile-avatar {
    margin-top: 1rem;
}

@media screen and (min-width: 992px) {
    .container {
        max-width: 1350px;
    }

    .navbar {
        padding: 1.5rem 2rem;
    }

    .bg-dark {
        background: url('~@/assets/images/nav-bg.png')!important;
        background-size: cover!important;
        background-position: right center!important;
        background-repeat: no-repeat!important;
    }

    .logo-container {
        border-top: none;
        max-width: 150px;
    }
    .logo-container::before,
    .logo-container::after {
        display: none;
    }

    .search-box {
        width: 100%;
        margin-top: 2rem;
        position: relative;
    }

    .profile-avatar {
        width: 50px;
        /* width: 64px; */
        /* margin: 0 75px 0 2rem; */
    }

    .profile-menu {
        left: 2rem;
        transform: translateX(0);
    }

    .search-box,
    .custom-select-menu-container,
    .network,
    .buttons,
    .profile-avatar,
    .profile-nav-container {
        margin-top: 0;
    }

    .custom-select-menu-container,
    .network {
        margin-left: 0.5rem;
    }

    .search-results,
    .search-form,
    .buttons  {
        margin-left: 2rem;
    }
}

</style>

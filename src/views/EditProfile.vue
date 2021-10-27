<template>
  <div class="profile-route">
    <h1 class="route-title">Edit Profile</h1>
    <div class="container">
      <form class="profile-form" @submit.prevent="saveProfile">
        <div class="image-uploads">
          <h3>Upload a profile image</h3>
          <div class="img-upload">
            <div class="image-upload-description">
              Recommended size:
              <br>
              1000px x 1000px
              <br>
              JPG, PNG or GIF.
              <br>
              10MB max size
            </div>
            <image-upload
              v-model="user.profileImage"
              :image-url="user.profileImage"
              @update-image="profileImageChanged"
            />
          </div>
          <h3 class="mt-5">Upload a cover image</h3>
          <div class="img-upload">
            <div class="image-upload-description">
              Recommended size:
              <br>
              1500px x 1500px
              <br>
              JPG, PNG or GIF.
              <br>
              10MB max size
            </div>
            <image-upload
              v-model="user.coverImage"
              :image-url="user.coverImage"
              @update-image="coverImageChanged"
            />
          </div>
        </div>
        <div class="personal-details">
          <h3>Personal Details</h3>
          <div class="detail-inputs">
            <div class="form-group">
              <div class="input-label" :class="{'show': user.name}">Name</div>
              <input v-model="user.name" type="text" class="form-control" placeholder="Name">
            </div>
            <div class="username-input">
              <div class="username-icon-container">
                <font-awesome-icon :icon="['fas', 'at']"/>
              </div>
              <div class="form-group username">
                <div class="input-label" :class="{'show': user.username}">Username</div>
                <input
                  v-model="user.username"
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  @input="checkUsernameAvailability"
                >
              </div>
            </div>
            <small
              v-if="usernameExists===false"
              class="username-available"
            >Username {{ user.username }} is available</small>
            <small
              v-else-if="usernameExists===true"
              class="username-taken"
            >Username {{ user.username }} already in use</small>
            <div class="form-group email">
              <div class="input-label">Email</div>
              <input v-model="user.email" type="email" class="form-control" placeholder="Email">
            </div>
          </div>
        </div>
        <div class="bio-section">
          <h3>Add a short bio</h3>
          <div class="bio-group">
            <div class="form-group bio">
              <div class="input-label" :class="{'show': user.bio}">Enter a short bio</div>
              <textarea
                v-model="user.bio"
                class="form-control bio"
                placeholder="Enter a short bio"
                maxlength="200"
                @input="getBioLength"
              />
            </div>
            <small class="bio-length">
              {{ getBioLength() }}/200
            </small>
          </div>
        </div>
        <div class="social-links">
          <h3 class="social-links-title">Add links to your social media profiles</h3>
          <div class="form-group social-link">
            <div class="social-label-container">
                            <span class="social-label">
                                <font-awesome-icon :icon="['fas', 'globe']"/>
                                <span>
                                    Website
                                </span>
                            </span>
              <span class="input-prepend">
                                https://
                            </span>
            </div>
            <input v-model="user.website" type="text" class="form-control social" placeholder="Website URL">
          </div>
          <div class="form-group social-link">
            <div class="social-label-container">
                            <span class="social-label">
                                <font-awesome-icon :icon="['fab', 'discord']"/>
                                <span>
                                    Discord
                                </span>
                            </span>
            </div>
            <input v-model="user.discord" type="text" class="form-control social" placeholder="Discord Username">
          </div>
          <div class="form-group social-link">
            <div class="social-label-container">
                            <span class="social-label">
                                <font-awesome-icon :icon="['fab', 'youtube']"/>
                                <span>
                                    Youtube
                                </span>
                            </span>
            </div>
            <input v-model="user.youtube" type="text" class="form-control social" placeholder="Channel URL">
          </div>
          <div class="form-group social-link">
            <div class="social-label-container">
                            <span class="social-label">
                                <font-awesome-icon :icon="['fab', 'facebook']"/>
                                <span>
                                    Facebook
                                </span>
                            </span>
              <span class="input-prepend">
                                facebook.com/
                            </span>
            </div>
            <input v-model="user.facebook" type="text" class="form-control social" placeholder="Enter facebook url">
          </div>
          <div class="form-group social-link">
            <div class="social-label-container">
                            <span class="social-label">
                                <font-awesome-icon :icon="['fab', 'twitch']"/>
                                <span>
                                    Twitch
                                </span>
                            </span>
              <span class="input-prepend">
                                twitch.tv/
                            </span>
            </div>
            <input v-model="user.twitch" type="text" class="form-control social" placeholder="Twitch Username">
          </div>
          <div class="form-group social-link">
            <div class="social-label-container">
                            <span class="social-label">
                                <font-awesome-icon :icon="['fab', 'tiktok']"/>
                                <span>TikTok</span>
                            </span>
              <span class="input-prepend">
                                tiktok.com/
                            </span>
            </div>
            <input v-model="user.tiktok" type="text" class="form-control social" placeholder="TikTok Username">
          </div>
          <div class="form-group social-link">
            <div class="social-label-container">
                            <span class="social-label">
                                <font-awesome-icon :icon="['fab', 'snapchat-ghost']"/> <span>Snapchat</span>
                            </span>
            </div>
            <input v-model="user.snapchat" type="text" class="form-control social" placeholder="Snapchat Username">
          </div>
        </div>
        <button type="submit" class="submit">
          Save Changes
        </button>
      </form>
    </div>
  </div>
</template>

<script>
// import userProfile from '@/UserProfile.json'
import ImageUpload from '@/components/ImageUpload'

export default {
  components: {ImageUpload},
  data() {
    return {
      user: {
        username: '',
        name: '',
        email: '',
        bio: '',
        profileImage: null,
        coverImage: null,
        lang: '',
        followerCount: 10,
        followingCount: 10,
        createdAt: 1631731957,
        social: {
          website: '',
          discord: '',
          youtube: '',
          facebook: '',
          twitch: '',
          tiktok: '',
          snapchat: ''
        }
      },
      usernameExists: null
    }
  },
  created() {
    // this.user = userProfile
  },
  methods: {
    saveProfile() {
      console.log('Saving profile...', this.user)
    },
    profileImageChanged(image) {
      console.log('Profile image changed:', image)
    },
    coverImageChanged(image) {
      console.log('Cover image changed:', image)
    },
    checkUsernameAvailability() {
      console.log('Checking username availability...')
      if (this.user.username) {
        this.usernameExists = true
      }
      else {
        this.usernameExists = false
      }
    },
    getBioLength() {
      return this.user.bio.length
    }
  },




}
</script>

<style scoped>
.profile-route {
  background-image: url('~@/assets/images/bg-pattern.png');
  background-size: contain;
  background-position: 75vw 40vh;
  background-attachment: fixed;
  background-repeat: no-repeat;
  padding: 2rem 0;
}

.route-title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.container {
  padding: 2rem 1rem;
  width: 95%;
  max-width: 740px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0px 0px 15px 4px rgba(0, 0, 0, 0.15);
}

h3 {
  font-weight: bold;
}

.form-group {
  position: relative;
  margin: 0;
  background-color: #e0e0e0;
  box-shadow: rgb(230, 230, 230) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.05) 0px 10px 20px;
  width: 100%;
  border-radius: 10px;
}

.input-label {
  display: none;
  position: absolute;
  top: 6px;
  left: 20px;
  font-size: 0.625rem;
}

.input-label.show {
  display: block;
}

.form-control {
  margin-bottom: 0;
  margin-left: auto;
  padding: 2px 20px 0;
  min-height: 60px;
  border-radius: 10px;
  width: 100%;
}

.form-control:focus {
  outline: none !important;
  box-shadow: rgb(0, 0, 0) 0px 0px 0px 2px inset, rgba(0, 0, 0, 0.1) 0px 10px 20px !important;
  border: none;
}

.image-upload-description {
  font-weight: bold;
  margin: 2rem 0;
}

.username-input {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px;
  border-radius: 10px;
  background-color: #e0e0e0;
}

.username-icon-container {
  background-color: #e0e0e0;
  color: #7F7F7F;
  display: flex;
  align-items: center;
  min-height: 60px;
  padding: 0 20px;
  font-size: 18px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.username-available,
.username-taken {
  margin-top: 0.25rem;
  padding: 0.15rem 0.5rem;
  font-weight: bold;
  border-radius: 0.25rem;
  display: block;
}

.username-available {
  background: #e4f9f0;
  color: #6fcd97;
}

.username-taken {
  background: #f8d7da;
  color: #8b3f46;
}

.form-group.email,
.form-control.bio {
  margin-top: 1rem;
}

.form-control.bio {
  height: 288px;
  width: 100%;
  padding: 24px 20px;
  box-shadow: rgb(230, 230, 230) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.05) 0px 10px 20px;
}

.bio-length {
  display: block;
  font-size: 0.75rem;
  color: #7F7F7F;
  text-align: right;
}

.social-links-title {
  margin-bottom: 1rem;
}

.social-label-container {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.social-label {
  font-weight: bold;
  font-size: 18px;
}

.social-label span {
  margin-left: 0.25rem;
}

.input-prepend {
  color: #7F7F7F;
  font-weight: normal;
}

.submit {
  width: 100%;
  margin-top: 2rem;
  border: 0;
  background: #000;
  color: #fff;
  padding: 1rem 2rem;
  font-weight: bold;
  border-radius: 15px;
}

.social-link + .social-link {
  margin-top: 1rem;
}

.personal-details,
.bio-section,
.social-links {
  margin-top: 2rem;
}

@media screen and (min-width: 768px) {
  .container {
    padding: 32px 48px;
  }

  .img-upload {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .personal-details,
  .bio-section {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .form-group,
  .form-control.bio {
    width: 326px;
  }

  .form-group.username {
    width: 268px;
  }

  .social-link {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .social-label-container {
    width: 100%;
  }

  .social-label {
    display: flex;
    align-items: center;
  }

  .social-label svg {
    width: 24px;
    height: 24px;
  }

  .personal-details,
  .bio-section,
  .social-links {
    margin-top: 3rem;
  }
}
</style>

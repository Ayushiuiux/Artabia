<template>
  <div class="footer-bar">
    <div class="container">
      <div class="logo-container">
        <img :src="require('@/assets/images/logo.svg')" alt="Artabia Logo">
      </div>
      <div class="footer-col">
        <router-link to="">How it works</router-link>
        <router-link to="">Subscribe to our newsletter</router-link>
        <form @click.prevent="">
          <b-input-group append="OK">
            <b-form-input placeholder="Email adress"/>
          </b-input-group>
        </form>
      </div>
      <ul class="footer-col">

        <li v-for="menu in menus" :key="menu.id">
          <router-link :to="menu.slug">{{ menu.name }}</router-link>
        </li>


      </ul>
      <ul class="footer-col">
        <li v-for="(social,index) in socials" :key="index" v-if="social.active">
          <a target="_blank" :href="social.url">
            <font-awesome-icon :icon="['fab', social.name]" size="lg"/>
            {{social.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {


  data() {
    return {
      menus: [],
      socials: {},
    }
  },
  //TODO: να δω πως α τα κανω global
  async created() {
    this.menus = [
      {
        id: 1, name: "Contact Us", slug: "/contact",
      }, {
        id: 2, name: "Terms & conditions", slug: "/terms",
      },
      {
        id: 3, name: "About Us", slug: "/about",
      },
      {
        id: 4, name: "Privacy Policy", slug: "/privacy",
      }
    ]


    try {
      const {data} = await this.axios.get(`${this.$cms}/socials`);
       this.socials = data;

    } catch (e) {
      console.log(e)
    }



  }


}
</script>

<style scoped>
.footer-bar {
  width: 100%;
  background: #2b2c2c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo-container {
  margin: 2rem auto 1rem;
  position: relative;
  max-width: 250px;
}

.logo-container img {
  width: 100%;
}

.footer-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-col + .footer-col {
  margin-top: 2rem;
}

.footer-col > * {
  margin-top: 0.25rem;
}

.footer-col:last-child {
  margin-bottom: 2rem;
}

.footer-col a {
  color: #e4ccbd;
}

.input-group-text {
  background: #8575c6;
  border: 1px solid #8575c6;
  border-top-right-radius: 0.25rem !important;
  border-bottom-right-radius: 0.25rem !important;
  color: #fff;
}

@media screen and (min-width: 992px) {
  .container {
    width: 90%;
    max-width: 1350px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-container {
    margin: 0;
    position: relative;
    max-width: 250px;
  }

  .footer-col > * {
    margin-top: 0.5rem;
  }
}

</style>

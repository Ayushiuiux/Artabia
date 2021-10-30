<template>
  <div class="home">
    <section class="hero-section" :style="cssProps">
      <div class="container hero-container">
        <div class="hero-info">
          <h1 class="hero-title">Bringing together artists from the entire <span>MENA</span> region</h1>
          <h3 class="hero-subtitle">To Explore, Collect, & Trade NFTs</h3>
          <div class="cta-btn">
            Explore Marketplace
          </div>
        </div>
        <div class="hero-image">
          <img :src="require('@/assets/images/hero-image.png')" alt="arrow up">
          <div class="container get-featured">
            <div class="flex justify-center">
              <figure class="flex items-center home_featured">
                <b-link href="/contact" class="home_featured_link">
                  Get featured on the homepage
                  <img :src="require('@/assets/images/icons/up-arrow-icon.png')" alt="arrow up">
                </b-link>
              </figure>
            </div>
          </div>
        </div>
      </div>      
    </section>
    <section class="trending-section">
      <div class="container">
        <div class="collection-header flex-col md:flex-row">
          <img :src="require('@/assets/images/icons/trending-icon.png')" alt="trending icon" class="collection-avatar">
          <span class="collection-title">Trending</span>
          <div class="collection-tags">
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/hourglass-icon.png')"
                alt="timed auctions icon"
                class="tag-avatar"
              >
              <span>Timed Auctions</span>
            </div>
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/infinity-icon.png')"
                alt="open for bids icon"
                class="tag-avatar"
              >
              <span>Open for bids</span>
            </div>
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/price-tag-icon.png')"
                alt="Fixed Price icon"
                class="tag-avatar"
              >
              <span>Fixed Price</span>
            </div>
          </div>
        </div>
        <div class="collection-body">
          <item-card v-for="card in cards"
                     :key="card.id"
                     :card="card"
                     leftSideTextBottom="0,1 ETH"
                     leftSideTextTop="Current bid"/>
        </div>
      </div>
    </section>
    <section class="explore-section">
      <div class="container">
        <div class="collection-header md:flex-row flex flex-col">
          <div class="flex space-x-2">
            <img :src="require('@/assets/images/icons/explore-icon.png')" alt="explore icon" class="collection-avatar">
            <span class="collection-title">Explore</span>
          </div>
          <div class="collection-tags  ">
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/tag-icon.png')"
                alt="all nfts"
                class="tag-avatar explore-tag"
              >
              <span>All NFTs</span>
            </div>
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/tag-icon.png')"
                alt="artwork"
                class="tag-avatar explore-tag"
              >
              <span>Artwork</span>
            </div>
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/tag-icon.png')"
                alt="photography"
                class="tag-avatar explore-tag"
              >
              <span>Photography</span>
            </div>
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/tag-icon.png')"
                alt="audio"
                class="tag-avatar explore-tag"
              >
              <span>Audio</span>
            </div>
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/tag-icon.png')"
                alt="video"
                class="tag-avatar explore-tag"
              >
              <span>Video</span>
            </div>
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/tag-icon.png')"
                alt="collectibles"
                class="tag-avatar explore-tag"
              >
              <span>Collectibles</span>
            </div>

          </div>
        </div>
        <div class="collection-body">
          <item-card v-for="card in cards"
                     :key="card.id"
                     :card="card"
                     leftSideTextBottom="0,1 ETH"
                     leftSideTextTop="Current bid"/>
        </div>
      </div>
    </section>
    <section class="top-creators-section">
      <div class="container">
        <div class="collection-header">
          <img :src="require('@/assets/images/icons/top-creators-icon.png')" alt="top-creators icon"
               class="collection-avatar">
          <span class="collection-title">Top Creators</span>
          <div class="collection-tags">
            <div class="collection-tag view-all">
              View all creators
              <font-awesome-icon :icon="['fas', 'arrow-right']" size="lg" class="arrow-right"/>
            </div>
          </div>
        </div>
        <div class="collection-body">
          <profile-card v-for="user in users" :key="user.id" :user="user"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ItemCard from '@/components/ItemCard'
import ProfileCard from '@/components/ProfileCard'
import cards from '@/cards.json'
import users from '@/UserProfiles.json'

export default {
  components: {
    ItemCard, ProfileCard
  },
  // props: {
  //   loading: Object,
  // },
  data() {
    return {
      cards: null,
      users: null,
      cssProps: {
        backgroundImage: ''
      }
    }
  },
  async created() {
    this.cards = cards
    this.users = users

   const aChain = 'binance testne';
     await im.connect(aChain);

    this.im = im

    const info = await fetch(`${BACKEND_URL}/order/trending`).then(res => res.json());
    console.log("info",info);

    for(var i=0; i<info.orders.length;i++){
      const results = await Promise.all([
      // im.contracts.erc1155AuctionMarketplace.getAuction(info[5]),
      // im.contracts.erc1155ListingMarketplace.getListing(info[5]),
      im.contracts.erc1155OrderMarketplace.getOrder(info.orders[i]),
      // im.contracts.erc721AuctionMarketplace.getAuction(info[5]),
      // im.contracts.erc721ListingMarketplace.getOrder(info.orders),
      im.contracts.erc721OrderMarketplace.getOrder(info.orders[i]),
    ])

    }

    
    console.log('result',results);

    




    try {
      const {data} = await this.axios.get(`${this.$cms}/background`);

      this.cssProps.backgroundImage = `url(${this.$cms}${data.file.url})`;

    } catch (e) {
      console.log(e)
    }


  },



}
</script>

<style scoped>
section + section {
  margin-top: 2rem;
}

section:last-child {
  margin-bottom: 2rem;
}

.hero-section {
  width: 100%;
  /*background-image: url(http://localhost:1337/uploads/organizers_33657ce425.jpg);*/
  /*background-image: url('~@/assets/images/hero-bg.jpg');*/
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  width: 95%;
  margin: 0 auto;
}

.hero-container {
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-info {
  text-align: center;
}

.hero-title {
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
}

.hero-title span {
  color: #8575c6;
}

.hero-subtitle {
  margin-top: 1rem;
  font-size: 1rem;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.cta-btn {
  margin-top: 1.5rem;
  background: #988bc2;
  background: linear-gradient(to right, #e2c4b5, #988bc2) !important;
  border-radius: 4px;
  color: #fff;
  padding: 0.25rem 0;
  cursor: pointer;
}

.hero-image {
  margin-top: 2rem;
  max-width: 400px;
}

.hero-image img {
  width: 100%;
  height: auto;
}

.get-featured {
  margin-top: 2rem;
  text-align: center;
}

.get-featured h3 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #8575c6;
}

.get-featured img {
  margin-left: 0.3rem;
  width: 1.25rem;
  height: auto;
}

.collection-header {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e2e2;
}

.collection-title {
  font-size: 2rem;
  font-weight: bold;
}

.collection-avatar {
  width: 3rem;
}

.collection-tags {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
}

.collection-tag {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e2e2e2;
  text-align: center;
  padding: 0.15rem 0.5rem;
  cursor: pointer;
}

.collection-tag + .collection-tag {
  margin-top: 1rem;
}

.tag-avatar {
  height: 2.5rem;
  width: auto;
}

.explore-tag {
  height: 2rem;
}

.collection-tag .arrow-right {
  margin-left: 0.5rem;
  color: #8575c6;
}

.collection-body {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  grid-gap: 0.5rem;
  align-items: center;
}

.card {
  margin: auto;
}

.home_featured .home_featured_link {
  color: #8575c6 !important;
  text-decoration: none !important;
  display: flex;
}

@media screen and (min-width: 768px) {
  .collection-tags {
    justify-content: center;
    flex-flow: row wrap;
    flex-grow: 1;
  }

  .collection-tag {
    width: initial;
    flex-direction: row;
    padding: 0.25rem 0.75rem;
  }

  .tag-avatar {
    margin-right: 0.5rem;
  }

  .collection-tag + .collection-tag {
    margin-top: 0;
    margin-left: 1rem;
  }

  .collection-tag.view-all {
    padding: 0.75rem 1rem;
  }

}

@media screen and (min-width: 992px) {
  .container {
    max-width: 1250px;
  }

  .collection-header {
    max-width: 1140px;
    width: 100%;
  }

  .hero-section {
    height: auto;
    background-size: cover;
  }

  .hero-container {
    margin-top: 5%;
    flex-direction: row;
    justify-content: space-around;
  }

  .cta-btn {
    max-width: 230px;
    margin: 0 auto;
    margin-top: 1.5rem;
  }

  .hero-image {
    margin-top: 0;
    margin-left: 2rem;
    max-width: 400px;
  }

  .get-featured {
    margin-top: 2rem;
    text-align: end;
    padding-right: 2rem;
  }

  .collection-tags {
    justify-content: flex-end;
  }

  .collection-tag {
    padding: 0.25rem 0.75rem;
  }

  .collection-body {
    max-width: 1150px;
    margin: 1.5rem auto;
  }
}

</style>

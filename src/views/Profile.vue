<template>
  <div>
    <div class="container">
      <profile-sidebar/>
      <div class="collection-container">
        <div class="collection-header">
          <span>On sale</span>
          <span>Created</span>
          <span>Activity</span>
          <span>Owned</span>
        </div>
        <div class="collection-body">
          <item-card v-for="card in cards" :key="card.id" :card="card"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileSidebar from '@/components/ProfileSidebar'
import ItemCard from '@/components/ItemCard'
import cards from '@/cards.json'

export default {
  components: {ProfileSidebar, ItemCard},
  data() {
    return {
      cards: null
    }
  },
  created() {
    this.cards = cards.slice(0, 6)
  },


}
</script>

<style scoped>
.container {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.collection-container {
  width: 100%;
  padding: 2rem 0;
}

.collection-header {
  color: #44484b;
  font-weight: bold;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #d8d8d8;
  padding-bottom: 1rem;
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

@media screen and (min-width: 992px) {
  .container {
    max-width: 1300px;
    flex-direction: row;
  }

  .collection-container {
    margin-left: 3rem;
    width: 70%;
  }

  .collection-header {
    max-width: 860px;
    margin: 0 auto;
  }

  .collection-body {
    max-width: 870px;
    margin: 1.5rem auto 0;
  }

}
</style>

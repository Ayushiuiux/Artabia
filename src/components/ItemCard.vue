<template>
  <b-card
    v-if="card"
    :title="card.title"
    :img-src="card.cardImg"
    :img-alt="card.title"
    img-top
    tag="article"
    class="mb-2"
  >
    <b-card-text class="flex space-x-3 items-center">
      <img :src="card.user.avatar" alt="" class="user-avatar">
      <span>@ {{ card.user.name }}</span>
    </b-card-text>
    <template #footer>
      <div class="footer-slot">
        <div class="price price flex justify-between px-3 py-2.5 items-center">
          <span class="flex flex-col text-left">
            <span :class="leftSideTextTopClass">{{leftSideTextTop}}</span>
            <span>{{leftSideTextBottom}}</span>
          </span>

          <span v-if="rightSide" class="flex flex-col text-left">
            <span>Ending in</span>
            <span>0 d , 0 h m , 0 s</span>
          </span>
        </div>
      </div>
    </template>
  </b-card>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    card: {
      type: Object,
      required: true,

    },

    rightSide:{
      type: Boolean,
      default: true,
    },

    leftSideTextTop:String,
    leftSideTextTopClass:String,
    leftSideTextBottom:String,

  }
}
</script>

<style scoped>
.card {
  max-width: 270px;
  box-shadow: 0px 25px 51px -35px rgba(0, 0, 0, 0.63);
  border-radius: 11px;
}

.card-img-top {
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
}

.user-avatar {
  border-radius: 50%;
}

.card-text span {
  margin-left: 0.5rem;
}

.card-footer {
  padding: 0;
  font-weight: bold;
  border-bottom-left-radius: 11px;
  border-bottom-right-radius: 11px;
}

.footer-slot {
  display: flex;
  align-items: center;
  border-bottom-left-radius: 11px;
}

.view-btn {
  background-color: #7259cb;
  border-bottom-left-radius: 11px;
  color: #fff;
  padding: 0.65rem 1.5rem;
  font-size: 1.25rem;
}

.price {
  display: block;
  width: 100%;
  text-align: center;
  color: #7259cb;
  font-weight: bold;
  font-size: 0.9rem;
}
</style>

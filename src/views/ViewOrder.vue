<template>
  <section class="max-w-7xl mx-auto my-5 px-5 md:px-16 xl:px-0 lg:space-x-10 flex  flex-col lg:flex-row">
    <div class="flex-1 space-y-3 mb-10 sm:mb-0">


      <Media :src="src"/>


      <div class="space-y-4">
        <div class="flex justify-between flex-col lg:flex-row ">

          <ul class="grid grid-cols-1 gap-0.5 ">
            <li class="font-semibold ">{{ fixed ? 'Price' : open ? 'Current offer' : 'Current bid' }}:</li>
            <li class="flex items-center space-x-2 mb-2">
              <div class="font-semibold text-lg">{{ ethValue }} ETH</div>
              <div class="text-sm">~${{ parseInt(ethValue) * parseInt(ethPrice) }}</div>
            </li>
          </ul>

          <ul class="flex flex-col items-center lg:mt-0">
            <li class="font-semibold lg:text-center">Owned By</li>
            <li class="font-semibold text-gray-700 flex lg:space-x-2 items-center">
              <img class="h-8 rounded-full hidden lg:block" src="https://placeimg.com/100/100/any" alt="">
              <span>{{ owner }}</span>
            </li>
          </ul>

        </div>
        <button class="artabia-dark-color w-full text-white py-3 font-semibold rounded py-1" @click="openPop">{{ fixed ? 'Buy' : open ? 'Place an offer' : 'Place a bid' }}</button>
        <button v-if="!im || im.account.toLowerCase() == ownerAddress.toLowerCase()" class="artabia-dark-color-text w-full bg-white py-3 font-semibold rounded py-1" @click="accept">Accept highest offer</button>
        <div class="flex justify-between">
          <div class="flex">
            <span class="artabia-dark-text">{{ amount }} in stock</span>
            <div class="ml-4" v-if="timeToGo">Ends in {{ timeToGo }}</div>
          </div>
          <div class="flex space-x-3">
            <export class="artabia-dark-color-hover cursor-pointer"/>
            <report class="artabia-dark-color-hover cursor-pointer"/>
          </div>
        </div>
      </div>

    </div>

    <div class="flex-2">

      <div class="mb-2">
        <p class="font-bold text-lg">Title</p>
        <p class="p-2 border-b">{{ title }}</p>
      </div>

      <div>
        <p class="font-bold text-lg">Description</p>
        <p class="p-2 border-b">{{ description }}</p>
      </div>

      <div>
        <p class="font-bold text-lg">Chain</p>
        <p class="p-2 border-b">{{ chain[0].toUpperCase() + chain.substr(1) }}</p>
      </div>

      <div>
        <p class="font-bold text-lg">Token Address</p>
        <p class="p-2 border-b">{{ address }}</p>
      </div>

      <div>
        <p class="font-bold text-lg">Token ID</p>
        <p class="p-2 border-b">{{ id }}</p>
      </div>

      <section
        class="flex mt-10 space-y-10 xl:space-y-0 space-x-0 xl:space-x-8 divide-solid xl:divide-x flex-col xl:flex-row"
      >

        <ul class="flex-1 ">
          <li class="font-bold text-3xl mb-3">Item Details</li>
          <li class="flex  items-center">
            <p class="font-semibold">Category:&nbsp;</p>
            <p class="text-gray-600">{{ category }}</p>
          </li>
          <li class="flex  items-center">
            <p class="font-semibold">Royalty:&nbsp;</p>
            <p class="text-gray-600">{{ royalty }}</p>
          </li>
          <li class="flex  items-center">
            <p class="font-semibold">Unlockable item:&nbsp;</p>
            <p class="text-gray-600">{{ hasUnlockable }}</p>
          </li>
        </ul>

        <div class="flex-1 sm:pl-4 lg:pl-5">
          <ul>
            <li class="font-bold text-3xl">History</li>
            <li
              v-for="(h, i) in history"
              :key="i"
              class="flex mb-4 mt-3 space-x-2 items-center justify-between  p-2 border-gray-400 border rounded my-2 hover:scale-105 transform transition-all cursor-pointer"
            >

              <div class="flex  space-x-4">
                <figure>
                  <img class="rounded-full " src="https://placeimg.com/30/30/any" alt="">
                </figure>
                <div class="text-sm">
                  <p class="mb-1 p-0"><span class="font-semibold">Offer placed by</span> <span class="text-gray-600">{{ h.offeror.substr(0, 12) }}</span>
                  </p>
                  <p class="text-gray-600">{{ h.time.toISOString().split('T')[0] }}</p>
                </div>
              </div>

              <div class="flex space-x-3">
                <div>
                  <p class="mb-1 p-0 font-semibold">{{ im.web3.utils.fromWei(h.offer, 'ether').substr(0, 4) }} {{ chain == 'ethereum' ? 'ETH' : 'BNB' }}</p>
                </div>
                <div class="flex items-center">
                  <export class="text-gray-500  hover:text-primary"/>
                </div>
              </div>

            </li>
          </ul>
        </div>
      </section>

    </div>

    <modal :show="showModal" :max-width="maxWidth" @close="close">

      <div class="px-6 py-4 artabia-dark-color text-white text-center relative">

        <slot name="title">
          {{ fixed ? 'Buy' : open ? 'Place an offer' : 'Place a bid' }}
          <!--                    <close class="cursor-pointer absolute top-1/3 right-2" @click="close" />-->
        </slot>

      </div>

      <div class="px-6 ">
        <div class="mt-4">

          <slot name="content">

            <p class="text-gray-500 text-center"> {{ fixed ? 'You are about to buy' : open ? 'You are about to place an offer for' : 'You are about to place a bid for' }} <span
              class="text-black font-semibold"
            >{{ title }}</span> by {{ owner }}</p>

            <ul class="space-y-3 mb-5">
              <div v-if="limited || open">
                <li>
                  <text-input :label="limited ? 'Your bid' : 'Your offer'" :placeholder="'e.g 0.5' + chain == 'ethereum' ? 'ETH' : 'BNB'" :name="chain == 'ethereum' ? 'ETH' : 'BNB'" v-model="modelInput" @keyup.native="calcServiceFee"/>
                </li>
                <li class="text-gray-500">Must be greater than {{ ethValue }} {{ chain == 'ethereum' ? 'ETH' : 'BNB' }}</li>
              </div>
              <li class="flex justify-between  items-center">
                <p class="text-gray-500">Your balance</p>
                <p class="font-semibold">{{ balance }} {{ chain == 'ethereum' ? 'ETH' : 'BNB' }}</p>
              </li>
              <li v-if="fixed" class="flex justify-between  items-center">
                <p class="text-gray-500">Price</p>
                <p class="font-semibold">{{ ethValue }} {{ chain == 'ethereum' ? 'ETH' : 'BNB' }}</p>
              </li>
              <li class="flex justify-between  items-center">
                <p class="text-gray-500">Gas fee</p>
                <p class="font-semibold">~{{ txFees.slice(0, -9) || 0 }} {{ chain == 'ethereum' ? 'ETH' : 'BNB' }}</p>
              </li>
              <li class="flex justify-between  items-center">
                <p class="text-gray-500">You will pay</p>
                <p class="font-semibold">~{{ (parseFloat(fixed ? ethValue : (modelInput || 0)) + parseFloat(txFees) || 0).toFixed(2) }} ETH</p>
              </li>
            </ul>

          </slot>

        </div>
      </div>

      <div class="px-6 py-4 bg-gray-100 text-center ">

        <slot name="footer">
          <button class="artabia-dark-color px-10 py-2 rounded-xl text-white" @click="cta">{{ fixed ? 'Buy' : open ? 'Place an offer' : 'Place a bid' }}</button>
        </slot>

      </div>
    </modal>

  </section>

</template>


<script>

import Modal from '@/components/Modal'
import TextInput from '@/components/TextInput'
import Close from '@/components/svg/Close'
import Export from '@/components/svg/Export'
import Report from '@/components/svg/Report'
import Media from "../components/Media"
import tokenUriAbi from './tokenUriAbi'

function timeToGo(d) {
    // Utility to add leading zero
    function z(n) {
      return (n < 10? '0' : '') + n;
    }

    var diff = d - new Date();

    // Allow for previous times
    var sign = diff < 0? '-' : '';
    diff = Math.abs(diff);

    // Get time components
    var hours = diff/3.6e6 | 0;
    var mins  = diff%3.6e6 / 6e4 | 0;
    var secs  = Math.round(diff%6e4 / 1e3);

    // Return formatted string
    return sign + z(hours) + 'h ' + z(mins) + 'm ' + z(secs) + 's';
}

export default {
  emits: [ 'close' ],

  components: {
    Media,
    Report,
    Export,
    Close,
    TextInput,
    Modal
  },

  props: {
    show: {
      default: false
    },
    maxWidth: {
      default: '2xl'
    }
  },

  data() {
    return {
      showModal: this.show,
      src: '',
      title: '',
      description: '',
      id: '',
      address: '',
      hasUnlockable: '',
      royalty: '',
      amount: '',
      category: '',
      fixed: false,
      limited: false,
      open: false,
      multiple: false,
      single: false,
      ethValue: '',
      ethPrice: '',
      balance: '',
      contract: null,
      txFees: '',
      waitTime: '',
      modelInput: '',
      aChain: '',
      timeToGo: '',
      owner: '',
      im: null,
      history: [],
      ownerAddress: ''
    }
  },

  async created() {
    const loader = this.$loading.show({
      container: null,
      canCancel: false
    })
    const { chain,  order: orderId } = this.$route.params

    this.orderId = orderId

    const aChain = chain == 'ethereum' ? 'rinkeby' : 'binance testnet'

    this.chain = chain

    this.aChain = aChain

    const web3 = window[chain + 'Node']

    if(!web3) this.$router.push('/')

    await im.connect(aChain);

    this.im = im

    const results = await Promise.all([
      im.contracts.erc1155AuctionMarketplace.getAuction(orderId),
      im.contracts.erc1155ListingMarketplace.getListing(orderId),
      im.contracts.erc1155OrderMarketplace.getOrder(orderId),
      im.contracts.erc721AuctionMarketplace.getAuction(orderId),
      im.contracts.erc721ListingMarketplace.getListing(orderId),
      im.contracts.erc721OrderMarketplace.getOrder(orderId),
    ])

    if(results[0]) {
      this.limited = this.multiple = true
      this.contract = im.contracts.erc1155AuctionMarketplace
    } else if(results[1]) {
      this.open = this.multiple = true
      this.contract = im.contracts.erc1155ListingMarketplace

      this.history = await this.contract.getListingOffers(orderId).then(history => history.reverse())
    } else if(results[2]) {
      this.fixed = this.multiple = true
      this.contract = im.contracts.erc1155OrderMarketplace
    } else if(results[3]) {
      this.limited = this.single = true
      this.contract = im.contracts.erc721AuctionMarketplace
    } else if(results[4]) {
      this.open = this.single = true
      this.contract = im.contracts.erc721ListingMarketplace
    } else if(results[5]) {
      this.fixed = this.single = true
      this.contract = im.contracts.erc721OrderMarketplace
    }

    const order = results.filter(r => r)[0]

    if(!order) this.$router.push('/')

    console.log(order.tokenId)

    const uriContract = new web3.eth.Contract(tokenUriAbi, order.tokenAddress)

    const tokenUri = this.single ? await uriContract.methods.tokenURI(order.tokenId).call() : await uriContract.methods.uri(order.tokenId).call().then(uri => uri.replace('{id}', order.tokenId))

    const metadata = await fetch(tokenUri).then(res => res.json())

    const displayInfo = await fetch(`${BACKEND_URL}/order/${orderId}/display-info`).then(res => res.json())

    this.owner = order.owner.substr(0, 12)
    this.ownerAddress = order.owner


    this.title = metadata.name
    this.description = metadata.description
    this.src = metadata.image
    this.address = order.tokenAddress
    this.id = web3.utils.toHex(order.tokenId)
    this.hasUnlockable = displayInfo.unlockable ? 'Yes' : 'No'
    this.category = displayInfo.category
    this.royalty = displayInfo.royalty + '%'

    this.amount = order.tokenQty || 1;

    const ethValueInWei = this.fixed ? order.price : (this.open ? order.offer : order.bid)

    this.ethValue = web3.utils.fromWei(
      ethValueInWei,
      'ether'
    )

    this.ethPrice = await getEthPrice()


    if(this.limited) {
      this.timeToGo = timeToGo(new Date(parseInt(order.endsAt) * 1000))
      setInterval(() => {
        this.timeToGo = timeToGo(new Date(parseInt(order.endsAt) * 1000))
      }, 1000)
    }

    console.log(order, metadata, displayInfo)
    loader.hide()
  },

  methods: {
    close() {
      this.showModal = false
    },

    async accept() {
      const loader = this.$loading.show({
        container: null,
        canCancel: false
      })

      await this.im.contracts.erc1155ListingMarketplace.acceptListingOffer(this.orderId)

      loader.hide()

      this.$router.go(this.$router.currentRoute)
    },

    async openPop() {
      try {
        await this.calcServiceFee()
        this.showModal = true
      } catch (err) {
        alert(err.message
        )
      }
    },

    async calcServiceFee() {
      this.balance = im.web3.utils.fromWei(await im.web3.eth.getBalance(im.account)).slice(0, -16) || '0'
      try {
        let obj
        if(this.fixed) {
          obj = await this.contract.buyOrderGasEstimation(this.orderId)
        } else if(this.open) {
          obj = await this.contract.placeOfferGasEstimation(this.orderId, this.modelInput)
        } else if(this.limited) {
          obj = await this.contract.bidOnAuctionGasEstimation(this.orderId, this.modelInput)
        }
        this.txFees = obj.txFees
        this.waitTime = obj.waitTime
      } catch (error) {
        this.txFees = ''
        this.waitTime = ''
      }
    },

    async cta() {
      const loader = this.$loading.show({
        container: null,
        canCancel: false
      })

      try {
        if(this.fixed) {
          await this.contract.buyOrder(this.orderId)
        } else if(this.open) {
          await this.contract.placeOffer(this.orderId, this.modelInput)
        } else if(this.limited) {
          await this.contract.bidOnAuction(this.orderId, this.modelInput)
        }
      } catch(error) {
        alert(error.message)
      }
      loader.hide()

      this.$router.go(this.$router.currentRoute)
    }
  }
}

</script>

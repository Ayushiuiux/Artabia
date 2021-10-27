import {
  ArtabiaERC1155,
  ArtabiaERC721,
  ERC1155AuctionMarketplace,
  ERC1155ListingMarketplace,
  ERC1155OrderMarketplace,
  ERC721AuctionMarketplace,
  ERC721ListingMarketplace,
  ERC721OrderMarketplace,
  IntegrationManager
} from "integration";
import Vue from "vue";

const Web3 = require('web3')

const Moralis = require('moralis')

export default {

  data() {
    return {
      cms: "http://localhost:1337",
      featured: {},
    }
  },

  async created() {

    window.im = new IntegrationManager([
      [ ERC721OrderMarketplace, '0xa0bec043db848b1bb53a5bf631ef0eea0bebac73', 'erc721OrderMarketplace' ],
      [ ERC721ListingMarketplace, '0x5ddeb941e828a5e8b45e6ab6594c0a09b67a711a', 'erc721ListingMarketplace' ],
      [ ERC721AuctionMarketplace, '0xe29b92b0e451755bf6a2f3f8b0829a4ba1d31286', 'erc721AuctionMarketplace' ],
      [ ERC1155OrderMarketplace, '0xa68828a30ff846f420318a15c990f687e0ce6f9c', 'erc1155OrderMarketplace' ],
      [ ERC1155ListingMarketplace, '0x41b3e8752cd4e5073127125882b754a9fc2c28af', 'erc1155ListingMarketplace' ],
      [ ERC1155AuctionMarketplace, '0x14edd9f2d67e50bc6615e573ae55f4f2a7c6743c', 'erc1155AuctionMarketplace' ],
      [ ArtabiaERC721, '0x2b01c9681c5afd6559bcfdd43bf3680aa90ca955', 'artabiaErc721' ],
      [ ArtabiaERC1155, '0xaed1654fe63fcec92b83faf7a0b9ac1805536c25', 'artabiaErc1155' ]
    ]);

    window.binanceNode = new Web3('https://bsc-dataseed.binance.org')
    window.ethereumNode = new Web3('https://rinkeby.infura.io/v3/77a2efc8c87f46f7aefac25af920ed17')

    window.BACKEND_URL='http://localhost:3000'

    window.ETHERSCAN_KEY='R9ECHH6U5WVVPQJ683W7K96M9MU2Q2VQDC'

    window.getEthPrice = () => fetch('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=' + ETHERSCAN_KEY).then(res => res.json()).then(res => res.result.ethusd.split('.')[0])

    // window.getNftMetadata = (id) => fetch(`${BACKEND_URL}/metadata/${id}.json`).then(response => response.json())

    window.login = async ({ web3, account}) => {
      let message = "Welcome to Artabia!\n\nPlease sign this message to log in"
      let hash = web3.utils.sha3(message)
      let signature = await web3.eth.personal.sign(hash, account)
      
      // await 
    }

    Moralis.initialize("s0BC9Tx6CjezPjpQq7P0oGSlK80rtEMYIaXXIF47");

    Moralis.serverURL = 'https://hmpsdcphxuha.moralishost.com:2053/server'

    window.Moralis = Moralis

    Vue.prototype.$cms = this.cms

    try {
      const {data} = await this.axios.get(`${this.$cms}/global`);

      window.featured = data;

    } catch (e) {
      console.log(e)
    }

  },
  async mounted() {
    document.querySelector(".loading-spinner").classList.add("hidden");
  }
};




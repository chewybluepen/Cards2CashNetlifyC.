export interface Cryptocurrency {
  id: string
  name: string
  symbol: string
  logo: string
  description: string
  category: string[]
}

export const cryptocurrencies: Cryptocurrency[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    logo: "https://img.icons8.com/color/96/000000/bitcoin.png",
    description:
      "The original cryptocurrency that started it all. Bitcoin is a decentralized digital currency without a central bank.",
    category: ["popular", "store-of-value"],
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    logo: "https://img.icons8.com/color/96/000000/ethereum.png",
    description:
      "A decentralized software platform that enables SmartContracts and Distributed Applications to be built and run without downtime.",
    category: ["popular", "smart-contracts"],
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "USDT",
    logo: "https://img.icons8.com/color/96/000000/tether.png",
    description: "A stablecoin pegged to the US dollar, providing stability in the volatile crypto market.",
    category: ["stablecoin"],
  },
  {
    id: "binancecoin",
    name: "Binance Coin",
    symbol: "BNB",
    logo: "https://img.icons8.com/color/96/000000/binance-coin.png",
    description: "The native cryptocurrency of the Binance exchange, used for trading fees and more.",
    category: ["exchange", "smart-contracts"],
  },
  {
    id: "usd-coin",
    name: "USD Coin",
    symbol: "USDC",
    logo: "https://img.icons8.com/color/96/000000/usd-coin.png",
    description:
      "A fully collateralized US dollar stablecoin that is an ERC-20 token issued on the Ethereum blockchain.",
    category: ["stablecoin"],
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    logo: "https://img.icons8.com/color/96/000000/xrp.png",
    description:
      "A digital payment protocol and cryptocurrency that acts as a bridge currency for cross-border payments.",
    category: ["payment"],
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    logo: "https://img.icons8.com/color/96/000000/cardano.png",
    description:
      "A proof-of-stake blockchain platform that aims to enable 'changemakers, innovators and visionaries' to bring about positive global change.",
    category: ["smart-contracts", "proof-of-stake"],
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    logo: "https://img.icons8.com/color/96/000000/solana.png",
    description: "A high-performance blockchain supporting builders around the world creating crypto apps that scale.",
    category: ["smart-contracts", "defi"],
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    logo: "https://img.icons8.com/color/96/000000/dogecoin.png",
    description: "Created as a joke, Dogecoin has become a popular cryptocurrency with a dedicated community.",
    category: ["meme", "payment"],
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    logo: "https://img.icons8.com/color/96/000000/polkadot.png",
    description:
      "An open-source sharded multichain protocol that connects and secures a network of specialized blockchains.",
    category: ["interoperability", "smart-contracts"],
  },
  {
    id: "avalanche-2",
    name: "Avalanche",
    symbol: "AVAX",
    logo: "https://img.icons8.com/color/96/000000/avalanche.png",
    description: "An open, programmable smart contracts platform for decentralized applications.",
    category: ["smart-contracts", "defi"],
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "LINK",
    logo: "https://img.icons8.com/color/96/000000/chainlink.png",
    description: "A decentralized oracle network that provides real-world data to smart contracts on the blockchain.",
    category: ["oracle", "defi"],
  },
  {
    id: "litecoin",
    name: "Litecoin",
    symbol: "LTC",
    logo: "https://img.icons8.com/color/96/000000/litecoin.png",
    description: "A peer-to-peer cryptocurrency that enables instant, near-zero cost payments to anyone in the world.",
    category: ["payment"],
  },
  {
    id: "bitcoin-cash",
    name: "Bitcoin Cash",
    symbol: "BCH",
    logo: "https://img.icons8.com/color/96/000000/bitcoin-cash.png",
    description: "A fork of Bitcoin with a larger block size, aiming to be more useful for everyday transactions.",
    category: ["payment"],
  },
  {
    id: "stellar",
    name: "Stellar",
    symbol: "XLM",
    logo: "https://img.icons8.com/color/96/000000/stellar.png",
    description:
      "An open network for storing and moving money that makes it possible to create, send, and trade digital representations of all forms of money.",
    category: ["payment", "defi"],
  },
  {
    id: "wrapped-bitcoin",
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    logo: "https://img.icons8.com/color/96/000000/wrapped-bitcoin.png",
    description:
      "A tokenized version of Bitcoin that runs on the Ethereum blockchain, allowing BTC to be used in DeFi applications.",
    category: ["defi", "wrapped"],
  },
  {
    id: "uniswap",
    name: "Uniswap",
    symbol: "UNI",
    logo: "https://img.icons8.com/color/96/000000/uniswap.png",
    description:
      "A popular decentralized trading protocol, known for its role in facilitating automated trading of decentralized finance tokens.",
    category: ["defi", "exchange"],
  },
  {
    id: "algorand",
    name: "Algorand",
    symbol: "ALGO",
    logo: "https://img.icons8.com/color/96/000000/algorand.png",
    description:
      "A self-sustaining, decentralized, blockchain-based network that supports a wide range of applications.",
    category: ["smart-contracts", "proof-of-stake"],
  },
  {
    id: "polygon",
    name: "Polygon",
    symbol: "MATIC",
    logo: "https://img.icons8.com/color/96/000000/polygon.png",
    description: "A protocol and a framework for building and connecting Ethereum-compatible blockchain networks.",
    category: ["scaling", "defi"],
  },
  {
    id: "vechain",
    name: "VeChain",
    symbol: "VET",
    logo: "https://img.icons8.com/color/96/000000/vechain.png",
    description:
      "A blockchain platform designed to enhance supply chain management and business processes through distributed ledger technology.",
    category: ["enterprise", "supply-chain"],
  },
]

// Mock price data
export const cryptoPrices: Record<
  string,
  {
    price: number
    change24h: number
    marketCap: number
    volume24h: number
    circulatingSupply: number
    allTimeHigh: number
    allTimeHighDate: string
  }
> = {
  bitcoin: {
    price: 50000,
    change24h: 2.5,
    marketCap: 1000000000000,
    volume24h: 30000000000,
    circulatingSupply: 19000000,
    allTimeHigh: 69000,
    allTimeHighDate: "2021-11-10",
  },
  ethereum: {
    price: 3000,
    change24h: 3.2,
    marketCap: 500000000000,
    volume24h: 20000000000,
    circulatingSupply: 120000000,
    allTimeHigh: 4800,
    allTimeHighDate: "2021-11-08",
  },
  tether: {
    price: 1,
    change24h: 0.1,
    marketCap: 100000000000,
    volume24h: 80000000000,
    circulatingSupply: 100000000000,
    allTimeHigh: 1.1,
    allTimeHighDate: "2018-07-24",
  },
  binancecoin: {
    price: 500,
    change24h: -1.2,
    marketCap: 80000000000,
    volume24h: 2000000000,
    circulatingSupply: 160000000,
    allTimeHigh: 690,
    allTimeHighDate: "2021-05-10",
  },
  "usd-coin": {
    price: 1,
    change24h: 0.05,
    marketCap: 50000000000,
    volume24h: 4000000000,
    circulatingSupply: 50000000000,
    allTimeHigh: 1.05,
    allTimeHighDate: "2020-03-13",
  },
  ripple: {
    price: 1.5,
    change24h: -0.8,
    marketCap: 60000000000,
    volume24h: 3000000000,
    circulatingSupply: 40000000000,
    allTimeHigh: 3.4,
    allTimeHighDate: "2018-01-07",
  },
  cardano: {
    price: 2,
    change24h: 1.5,
    marketCap: 50000000000,
    volume24h: 2500000000,
    circulatingSupply: 25000000000,
    allTimeHigh: 3.1,
    allTimeHighDate: "2021-09-02",
  },
  solana: {
    price: 200,
    change24h: 5.6,
    marketCap: 70000000000,
    volume24h: 5000000000,
    circulatingSupply: 350000000,
    allTimeHigh: 260,
    allTimeHighDate: "2021-11-06",
  },
  dogecoin: {
    price: 0.2,
    change24h: 10.5,
    marketCap: 30000000000,
    volume24h: 2000000000,
    circulatingSupply: 150000000000,
    allTimeHigh: 0.73,
    allTimeHighDate: "2021-05-08",
  },
  polkadot: {
    price: 30,
    change24h: 2.8,
    marketCap: 40000000000,
    volume24h: 2000000000,
    circulatingSupply: 1300000000,
    allTimeHigh: 55,
    allTimeHighDate: "2021-11-04",
  },
  "avalanche-2": {
    price: 80,
    change24h: -2.3,
    marketCap: 25000000000,
    volume24h: 1500000000,
    circulatingSupply: 310000000,
    allTimeHigh: 145,
    allTimeHighDate: "2021-11-21",
  },
  chainlink: {
    price: 20,
    change24h: 4.2,
    marketCap: 20000000000,
    volume24h: 1200000000,
    circulatingSupply: 1000000000,
    allTimeHigh: 52,
    allTimeHighDate: "2021-05-10",
  },
  litecoin: {
    price: 150,
    change24h: 1.1,
    marketCap: 15000000000,
    volume24h: 3000000000,
    circulatingSupply: 100000000,
    allTimeHigh: 410,
    allTimeHighDate: "2021-05-10",
  },
  "bitcoin-cash": {
    price: 400,
    change24h: 0.9,
    marketCap: 12000000000,
    volume24h: 2500000000,
    circulatingSupply: 30000000,
    allTimeHigh: 3785,
    allTimeHighDate: "2017-12-20",
  },
  stellar: {
    price: 0.5,
    change24h: -1.5,
    marketCap: 8000000000,
    volume24h: 1000000000,
    circulatingSupply: 16000000000,
    allTimeHigh: 0.94,
    allTimeHighDate: "2018-01-03",
  },
  "wrapped-bitcoin": {
    price: 50100,
    change24h: 2.4,
    marketCap: 7000000000,
    volume24h: 500000000,
    circulatingSupply: 140000,
    allTimeHigh: 69200,
    allTimeHighDate: "2021-11-10",
  },
  uniswap: {
    price: 10,
    change24h: 2.2,
    marketCap: 5000000000,
    volume24h: 300000000,
    circulatingSupply: 500000000,
    allTimeHigh: 44.97,
    allTimeHighDate: "2021-05-03",
  },
  algorand: {
    price: 1.2,
    change24h: 3.8,
    marketCap: 4000000000,
    volume24h: 250000000,
    circulatingSupply: 3300000000,
    allTimeHigh: 3.56,
    allTimeHighDate: "2021-06-20",
  },
  polygon: {
    price: 2,
    change24h: 3.5,
    marketCap: 10000000000,
    volume24h: 1500000000,
    circulatingSupply: 5000000000,
    allTimeHigh: 2.92,
    allTimeHighDate: "2021-12-27",
  },
  vechain: {
    price: 0.15,
    change24h: 1.8,
    marketCap: 3000000000,
    volume24h: 200000000,
    circulatingSupply: 20000000000,
    allTimeHigh: 0.28,
    allTimeHighDate: "2021-04-19",
  },
}

// Mock historical price data
export function getHistoricalPriceData(cryptoId: string, days = 30) {
  const data = []
  const today = new Date()
  const basePrice = cryptoPrices[cryptoId]?.price || 100
  const volatility = getVolatility(cryptoId)

  for (let i = days; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Create some random but somewhat realistic price movement
    const randomFactor = Math.sin(i / (days / 10)) * volatility + (Math.random() - 0.5) * volatility
    const price = basePrice * (1 + randomFactor / 100)

    data.push({
      date: date.toISOString().split("T")[0],
      price: price,
    })
  }

  return data
}

// Helper to determine volatility based on crypto type
function getVolatility(cryptoId: string): number {
  const highVolatility = ["bitcoin", "ethereum", "dogecoin", "solana"]
  const mediumVolatility = ["cardano", "polkadot", "avalanche-2", "chainlink", "polygon"]
  const lowVolatility = ["tether", "usd-coin", "binancecoin", "litecoin", "stellar"]

  if (highVolatility.includes(cryptoId)) return 15
  if (mediumVolatility.includes(cryptoId)) return 10
  if (lowVolatility.includes(cryptoId)) return 5

  return 8 // Default volatility
}

// Get user portfolio data
export function getUserPortfolio() {
  return [
    { id: "bitcoin", amount: 0.05, value: 2500 },
    { id: "ethereum", amount: 1.2, value: 3600 },
    { id: "solana", amount: 5, value: 1000 },
    { id: "cardano", amount: 500, value: 1000 },
    { id: "polygon", amount: 250, value: 500 },
  ]
}

// Get trending cryptocurrencies
export function getTrendingCryptos() {
  return ["solana", "polygon", "algorand", "avalanche-2", "cardano"]
}

// Get recommended cryptocurrencies based on user profile
export function getRecommendedCryptos() {
  return ["ethereum", "chainlink", "polkadot", "uniswap", "stellar"]
}


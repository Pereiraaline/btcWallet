//importanto as dependências
import bip32 from 'bip32'
import bip39 from 'bip39'
import bitcoin from 'bitcoinjs-lib'

//definir rede
//rede mainet(prinipal): bitcoin
//rede teste(testnet): testnet
const network = bitcoin.networks.testnet

//derivação de carteiras HD
const path = `m/49'/1'/0'/0`

let minemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(minemonic)

//criando raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando uma conta - par ptv-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave Privada: ", node.toWIF())
console.log("Seed: ", minemonic) 

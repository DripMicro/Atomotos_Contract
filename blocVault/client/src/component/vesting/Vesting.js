import React, {useState, useEffect} from 'react';
import Web3 from "web3";
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Fortmatic from 'fortmatic';
import BVToken from "../../contracts/BlocVaultToken.json";
import Vesting_Contract from "../../contracts/Vesting.json";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import Modal from "react-modal";
import TimeAgo from 'javascript-time-ago';
import en from "javascript-time-ago/locale/en.json";
import "../css/style.css";

TimeAgo.addDefaultLocale(en);
Modal.setAppElement("#root");

export default function Vesting() {
  const [isOpen, setIsOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  let [provider, setProvider] = useState(null);
  const [web3, setWeb3] = useState(0);
  const [network, setNetwork] = useState(null)
  const [accounts, setAccounts] = useState([]);
  const [tokenInstance, setTokenInstance] = useState(null);
  //const [BlocVaultToken, setBlocVaultTokenInstance] = useState(null);
  let selectedAccount;
  const [Amount_90, setAmount_90] = useState(0);
  const [Amount_180, setAmount_180] = useState(0);
  const [Amount_270, setAmount_270] = useState(0);
  const [Amount_360, setAmount_360] = useState(0);

  const [isVested, setIsVested] = useState(false);
  const [isVested_90, setIsVested_90] = useState(false);
  const [isVested_180, setIsVested_180] = useState(false);
  const [isVested_270, setIsVested_270] = useState(false);
  const [isVested_360, setIsVested_360] = useState(false);

  const [deadline, setDeadline] = useState('');
  const [vestingAmount, setVestingAmount] = useState(0);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const [web3Modal, setWeb3Modal] = useState(null);

  useEffect(()=>{
    //getPets();
    init();
  },[])

  useEffect(()=>{
    (async () => {      
    })()
  },[accounts, tokenInstance])

  async function getVestingInfo () {
    if (accounts.length > 0 && tokenInstance ){
      const isVesting = await tokenInstance.methods.get_isVesting(accounts[0]).call();
      if (isVesting) {
        const vestInfo = await tokenInstance.methods.get_vest_info(accounts[0]).call();
        var date = new Date(vestInfo[0] * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        const dateObject = new Date(vestInfo[0] * 1000)

        setDeadline(dateObject.toLocaleString())
        setVestingAmount(vestInfo[1])
      } else {
        setDeadline('')
        setVestingAmount(0)
      }
    }
  }

  useEffect(()=>{
    getVestingInfo()
  },[isVested_90, isVested_180, isVested_270, isVested_360])


  function init() {
    console.log("Initializing example");
    console.log("WalletConnectProvider is", WalletConnectProvider);
    console.log("Fortmatic is", Fortmatic);
    console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          // Mikko's test key - don't copy as your mileage may vary
          // infuraId: "3f88fa504c1d4ec1bec07966779f1ce0",
          rpc: {
            56: 'https://bsc-dataseed.binance.org/'
          },
          network:'binance'
        }
      },
  
      fortmatic: {
        package: Fortmatic,
        options: {
          // Mikko's TESTNET api key
          key: "pk_test_391E26A3B43A3350"
        }
      },
      
      "custom-binancechainwallet": {
        display: {
          logo: "assets/images/binance-logo.svg",
          name: "Binance Chain Wallet",
          description: "Connect to your Binance Chain Wallet"
        },
        package: true,
        connector: async () => {
          let provider = null;
          if (typeof window.BinanceChain !== 'undefined') {
            provider = window.BinanceChain;
            try {
              await provider.request({ method: 'eth_requestAccounts' })
            } catch (error) {
              throw new Error("User Rejected");
            }
          } else {
            throw new Error("No Binance Chain Wallet found");
          }
          return provider;
        }
      }
    };
    let web3_Modal = new Web3Modal({
      cacheProvider: false, // optional
      providerOptions, // required
      disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    });
    setWeb3Modal(web3_Modal);
    console.log("Web3Modal instance is", web3Modal);
  }

  async function fetchAccountData() {
    // Get a Web3 instance for the wallet
    const web3 = new Web3(provider);
    setWeb3(web3);
  
    console.log("Web3 instance is", web3);
  
    // Get connected chain id from Ethereum node
    const chainId = await web3.eth.getChainId();
    // Load chain information over an HTTP API
    // console.log(chainId)
    // console.log(evmChains)
    // const chainData = evmChains.getChain(chainId);
    // document.querySelector("#network-name").textContent = chainData.name;
  
    // Get list of accounts of the connected wallet
    const accounts_temp = await web3.eth.getAccounts();
    
    const networkId_temp = web3.eth.net.getId();
    networkId_temp.then(function(networkId){
      setNetwork(networkId);
    })

    // accounts_temp.then(function(accounts){
      setAccounts(accounts_temp);

      // console.log(accounts_temp)
    // })
    console.log( Vesting_Contract.abi);
    let Vesting_Contract_address = "0xBF52fA023504f6966eb9703F2dECa2dC3deb5666";

    // const tokenInstance_temp = new web3.eth.Contract(
    //   BVToken.abi,
    //   BVToken.networks[networkId_temp] && BVToken.networks[networkId_temp].address,
    // );

    const tokenInstance_temp = new web3.eth.Contract(
      Vesting_Contract.abi,Vesting_Contract_address
    )

    tokenInstance_temp.options.address = "0xBF52fA023504f6966eb9703F2dECa2dC3deb5666";
    setTokenInstance(tokenInstance_temp);
    console.log(tokenInstance_temp);
    let isVested_temp = await tokenInstance_temp.methods.get_isVesting(accounts_temp[0]).call();
    console.log(`isVested_temp = ${isVested_temp}`);
    setIsVested(isVested_temp);

    setIsVested_90(false);
    setIsVested_180(false);
    setIsVested_270(false);
    setIsVested_360(false);

    if(isVested_temp){
      console.log("dsafad");
      const vest_info = await tokenInstance_temp.methods.get_vest_info(accounts_temp[0]).call();
      console.log(vest_info)
      switch (vest_info[2]) {
        case "90":
          console.log("set90");
          setIsVested_90(true);
          break;
        case "180":
          console.log("set90");
          setIsVested_180(true);
          break;
        case "270":
          console.log("set270");
          setIsVested_270(true);
          break;
        case "360":
          console.log("set360");
          setIsVested_360(true);
          break;
      }
      
    }
    // console.log(await tokenInstance_temp.methods.get_isVesting(accounts_temp[0]).call());
    // console.log("Got accounts", accounts);

    const rowResolvers = accounts.map(async (address) => {
      const balance = await web3.eth.getBalance(address);
      const ethBalance = web3.utils.fromWei(balance, "ether");
      const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
      console.log(address);
      console.log(humanFriendlyBalance);
    });
  
    // Because rendering account does its own RPC commucation
    // with Ethereum node, we do not want to display any results
    // until data for all accounts is loaded
    await Promise.all(rowResolvers);
    setWalletConnected(true);
  }

  async function refreshAccountData() {
    console.log("refreshAccountData");
    // If any current data is displayed when
    // the user is switching acounts in the wallet
    // immediate hide this data
    // document.querySelector("#connected").style.display = "none";
    // document.querySelector("#prepare").style.display = "block";
    setWalletConnected(false);
    // Disable button while UI is loading.
    // fetchAccountData() will take a while as it communicates
    // with Ethereum node via JSON-RPC and loads chain data
    // over an API call.
    // document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
    await fetchAccountData(provider);
    // document.querySelector("#btn-connect").removeAttribute("disabled")
  }

  async function onConnect() {
    console.log("Opening a dialog", web3Modal);
    try {
      provider = await web3Modal.connect();
    } catch(e) {
      console.log("Could not get a wallet connection", e);
      return;
    }
    setProvider(provider);
    console.log('provider accounts changed')
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      fetchAccountData();
    });
    console.log('provider chain changed')
    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      fetchAccountData();
    });
    console.log('provider network changed')
    // Subscribe to networkId change
    provider.on("networkChanged", (networkId) => {
      fetchAccountData();
    });
  
    await refreshAccountData();
  }

  async function onDisconnect() {

    console.log("Killing the wallet connection", provider);
  
    // TODO: Which providers have close method?
    if(provider.close) {
      await provider.close();
  
      // If the cached provider is not cleared,
      // WalletConnect will default to the existing session
      // and does not allow to re-scan the QR code with a new wallet.
      // Depending on your use case you may want or want not his behavir.
      await web3Modal.clearCachedProvider();
      setProvider(null);
    }

    selectedAccount = null;
  
    // Set the UI back to the initial state
    // document.querySelector("#prepare").style.display = "block";
    // document.querySelector("#connected").style.display = "none";
    setWalletConnected(false);
  }
  
  const InputValue_90 = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setAmount_90(value);
  }

  const InputValue_180 = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setAmount_180(value);
  }

  const InputValue_270 = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setAmount_270(value);
  }

  const InputValue_360 = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setAmount_360(value);
  }

  const claim = async() => {
    if(tokenInstance && accounts.length > 0){
      if(isVested_90 || isVested_180 || isVested_270 || isVested_360){
        await tokenInstance.methods.claim_vest().send({from:accounts[0]});
        setIsVested_90(false);
        setIsVested_180(false);
        setIsVested_270(false);
        setIsVested_360(false);
        setIsVested(false);
      } else
          store.addNotification({
            title: "Error",
            message: "You can't claim now",
            type: "danger", // 'default', 'success', 'info', 'warning'
            container: "top-right", // where to position the notifications
            animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            dismiss: {
              duration: 3000
            }
          });
      } 
    else {
      store.addNotification({
        title: "Error",
        message: "Please check out available wallets",
        type: "danger", // 'default', 'success', 'info', 'warning'
        container: "top-right", // where to position the notifications
        animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
        dismiss: {
          duration: 3000
        }
      });
    }
  }

  const Invest_90 = async() => {
    if(tokenInstance && accounts.length > 0){
        let isVested_temp = await tokenInstance.methods.get_isVesting(accounts[0]).call();
        if (isVested_temp) {
          store.addNotification({
            title: "Error",
            message: "You've already vested",
            type: "danger", // 'default', 'success', 'info', 'warning'
            container: "top-right", // where to position the notifications
            animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            dismiss: {
              duration: 3000
            }
          });
      } else {
        if(Amount_90 >= 254000000) {
          const amount = Amount_90 * 10**9;
          console.log(amount);
          console.log("invest_90");
          //await tokenInstance.methods.approve(tokenInstance._address, web3.utils.toBN(amount.toString())).send({from:accounts[0]});
          await tokenInstance.methods.vesting(web3.utils.toBN(amount.toString()), 90).send({from:accounts[0]});
          //, gas: 1500000, gasPrice: '30000'
          setIsVested_90(true);
        } else {
          store.addNotification({
            title: "Error",
            message: `Please input correctly 
            (Please enter at least 254000000 = 1bnb)`,
            type: "danger", // 'default', 'success', 'info', 'warning'
            container: "top-right", // where to position the notifications
            animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            dismiss: {
              duration: 3000
            }
          });
        }
      }
    } else {
      store.addNotification({
        title: "Error cannot find your account",
        message: "Please check out available wallets",
        type: "danger", // 'default', 'success', 'info', 'warning'
        container: "top-right", // where to position the notifications
        animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
        dismiss: {
          duration: 3000
        }
      });
    }
  }

  const Invest_180 = async() => {
    if(tokenInstance && accounts.length > 0){
      let isVested_temp = await tokenInstance.methods.get_isVesting(accounts[0]).call();
      if (isVested_temp) {
        store.addNotification({
          title: "Error",
          message: "You've already vested",
          type: "danger", // 'default', 'success', 'info', 'warning'
          container: "top-right", // where to position the notifications
          animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
          animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
          dismiss: {
            duration: 3000
          }
        });
      } 
      else {
        if(Amount_180 >= 254000000) {
          const amount = Amount_180 * 10**9;
          console.log(`invest_180${amount}`);
          //await tokenInstance.methods.approve(tokenInstance._address, web3.utils.toBN(amount.toString())).send({from:accounts[0]});
          await tokenInstance.methods.vesting(web3.utils.toBN(amount.toString()), 180).send({from:accounts[0]});
          //, gas: 1500000, gasPrice: '30000'
          setIsVested_180(true);
        } else {
          store.addNotification({
            title: "Error",
            message: `Please input correctly 
            (Please enter at least 254000000 = 1bnb)`,
            type: "danger", // 'default', 'success', 'info', 'warning'
            container: "top-right", // where to position the notifications
            animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            dismiss: {
              duration: 3000
            }
          });
        }
      }
    }else {
        store.addNotification({
          title: "Error cannot find your account",
          message: "Please check out available wallets",
          type: "danger", // 'default', 'success', 'info', 'warning'
          container: "top-right", // where to position the notifications
          animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
          animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
          dismiss: {
            duration: 3000
          }
        });
      }
  }

  const Invest_270 = async() => {
    if(tokenInstance && accounts.length > 0){
      let isVested_temp = await tokenInstance.methods.get_isVesting(accounts[0]).call();
      if (isVested_temp) {
        store.addNotification({
          title: "Error",
          message: "You've already vested",
          type: "danger", // 'default', 'success', 'info', 'warning'
          container: "top-right", // where to position the notifications
          animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
          animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
          dismiss: {
            duration: 3000
          }
        });
      } 
      else {
        if(Amount_270 >= 254000000) {
          const amount = Amount_270 * 10**9;
          console.log(`invest_270${amount}`);
          //await tokenInstance.methods.approve(tokenInstance._address, web3.utils.toBN(amount.toString())).send({from:accounts[0]});
          await tokenInstance.methods.vesting(web3.utils.toBN(amount.toString()), 270).send({from:accounts[0]});
          //, gas: 1500000, gasPrice: '30000'
          setIsVested_270(true);
        } else {
          store.addNotification({
            title: "Error",
            message: `Please input correctly 
            (Please enter at least 254000000 = 1bnb)`,
            type: "danger", // 'default', 'success', 'info', 'warning'
            container: "top-right", // where to position the notifications
            animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            dismiss: {
              duration: 3000
            }
          });
        }
      }
    }else {
      store.addNotification({
        title: "Error cannot find your account",
        message: "Please check out available wallets",
        type: "danger", // 'default', 'success', 'info', 'warning'
        container: "top-right", // where to position the notifications
        animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
        dismiss: {
          duration: 3000
        }
      });
    }
  }

  const Invest_360 = async() => {
    if(tokenInstance && accounts.length > 0){
      let isVested_temp = await tokenInstance.methods.get_isVesting(accounts[0]).call();
      if (isVested_temp) {
        store.addNotification({
          title: "Error",
          message: "You've already vested",
          type: "danger", // 'default', 'success', 'info', 'warning'
          container: "top-right", // where to position the notifications
          animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
          animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
          dismiss: {
            duration: 3000
          }
        });
      } 
      else {
        if(Amount_360 >= 254000000) {
          const amount = Amount_360 * 10**9;
          console.log(`invest_360${amount}`);
          //await tokenInstance.methods.approve(tokenInstance._address, web3.utils.toBN(amount.toString())).send({from:accounts[0]});
          await tokenInstance.methods.vesting(web3.utils.toBN(amount.toString()), 360).send({from:accounts[0]});
          //, gas: 1500000, gasPrice: '30000'
          setIsVested_360(true);
        } else {
          store.addNotification({
            title: "Error",
            message: `Please input correctly 
            (Please enter at least 254000000 = 1bnb)`,
            type: "danger", // 'default', 'success', 'info', 'warning'
            container: "top-right", // where to position the notifications
            animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            dismiss: {
              duration: 3000
            }
          });
        }
      }
    }else {
      store.addNotification({
        title: "Error cannot find your account",
        message: "Please check out available wallets",
        type: "danger", // 'default', 'success', 'info', 'warning'
        container: "top-right", // where to position the notifications
        animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
        dismiss: {
          duration: 3000
        }
      });
    }
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <nav id="navigation1" className="navigation">
            <div className="nav-header">
              <a className="nav-brand" href="/">
                <img src="assets/images/trypto_logo_blue.png" alt="" />
              </a>
              <div className="nav-toggle" />
            </div>

            <div className="nav-menus-wrapper xs-menu">
              <ul className="nav-menu align-to-right">
                <li>
                    <button className="btn btn-primary wallet_btn" onClick={() => { onConnect() }}>
                        Connect Wallet
                    </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        {/* <!-- .container END --> */}
      </header>
      <div id="particles-js" className='ps_background'>
        <div className="featured-area">
          <div className="blockcain-and-logo-area ps-logo-area">
          <section className="how-work-sec ps-logo-area section-padding" id="how_work">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <div className="section-title-item">
                  <small className="xs-section-title"></small>
                  <h2 className="section-title"></h2>
                </div>
              </div>
            </div>
            <div className="row vesting-section1">
              <div className=" col-lg-4 offset-lg-1 col-md-6 align-self-center" >
                <h2 className="section-title wow fadeInUp"  data-wow-duration="2.5s"><i>Bloc Vest Rewards</i></h2>
                <img className="wow fadeInUp"   data-wow-duration="2s" src="assets/images/blockchain/blocvaultcoin.png"/>
                <h4 className="section-footer wow fadeInUp"   data-wow-duration="3s"><i>Earn Passive income</i></h4>
              </div>
              <div className="content col-lg-5 offset-lg-1 col-md-6 align-self-center wow fadeInUp" data-wow-duration="2s">
                <div className='content-title'><i>Blocvault vesting program</i></div>
                <div className='content-body'><i>Earn rewards by simply holding our BVLT token in our specified wallets by selecting an options which best suits</i></div>
                <div className='content-body'><i>There is no fee for vesting with us. To provide more liquidity in the vesting pool, we designed our taxation on buy and sell such that 1% of tax is moved to vesting pool automatically</i></div>
                <div className='content-footer'><i>www.blocvault.io</i></div> 
              </div>
            </div>
            <div className="row vesting-section2">
              <div className="content col-lg-12 align-self-center wow fadeInUp" data-wow-duration="1.5s">
                <div className='content-title'>{deadline != '' && `Your Tokens will be released on ${deadline}`}</div>
                <div className='content-footer'>{vestingAmount > 0 &&  `Amount: ${vestingAmount}`}</div> 
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 offset-lg-1 col-md-6 wow fadeInUp mt-5" data-wow-duration="1.5s">
                <div className="xs-count-down">
                  <div className="btn-wrapper text-center">
                    <h4>BlocVest Option - A</h4>
                    <ul className='content'>
                      <li>- 90 Day Lock period</li>
                      <li>- 1 - BNB Minimum Vest</li>
                      <li>- 0% Fees apply</li>
                      <li>- 10% Coin on release</li>
                      <li>- Early release fee 3.5%</li>
                    </ul>
                    <input class="preSaleBtn" type="number" name="amount_90" value={Amount_90} onChange={InputValue_90} />
                    {!isVested_90 && (<button className="btn btn-primary" onClick={() => Invest_90()}>VEST BV</button>)}
                    {isVested_90 && (<button className="btn btn-primary" onClick={() => claim()}>Claim BV</button>)}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 offset-lg-2 col-md-6 wow fadeInUp mt-5" data-wow-duration="2s">
                <div className="xs-count-down">
                  <div className="btn-wrapper text-center">
                    <h4>BlocVest Option - B</h4>
                    <ul className='content'>
                      <li>- 180 Day Lock period</li>
                      <li>- 1 - BNB Minimum Vest</li>
                      <li>- 0% Fees apply</li>
                      <li>- 15% Coin on release</li>
                      <li>- Early release fee 3.5%</li>
                    </ul>
                    <input class="preSaleBtn" type="number" name="amount_180" value={Amount_180} onChange={InputValue_180} />
                    {!isVested_180 && (<button className="btn btn-primary" onClick={() => Invest_180()}>VEST BV</button>)}
                    {isVested_180 && (<button className="btn btn-primary" onClick={() => claim()}>Claim BV</button>)}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 offset-lg-1 col-md-6 wow fadeInUp mt-5" data-wow-duration="2.5s">
                <div className="xs-count-down">
                  <div className="btn-wrapper text-center">
                    <h4>BlocVest Option - C</h4>
                    <ul className='content'>
                      <li>- 270 Day Lock period</li>
                      <li>- 1 - BNB Minimum Vest</li>
                      <li>- 0% Fees apply</li>
                      <li>- 20% Coin on release</li>
                      <li>- Early release fee 5.5%</li>
                    </ul>
                    <input class="preSaleBtn" type="number" name="amount_270" value={Amount_270} onChange={InputValue_270} />
                    {!isVested_270 && (<button className="btn btn-primary" onClick={() => Invest_270()}>VEST BV</button>)}
                    {isVested_270 && (<button className="btn btn-primary" onClick={() => claim()}>Claim BV</button>)}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 offset-lg-2 col-md-6 wow fadeInUp mt-5" data-wow-duration="3s">
                <div className="xs-count-down">
                  <div className="btn-wrapper text-center">
                    <h4>BlocVest Option - D</h4>
                    <ul className='content'>
                      <li>- 360 Day Lock period</li>
                      <li>- 1 - BNB Minimum Vest</li>
                      <li>- 0% Fees apply</li>
                      <li>- 25% Coin on release</li>
                      <li>- Early release fee 5.5%</li>
                    </ul>
                    <input class="preSaleBtn" type="number" name="amount_360" value={Amount_360} onChange={InputValue_360} />
                    {!isVested_360 && (<button className="btn btn-primary" onClick={() => Invest_360()}>VEST BV</button>)}
                    {isVested_360 && (<button className="btn btn-primary" onClick={() => claim()}>Claim BV</button>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
          </div>
        </div>
      </div>
    </>
  );
}

// import React, {useState, useEffect} from 'react';
// // import getWeb3 from "./getWeb3";
// import Web3 from "web3";
// import BVToken from "../../contracts/BVToken.json";
// import PublicSale from "../../contracts/PublicSale.json";
// import BUSDToken from "../../contracts/BUSDToken.json";
// import { initOnboard, initNotify } from './services.js';
// // import { ethers } from 'ethers';
// // import getSigner from './signer'
// import Onboard from 'bnc-onboard'
// import avatarPlaceholder from './avatar-placeholder.png'
// import networkEnum from './networkEnum'

// export default function Particles() {
//   const [userTokens,setUserTokens] = useState(0);
//   const [tokenInstance, setTokenInstance] = useState(null);
//   const [publicSaleInstance, setPublicSaleInstance] = useState(null);
//   const [proAddress, setProAddress] = useState(null);
//   const [pro, setPro] = useState(10);
//   const [BUSDTokenInstance, setBUSDTokenInstance] = useState(null);
//   const [accounts, setAccounts] = useState(null);
//   const [busdAmount, setbusdAmount] = useState(0);
//   const [bnbAmount, setbnbAmount] = useState(0);
//   const [web3, setWeb3] = useState(0);
//   const [onboard, setOnboard] = useState(null)
//   const [notify, setNotify] = useState(null)
//   const [provider, setProvider] = useState(null);
//   const [address, setAddress] = useState(null)
//   const [ens, setEns] = useState(null)
//   const [network, setNetwork] = useState(null)
//   const [balance, setBalance] = useState(null)
//   const [wallet, setWallet] = useState({}); 

//   const getPets = () => {
//     try{
//       const onboard = initOnboard({
//         address: setAddress,
//         ens: setEns,
//         network: setNetwork,
//         balance: setBalance,
//         wallet: wallet => {
//           if (wallet.provider) {
//             setWallet(wallet)
  
//             const web3_provider = new Web3(
//               wallet.provider
//             )
//             setProvider(web3_provider);
//             setWeb3(web3_provider);

//             const networkId_temp = web3_provider.eth.net.getId();
//             networkId_temp.then(function(networkId){
//               setNetwork(networkId);
//             })

//             const accounts_temp = web3_provider.eth.getAccounts();
//             accounts_temp.then(function(accounts){
//               setAccounts(accounts);
//             })

//             const tokenInstance_temp = new web3_provider.eth.Contract(
//               BVToken.abi,
//               BVToken.networks[networkId_temp] && BVToken.networks[networkId_temp].address,
//             );
//             tokenInstance_temp.options.address = "0x5b85f5776C20Ce259a97A99a8cab0b3d48337590";
//             setTokenInstance(tokenInstance_temp);

//             const BUSDTokenInstance_temp = new web3_provider.eth.Contract(
//               BUSDToken.abi,
//               BUSDToken.networks[networkId_temp] && BUSDToken.networks[networkId_temp].address,
//             );
//             BUSDTokenInstance_temp.options.address = "0x2A6bD595C85F352Fd91bb6CD774bB2ea6d178590";
//             setBUSDTokenInstance(BUSDTokenInstance_temp);

//             const publicSaleInstance_temp = new web3_provider.eth.Contract(
//               PublicSale.abi,
//               PublicSale.networks[networkId_temp] && PublicSale.networks[networkId_temp].address,
//             );
//             publicSaleInstance_temp.options.address = "0xf700E8Ba08A327F09A3Ac50b79153cc0018B25b3";
//             setPublicSaleInstance(publicSaleInstance_temp);
//             /*const tokenInstance_temp = new ethers.Contract(
//               '0xF5ca949dAcE08434aafA8c144c856e4D7457BFf7',
//               BVToken.abi,
//               getSigner(web3_provider)
//             );
//             console.log(tokenInstance_temp);
//             setTokenInstance(tokenInstance_temp);
            
//             const publicSaleInstance_temp = new ethers.Contract(
//               '0x61cd187EfaF7fBc8E3D0d4641Ff100DEC1dC0041',
//               PublicSale.abi,
//               getSigner(web3_provider)
//             );
//             console.log(publicSaleInstance_temp);
//             setPublicSaleInstance(publicSaleInstance_temp);
      
//             const BUSDTokenInstance_temp = new ethers.Contract(
//               '0x2A6bD595C85F352Fd91bb6CD774bB2ea6d178590',
//               BUSDToken.abi,
//               getSigner(web3_provider)
//             )
//             setBUSDTokenInstance(BUSDTokenInstance_temp);*/
//             // const publicsalecount = await tokenInstance_temp.methods.balanceOf(publicSaleInstance_temp._address).call();
//             // console.log("bvcount_publicsale" , publicsalecount);
      
//             window.localStorage.setItem('selectedWallet', wallet.name)
//           } else {
//             let provider_temp = null;
//             setProvider(provider_temp);
//             setWallet({})
//           }
//         }
//       })
  
//       setOnboard(onboard);
  
//       setNotify(initNotify());

//     }catch(error){
//        // Catch any errors for any of the above operations.
//       alert(`Failed to load web3, accounts, or contract. Check console for details.`);
//       console.error(error);
//     }
//   }
  
//   useEffect(() => {
//     const previouslySelectedWallet =
//       window.localStorage.getItem('selectedWallet')

//     if (previouslySelectedWallet && onboard) {
//       onboard.walletSelect(previouslySelectedWallet)
//     }
//   }, [onboard])

//   const updateUserTokens = async () => {
//     let userTokens = await tokenInstance.methods.balanceOf(accounts[0]).call();
//     setUserTokens(userTokens);
//   }

//   const listenToTokenTransfer = () => {
//     if(accounts[0])
//       tokenInstance.events.Transfer({to: accounts[0]}).on("data", updateUserTokens);
//   }

//   const InputBusdValue = (event) => {
//     const target = event.target;
//     const value = target.type === "checkbox" ? target.checked : target.value;
//     const name = target.name;
//     setbusdAmount(value);
//   }
  
//   const InputProAddressValue = (event) => {
//     const target = event.target;
//     const value = target.type === "checkbox" ? target.checked : target.value;
//     const name = target.name;
//     setProAddress(value);
//   }
  
//   const InputPro = async(event) => {
//     setPro(event.target.value);
//   }

//   const InputBnbValue = (event) => {
//     const target = event.target;
//     const value = target.type === "checkbox" ? target.checked : target.value;
//     setbnbAmount(value);
//   }
  
//   const handlePro = async() => {
//     await publicSaleInstance.methods.updatePro(pro).send({from:accounts[0]});
//     console.log(await publicSaleInstance.methods.getPro().call());
//   }

//   const handleAddProAddress = async() => {
//     if(publicSaleInstance && BUSDTokenInstance){
//       console.log(proAddress);
//       await publicSaleInstance.methods.updateProtectAddr(proAddress).send({from:accounts[0]});
//     }
//   }

//   const handlegetProAddress = async() => {
//     if(publicSaleInstance && BUSDTokenInstance){
//       let proaddress = await publicSaleInstance.methods.getProAddress().call();
//       console.log(proaddress);
//     }
//   }

//   const handleBuyBUSDToken = async() => {
//     if(publicSaleInstance && BUSDTokenInstance)
//     {
//       const birthDateInUnixTimestamp = await publicSaleInstance.methods.getCurrentTime().call();
//       let date = new Date(birthDateInUnixTimestamp * 1000);
//       const amount = Number(busdAmount * 10 ** 18);
// //      const fee = web3.utils.toWei(parseFloat(Number(busdAmount)/10).toString(),'ether');
//       await BUSDTokenInstance.methods.approve(publicSaleInstance._address, web3.utils.toBN(amount.toString())).send({from:accounts[0]});
//       await publicSaleInstance.methods.investBUSD(web3.utils.toBN(amount.toString())).send({from: accounts[0]});
//   //    web3.eth.sendTransaction({from:accounts[0], to:'0xEEFaA2676F8091ba960bb23c8A17eA06bf45B712', value:fee, gas:3000000});
//     }
//   }
  
//   const handlegetFundsBUSD = async() => {
//     if(publicSaleInstance){
//       await publicSaleInstance.methods.getFundsBUSD().send({from:accounts[0]});
//     }
//   }

//   const handlewithdrawBUSD = async() => {
//     if(publicSaleInstance){
//       await publicSaleInstance.methods.withdrawBUSD().send({from:accounts[0]});
//     }
//   }

//   const handleBuyBNBToken = async() => {
//     console.log(publicSaleInstance);
//     if(publicSaleInstance){
//       console.log(accounts[0]);
//       const amount = Number(bnbAmount) * Number(10 ** 18);
//       await publicSaleInstance.methods.investBNB().send({from: accounts[0], value: web3.utils.toWei(amount.toString(),"wei")});
//       console.log("public_balance", await publicSaleInstance.methods.getbalance().call());
//       const amount1 = await publicSaleInstance.methods.getmsgvalue().call();
//       console.log("msgvalue",amount1);
//     }
//   }

//   const handlegetFundsBNB = async() => {
//     if(publicSaleInstance){
//       await publicSaleInstance.methods.getFundsBNB().send({from:accounts[0]});
//     }
//   }

//   const handlewithdrawBNB = async() => {
//     if(publicSaleInstance){
//       await publicSaleInstance.methods.withdrawBNB().send({from:accounts[0]});
//     }
//   }

//   const handlegetTime = async() => {
//     if(publicSaleInstance){
//       const time = await publicSaleInstance.methods.getCurrentTime().call();
//       console.log(time);
//     }
//   }
    
//   const handleGetBUSDBalance = async() => {
//     if(publicSaleInstance){
//       const busdfunds = await publicSaleInstance.methods.getBUSDBalance().call();
//       console.log(busdfunds);
//     }
//   }

//   const handleGetBNBBalance = async() => {
//     if(publicSaleInstance){
//       const bnbfunds = await publicSaleInstance.methods.getbalance().call();
//       console.log(bnbfunds);
//     }
//   }

//   useEffect(() => {
//     if(accounts && tokenInstance && publicSaleInstance)
//     {
//       listenToTokenTransfer();
//     }
//   }, [userTokens, tokenInstance, publicSaleInstance])
  
//   useEffect(()=>{
//     getPets();
//     },[])

//     return (
//       <>
//         <div id="particles-js">
//           <section className="banner-sec" id="particles-js1">
//             <div
//               className="banner-item"
//               style={{
//                 background:
//                   'url(assets/images/background/banner_bg.jpg) no-repeat center center /cover'
//               }}
//             >
//               {/* <div className="container">
//                 <div className="row">
//                   <div className="col-lg-8 mx-auto">
//                     <div className="banner-content">
//                       <h1 className="banner-title">Lets Invest in Crytoex</h1>
//                       <p>
//                         A better way to present your money using fully featured
//                         digital currency Now available on the xpeedstudio.com !
//                       </p>
//                       <a href="#" className="btn btn-primary">
//                         Get A Quote
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="banner-img-item">
//                   <img
//                     className="banner-img"
//                     src="assets/images/banner/banner_img.png"
//                     alt=""
//                   />
//                   <img
//                     className="banner-ico banner-ico-1"
//                     src="assets/images/banner/b1.png"
//                     alt=""
//                   />
//                   <img
//                     className="banner-ico banner-ico-2"
//                     src="assets/images/banner/b2.png"
//                     alt=""
//                   />
//                   <img
//                     className="banner-ico banner-ico-3"
//                     src="assets/images/banner/b3.png"
//                     alt=""
//                   />
//                   <img
//                     className="banner-ico banner-ico-4"
//                     src="assets/images/banner/b4.png"
//                     alt=""
//                   />
//                   <img
//                     className="banner-ico banner-ico-5"
//                     src="assets/images/banner/b5.png"
//                     alt=""
//                   />
//                 </div>
//               </div> */}
//             </div>
//           </section>
//           <div>
//           {ens && ens.name ? (
//             <span>
//               <img
//                 className="user-avatar"
//                 src={ens.avatar ? ens.avatar : avatarPlaceholder}
//                 alt="avatar"
//               ></img>
//               <div
//                 style={{
//                   marginLeft: '10px'
//                 }}
//               >
//                 {ens.name}
//               </div>
//             </span>
//           ) : (
//             address && <span>{address}</span>
//           )}
//           </div>

//           <div>
//           {balance != null && (
//           <span>
//            amount: {Number(balance) > 0 ? balance / 1000000000000000000 : balance}
//           </span>
//           )}
//           </div>

//           {network && (
//             <span>{networkEnum?.[Number(network)] || 'local'} network</span>
//           )}

//           <div style={{zIndex:10000}}>
//             Input BUSD amount: <input type="text" name="busdamount" value={busdAmount} onChange={InputBusdValue} />
//             <button type="button" onClick={handleBuyBUSDToken}>Buy tokens with BUSD</button>
//             <button type="button" onClick={handlegetFundsBUSD}>Get Funds with BUSD</button>
//             <button type="button" onClick={handlewithdrawBUSD}>withdraw BUSD</button>
//           </div>
//           <div style={{zIndex:10000}}>
//             Input BNB amount: <input type="text" name="bnbamount" value={bnbAmount} onChange={InputBnbValue} />
//             <button type="button" onClick={handleBuyBNBToken}>Buy tokens with BNB</button>
//             <button type="button" onClick={handlegetFundsBNB}>Get Funds with BNB</button>
//             <button type="button" onClick={handlewithdrawBNB}>withdraw BNB</button>
//             <button type="button" onClick={handlegetTime}>getTime</button>
//           </div>
//           <div>
//             {wallet.provider && (
//               <button className="bn-demo-button" onClick={onboard.walletSelect}>
//                 Switch Wallets
//               </button>
//             )}
//             {wallet.provider && (
//               <button className="bn-demo-button" onClick={onboard.walletReset}>
//                 Reset Wallet State
//               </button>
//             )}
//             {wallet.provider && (
//               <button className="bn-demo-button" onClick={onboard.walletCheck}>
//                 Wallet Checks
//               </button>
//             )}
//             {!wallet.provider && (
//               <button
//                 className="bn-demo-button"
//                 onClick={() => {
//                   onboard.walletSelect()
//                 }}
//               >
//                 Select a Wallet
//               </button>
//             )}
//           </div>
//           <div style={{zIndex:10000}}>
//             Add address : <input type="text" name="addaddress" value={proAddress} onChange={InputProAddressValue} />
//             set pro : <input type="text" name="setpro" value={pro} onChange={InputPro} />
//             <button type="button" onClick={handlePro}>AddPro</button>
//             <button type="button" onClick={handleAddProAddress}>AddProaddress</button>
//             <button type="button" onClick={handlegetProAddress}>GetProAddress</button>
//             <button type="button" onClick={handleGetBUSDBalance}>GetBUSD</button>
//             <button type="button" onClick={handleGetBNBBalance}>GetBNB</button>
//           </div>
//           <div className="featured-area">
//             <div className="blockcain-and-featured-area">
//               <section className="blockcain-top-sec">
//                 <div className="container">
//                   <div className="row">
//                     <div
//                       className="col-md-6 wow fadeInUp"
//                       data-wow-duration="1.5s"
//                     >
                    
//                       <div className="blockcain-top">
//                         <h2 className="column-title">
//                           Everything Blockchain Is No Joke, Taking World By Storm
//                         </h2>
//                       </div>
//                     </div>
//                     <div
//                       className="col-md-5 offset-md-1 wow fadeInUp"
//                       data-wow-duration="2s"
//                     >
//                       <div className="blockcain-top-content">
//                         <p>
//                           A better way to present your money using fully featured
//                           digital currency and now available on the team xpeed
//                           studio for everyone! It’s the fastest and most scalable
//                           digital asset, enabling real-time contracts and apps any
//                           where in the world.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </section>
  
//               <section className="featured-sec" id="featured">
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-lg-8 mx-auto">
//                       <div className="section-title-item">
//                         <small className="xs-section-title">Main Features</small>
//                         <h2 className="section-title">Blockchain Features</h2>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="main-fetured-item">
//                     <div className="row">
//                       <div
//                         className="col-md-4 wow fadeInUp"
//                         data-wow-duration="1.5s"
//                       >
//                         <div className="single-feaured-item">
//                           <img src="assets/images/feature/icon-1.png" alt="" />
//                           <h3 className="feature-title">
//                             Lowest Transaction Cost
//                           </h3>
//                           <p>
//                             A better way to present your money using fully
//                             featured digital
//                           </p>
//                         </div>
//                       </div>
//                       <div
//                         className="col-md-4 wow fadeInUp"
//                         data-wow-duration="2s"
//                       >
//                         <div className="single-feaured-item">
//                           <img src="assets/images/feature/icon-2.png" alt="" />
//                           <h3 className="feature-title">Safe Smart Contracts</h3>
//                           <p>
//                             A better way to present your money using fully
//                             featured digital
//                           </p>
//                         </div>
//                       </div>
//                       <div
//                         className="col-md-4 wow fadeInUp"
//                         data-wow-duration="2.5s"
//                       >
//                         <div className="single-feaured-item">
//                           <img src="assets/images/feature/icon-3.png" alt="" />
//                           <h3 className="feature-title">
//                             Fast Blockchain Protocol
//                           </h3>
//                           <p>
//                             A better way to present your money using fully
//                             featured digital
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
  
//                   <div
//                     className="featured-poligonal-img wow fadeInUp"
//                     data-wow-duration="1.5s"
//                   >
//                     <img
//                       className="poligonal-img"
//                       src="assets/images/feature/poligonal.png"
//                       alt=""
//                     />
//                   </div>
//                 </div>
//               </section>
//             </div>
//             <div className="blockcain-and-logo-area">
//               <section className="blockcain-business-sec">
//                 <div className="container">
//                   <div className="row">
//                     <div
//                       className="col-md-6 col-lg-6 wow fadeInUp"
//                       data-wow-duration="1.5s"
//                     >
//                       <div className="blockcain-img">
//                         <img
//                           src="assets/images/blockchain/block_img.png"
//                           alt=""
//                         />
//                       </div>
//                     </div>
//                     <div
//                       className="col-md-6 col-lg-5 offset-lg-1 wow fadeInUp"
//                       data-wow-duration="2s"
//                     >
//                       <div className="blockcain-content">
//                         <small className="xs-section-title">
//                           Business solution
//                         </small>
//                         <h3 className="column-title">Blockchain for Business</h3>
//                         <p>
//                           A better way to present your money using fully featured
//                           digital currency and now available on the team xpeed
//                           studio for everyone! It’s the fastest and most scalable
//                           digital asset, enabling real-time contracts and apps any
//                           where in the world.
//                         </p>
//                         <p>
//                           Bitcoin Ethereum blockchains are slow and expensive.
//                           Cost of transactions is a high (and getting higher)
//                           Speed of others transactions is low
//                         </p>
//                         <a href="#" className="btn btn-primary">
//                           Get A Quote
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </section>
  
//               <section className="client-logo-sec">
//                 <div className="container">
//                   <div className="client-logo-item">
//                     <div className="row owl-carousel" id="client-slider">
//                       <div
//                         className="col-sm wow fadeInUp"
//                         data-wow-duration="1.5s"
//                       >
//                         <div className="client-logo">
//                           <img
//                             src="assets/images/client_logo/logo_style1.png"
//                             alt=""
//                           />
//                         </div>
//                       </div>
//                       <div className="col-sm wow fadeInUp" data-wow-duration="2s">
//                         <div className="client-logo">
//                           <img
//                             src="assets/images/client_logo/logo_style2.png"
//                             alt=""
//                           />
//                         </div>
//                       </div>
//                       <div
//                         className="col-sm wow fadeInUp"
//                         data-wow-duration="2.5s"
//                       >
//                         <div className="client-logo">
//                           <img
//                             src="assets/images/client_logo/logo_style3.png"
//                             alt=""
//                           />
//                         </div>
//                       </div>
//                       <div className="col-sm wow fadeInUp" data-wow-duration="3s">
//                         <div className="client-logo">
//                           <img
//                             src="assets/images/client_logo/logo_style4.png"
//                             alt=""
//                           />
//                         </div>
//                       </div>
//                       <div
//                         className="col-sm wow fadeInUp"
//                         data-wow-duration="3.5s"
//                       >
//                         <div className="client-logo">
//                           <img
//                             src="assets/images/client_logo/logo_style5.png"
//                             alt=""
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </section>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
  
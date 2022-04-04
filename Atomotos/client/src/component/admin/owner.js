import React, {useState, useEffect} from 'react';
// import getWeb3 from "./getWeb3";
// import Web3 from "web3";
// import BVToken from "../../contracts/BVToken.json";
// import PublicSale from "../../contracts/PublicSale.json";
// import { initOnboard, initNotify } from './services.js';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// // import Onboard from 'bnc-onboard'
// import avatarPlaceholder from './avatar-placeholder.png'
// import networkEnum from './networkEnum'
// import { store } from "react-notifications-component";
// import "react-notifications-component/dist/theme.css";
// import Modal from "react-modal";
// import TimeAgo from 'javascript-time-ago';
// import en from "javascript-time-ago/locale/en.json";
// import "../css/style.css";

// TimeAgo.addDefaultLocale(en);
// Modal.setAppElement("#root");



// const BootstrapButton = styled(Button)({
//   boxShadow: 'none',
//   textTransform: 'none',
//   fontSize: 16,
//   padding: '6px 12px',
//   border: '1px solid',
//   lineHeight: 1.5,
//   backgroundColor: '#0063cc',
//   borderColor: '#0063cc',
//   fontFamily: [
//     '-apple-system',
//     'BlinkMacSystemFont',
//     '"Segoe UI"',
//     'Roboto',
//     '"Helvetica Neue"',
//     'Arial',
//     'sans-serif',
//     '"Apple Color Emoji"',
//     '"Segoe UI Emoji"',
//     '"Segoe UI Symbol"',
//   ].join(','),
//   '&:hover': {
//     backgroundColor: '#0069d9',
//     borderColor: '#0062cc',
//     boxShadow: 'none',
//   },
//   '&:active': {
//     boxShadow: 'none',
//     backgroundColor: '#0062cc',
//     borderColor: '#005cbf',
//   },
//   '&:focus': {
//     boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
//   },
// });


export default function Owner() {
    // const [userTokens,setUserTokens] = useState(0);
    // const [tokenInstance, setTokenInstance] = useState(null);
    // const [publicSaleInstance, setPublicSaleInstance] = useState(null);
    // const [proAddress, setProAddress] = useState(null);
    // const [pro, setPro] = useState(10);
    // const [BUSDTokenInstance, setBUSDTokenInstance] = useState(null);
    // const [accounts, setAccounts] = useState(null);
    // const [busdAmount, setbusdAmount] = useState(0);
    // const [bnbAmount, setbnbAmount] = useState(0);
    // const [web3, setWeb3] = useState(0);
    // const [Amount, setAmount] = useState(0);
    // // const [onboard, setOnboard] = useState(null)
    // const [notify, setNotify] = useState(null)
    // const [provider, setProvider] = useState(null);
    // const [address, setAddress] = useState(null)
    // const [ens, setEns] = useState(null)
    // const [network, setNetwork] = useState(null)
    // const [balance, setBalance] = useState(null)
    // const [wallet, setWallet] = useState({}); 
    // const [privateBNB, setPrivateBNB] = useState('');
    // const [privateBVT, setPrivateBVT] = useState('');
    // const [walletList, setWalletList] = useState([]);
    // const [isOpen, setIsOpen] = useState(false);

    // function toggleModal() {
    //     setIsOpen(!isOpen);
    // }

    // const getPets = () => {
    //     try{

    //     // Get network provider and web3 instance.
    //       // const onboard = initOnboard({
    //       //   address: setAddress,
    //       //   ens: setEns,
    //       //   network: setNetwork,
    //       //   balance: setBalance,
    //       //   wallet: wallet => {
    //       //     if (wallet.provider) {
    //       //       setWallet(wallet)
      
    //       //       const web3_provider = new Web3(
    //       //         wallet.provider
    //       //       )
    //       //       setProvider(web3_provider);
    //       //       setWeb3(web3_provider);
    
    //       //       const networkId_temp = web3_provider.eth.net.getId();
    //       //       networkId_temp.then(function(networkId){
    //       //         setNetwork(networkId);
    //       //       })
    
    //       //       const accounts_temp = web3_provider.eth.getAccounts();
    //       //       accounts_temp.then(function(accounts){
    //       //         setAccounts(accounts);
    //       //       })
    
    //       //       const tokenInstance_temp = new web3_provider.eth.Contract(
    //       //         BVToken.abi,
    //       //         BVToken.networks[networkId_temp] && BVToken.networks[networkId_temp].address,
    //       //       );
    //       //       tokenInstance_temp.options.address = "0x2E9fB66e958Bfc339f6d7988c32632abebeA7AFd";
    //       //       setTokenInstance(tokenInstance_temp);
    
    //       //       const publicSaleInstance_temp = new web3_provider.eth.Contract(
    //       //         PublicSale.abi,
    //       //         PublicSale.networks[networkId_temp] && PublicSale.networks[networkId_temp].address,
    //       //       );
    //       //       console.log(2)
    //       //       publicSaleInstance_temp.options.address = "0x3Fb1569cBe8dA8F5Ff7E2C4607AB0335A57D4c3d";
    //       //       setPublicSaleInstance(publicSaleInstance_temp);
    //       //       console.log(publicSaleInstance_temp)
        
    //       //       window.localStorage.setItem('selectedWallet', wallet.name)
    //       //     } else {
    //       //       let provider_temp = null;
    //       //       setProvider(provider_temp);
    //       //       setWallet({})
    //       //     }
    //       //   }
    //       // })
      
    //       setOnboard(onboard);
      
    //       setNotify(initNotify());
    
    //     }catch(error){
    //        // Catch any errors for any of the above operations.
    //       console.error(error);
    //       store.addNotification({
    //         title: "Failed to load",
    //         message: "Failed to load web3, accounts, or contract. Check console for details.",
    //         type: "danger", // 'default', 'success', 'info', 'warning'
    //         container: "top-right", // where to position the notifications
    //         animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
    //         animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
    //         dismiss: {
    //           duration: 3000
    //         }
    //       });
    //     }
    // }
  
    // useEffect(() => {
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

    //   const InputValue= (event) => {
    //     const target = event.target;
    //     const value = target.type === "checkbox" ? target.checked : target.value;
    //     setAmount(value);
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
    
    //   const handleBuyToken = async() => {
    //     const tokenAmount = Number(Amount * 10 ** 18);
    //     if (Number(Amount) >= 0.2 && Number(Amount) <= 2){
    //       if (publicSaleInstance) {
    //         console.log(accounts[0]);
    //         const amount = tokenAmount;
    //         await publicSaleInstance.methods.investBNB().send({from: accounts[0], value: web3.utils.toWei(amount.toString(),"wei")});
    //        }
    //     } else {
    //       store.addNotification({
    //         title: "Error BNB quantity",
    //         message: "You have to input between 0.5 BNB and 2 BNB.",
    //         type: "danger", // 'default', 'success', 'info', 'warning'
    //         container: "top-right", // where to position the notifications
    //         animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
    //         animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
    //         dismiss: {
    //           duration: 3000
    //         }
    //       });
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


    //   const handleGetBVTBalance = async() => {
    //     if(publicSaleInstance){
    //       const bvtfunds = await publicSaleInstance.methods.getBVTBalance().call();
    //       console.log(bvtfunds);
    //       setPrivateBVT(bvtfunds + " BVT")
    //     }
    //   }
    
    //   const handlewithdrawBVT = async() => {
    //     if(publicSaleInstance){
    //       await publicSaleInstance.methods.withdrawBVT().send({from:accounts[0]});
    //     }
    //   }
    
    //   const getPrivateWhiteList = async ()  => {
    //     if(publicSaleInstance){
    //         const a = await publicSaleInstance.methods.getPrivateWhiteList().call();
    //         console.log(a);
    //         setWalletList(a);
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


  

    return (
      
        <div style={{height: '100vh',  backgroundImage: 'radial-gradient(50% 50%, #070086 0%, #050069 37%, #02004b 87%)'}}>
            {/* <Container>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                  
                    {!wallet.provider && (
                      <Stack spacing={5} direction="row" mt={5}>
                          <BootstrapButton variant="contained" disableRipple onClick={() => {onboard.walletSelect()}}>
                            Select a Wallet
                          </BootstrapButton>
                      </Stack>
                    )}
                    {wallet.provider && (
                      <Stack spacing={5} direction="row" mt={5}>
                          <BootstrapButton variant="contained" disableRipple onClick={onboard.walletReset}>
                            Reset Wallet
                          </BootstrapButton>
                      </Stack>
                    )}
                    <Stack spacing={5} direction="row" mt={2}>
                        <BootstrapButton variant="contained" disableRipple onClick={handlewithdrawBNB}>
                            Withdraw BNB
                        </BootstrapButton>
                    </Stack>
                    <Stack spacing={5} direction="row"mt={2}>
                        <BootstrapButton variant="contained" disableRipple onClick={handlewithdrawBVT}>
                            Withdraw BVT
                        </BootstrapButton>
                    </Stack>
                </Grid>
            </Container> */}
        </div>
      
    );
  }
  
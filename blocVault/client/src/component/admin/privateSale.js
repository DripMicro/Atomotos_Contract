import React, {useState, useEffect} from 'react';
import Web3 from "web3";
import { store } from "react-notifications-component";
import Onboard from 'bnc-onboard'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { initOnboard, initNotify } from './services.js';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import BVToken from "../../contracts/BVToken.json";
import PublicSale from "../../contracts/PublicSale.json";
import avatarPlaceholder from './avatar-placeholder.png'
import networkEnum from './networkEnum'
import "react-notifications-component/dist/theme.css";
import "../css/style.css";


const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });
  
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

export default function Particles() {
  const [userTokens,setUserTokens] = useState(0);
  const [tokenInstance, setTokenInstance] = useState(null);
  const [publicSaleInstance, setPublicSaleInstance] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [bnbAmount, setbnbAmount] = useState(0);
  const [web3, setWeb3] = useState(0);
  const [privateBNB, setPrivateBNB] = useState('');
  const [privateBVT, setPrivateBVT] = useState('');
  const [walletList, setWalletList] = useState([]);
  const [provider, setProvider] = useState(null);
  const [wallet, setWallet] = useState({}); 
  const [network, setNetwork] = useState(null)
  const [onboard, setOnboard] = useState(null)
  const [notify, setNotify] = useState(null)
  const [ens, setEns] = useState(null)
  const [balance, setBalance] = useState(null)
  const [address, setAddress] = useState(null)

  const getPets = () => {
    try{

    // Get network provider and web3 instance.
      const onboard = initOnboard({
        address: setAddress,
        ens: setEns,
        network: setNetwork,
        balance: setBalance,
        wallet: wallet => {
          if (wallet.provider) {
            setWallet(wallet)
  
            const web3_provider = new Web3(
              wallet.provider
            )
            setProvider(web3_provider);
            setWeb3(web3_provider);

            const networkId_temp = web3_provider.eth.net.getId();
            networkId_temp.then(function(networkId){
              setNetwork(networkId);
            })

            const accounts_temp = web3_provider.eth.getAccounts();
            accounts_temp.then(function(accounts){
              setAccounts(accounts);
            })

            const tokenInstance_temp = new web3_provider.eth.Contract(
              BVToken.abi,
              BVToken.networks[networkId_temp] && BVToken.networks[networkId_temp].address,
            );
            tokenInstance_temp.options.address = "0x0a9F7f237441B4E3F37fFf9dA07be5fA73C67372";
            setTokenInstance(tokenInstance_temp);

            const publicSaleInstance_temp = new web3_provider.eth.Contract(
              PublicSale.abi,
              PublicSale.networks[networkId_temp] && PublicSale.networks[networkId_temp].address,
            );
            console.log(2)
            publicSaleInstance_temp.options.address = "0xB93408466512D0e0C5D4d3aC8426a500d9AffE40";
            setPublicSaleInstance(publicSaleInstance_temp);
            console.log(publicSaleInstance_temp)
    
            window.localStorage.setItem('selectedWallet', wallet.name)
          } else {
            let provider_temp = null;
            setProvider(provider_temp);
            setWallet({})
          }
        }
      })
  
      setOnboard(onboard);
  
      setNotify(initNotify());

    }catch(error){
       // Catch any errors for any of the above operations.
      console.error(error);
      store.addNotification({
        title: "Failed to load",
        message: "Failed to load web3, accounts, or contract. Check console for details.",
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

useEffect(() => {
  const previouslySelectedWallet =
    window.localStorage.getItem('selectedWallet')

  if (previouslySelectedWallet && onboard) {
    onboard.walletSelect(previouslySelectedWallet)
  }
}, [onboard])

const updateUserTokens = async () => {
  let userTokens = await tokenInstance.methods.balanceOf(accounts[0]).call();
  setUserTokens(userTokens);
}

const listenToTokenTransfer = () => {
  if(accounts[0])
    tokenInstance.events.Transfer({to: accounts[0]}).on("data", updateUserTokens);
}

  const handlewithdrawBNB = async() => {
    if(publicSaleInstance){
      await publicSaleInstance.methods.withdrawBNB().send({from:accounts[0]});
    }
  }

  const handleGetBNBBalance = async() => {
    if(publicSaleInstance){
      const bnbfunds = await publicSaleInstance.methods.getbalance().call();
      
      setPrivateBNB(Number(bnbfunds)/10**18 + " BNB")
    }
  }

  const handleGetBVTBalance = async() => {
    if(publicSaleInstance){
      const bvtfunds = await publicSaleInstance.methods.getBVTBalance().call();
      setPrivateBVT(Number(bvtfunds)/10**18 + " BVT")
    }
  }

  const handlewithdrawBVT = async() => {
    if(publicSaleInstance){
      await publicSaleInstance.methods.withdrawBVT().send({from:accounts[0]});
    }
  }

  const getPrivateWhiteList = async ()  => {
    if(publicSaleInstance){
        const a = await publicSaleInstance.methods.getPrivateWhiteList().call();
        console.log(a);
        setWalletList(a);
    }
  }

  useEffect(() => {
    if(accounts && tokenInstance && publicSaleInstance)
    {
      listenToTokenTransfer();
    }
  }, [userTokens, tokenInstance, publicSaleInstance])
  
  useEffect(()=>{
    getPets()
  },[])

    return (
      
        <div style={{height: '100vh',  backgroundImage: 'radial-gradient(50% 50%, #070086 0%, #050069 37%, #02004b 87%)'}}>
            <Container>
            
                {/* <button type="button" onClick={handleGetBNBBalance}>PublicBNB</button>
                <button type="button" onClick={handlewithdrawBNB}>withdraw BNB</button>
                <button type="button" onClick={handleGetBVTBalance}>PublicBVT</button>
                <button type="button" onClick={handlewithdrawBVT}>WithdrawBVT</button>
                <button type="button" onClick={getPrivateWhiteList}>GetWhiteList</button> */}
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
                        <ColorButton variant="contained"  onClick={handleGetBNBBalance}>Private BNB</ColorButton>
                        <span className = "private-label">
                            {privateBNB}
                        </span>
                        <BootstrapButton variant="contained" disableRipple onClick={handlewithdrawBNB}>
                            Withdraw BNB
                        </BootstrapButton>
                    </Stack>
                    <Stack spacing={5} direction="row"mt={2}>
                        <ColorButton variant="contained"  onClick={handleGetBVTBalance}>Private BVT</ColorButton>
                        <span className = "private-label">
                            {privateBVT}
                        </span>
                        <BootstrapButton variant="contained" disableRipple onClick={handlewithdrawBVT}>
                            Withdraw BVT
                        </BootstrapButton>
                    </Stack>
                    <Stack spacing={5} direction="row" mt={2}>
                        <ColorButton variant="contained"  onClick={getPrivateWhiteList} color="success">Get WhiteList</ColorButton>
                    </Stack>
                    <Stack spacing={5} direction="row" mt={2}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Address</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {walletList.map((address, key) => (
                                    <TableRow
                                        key={key}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {address}
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Grid>
            </Container>
        </div>
      
    );
  }
  
import React, {useState, useEffect} from 'react';
// import getWeb3 from "./getWeb3";
import Web3 from "web3";
import { initOnboard, initNotify } from './services.js';
import Onboard from 'bnc-onboard'
import avatarPlaceholder from './avatar-placeholder.png'
import networkEnum from './networkEnum'

export default function HomeNavbar() {
  const [accounts, setAccounts] = useState(null);
  const [web3, setWeb3] = useState(0);
  const [onboard, setOnboard] = useState(null)
  const [notify, setNotify] = useState(null)
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null)
  const [ens, setEns] = useState(null)
  const [network, setNetwork] = useState(null)
  const [balance, setBalance] = useState(null)
  const [wallet, setWallet] = useState({}); 

  const getPets = () => {
    try{
      console.log(1)
      const onboard = initOnboard({
        address: setAddress,
        ens: setEns,
        network: setNetwork,
        balance: setBalance,
        wallet: wallet => {
          console.log(1) 
          if (wallet.provider) {
            console.log(1)
            setWallet(wallet)
            console.log(2)
            const web3_provider = new Web3(
              wallet.provider
            )
            console.log(3)
            setProvider(web3_provider);
            setWeb3(web3_provider);

            console.log(4)
            const networkId_temp = web3_provider.eth.net.getId();
            networkId_temp.then(function(networkId){
              setNetwork(networkId);
            })

            const accounts_temp = web3_provider.eth.getAccounts();
            accounts_temp.then(function(accounts){
              setAccounts(accounts);
            })

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
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  }
  
  useEffect(() => {
    const previouslySelectedWallet =
      window.localStorage.getItem('selectedWallet')

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet)
    }
  }, [onboard])

  
  useEffect(()=>{
    getPets();
  },[])

  return (
 
      <header className="header">
        <div className="container">
          <nav id="navigation1" className="navigation">
            <div className="nav-header">
              <a className="nav-brand" href="index.html">
                <img src="assets/images/trypto_logo_blue.png" alt="" />
              </a>
              <div className="nav-toggle" />
            </div>

            <div className="nav-menus-wrapper xs-menu">
              <ul className="header-right align-to-right">
                {/* <li className="language">
                 
                </li>
                <li>
                  <a href="#" className="offset-side-bar">
                    <i className="icon icon-bag" />
                  </a>
                </li>

                <li>
                  <a href="#" className="searchIcon">
                    <i className="icon icon-search" />
                  </a>
                </li> */}

                {/* <li>
                  <a href="#" className="navSidebar-button">
                    <i className="icon-menu2" />
                  </a>
                </li> */}
              </ul>
              <ul className="nav-menu align-to-right">
                <li className="active">
                  <a href="#">Home</a>
                  {/* <div className="megamenu-panel">
                    <div className="megamenu-panel-row">
                      <div className="col-lg-4 col-12">
                        <a href="index.html">
                          <img
                            style={{ width: '100%' }}
                            src="assets/images/menu_img/home_1.jpg"
                            alt="image1"
                          />
                          <span>Home One</span>
                        </a>
                      </div>
                      <div className="col-lg-4 col-12">
                        <a href="index-2.html">
                          <img
                            style={{ width: '100%' }}
                            src="assets/images/menu_img/home_2.jpg"
                            alt="image2"
                          />
                          <span>Home Two</span>
                        </a>
                      </div>
                      <div className="col-lg-4 col-12">
                        <a href="index-3.html">
                          <img
                            style={{ width: '100%' }}
                            src="assets/images/menu_img/home_3.jpg"
                            alt="image3"
                          />
                          <span>Home Three</span>
                        </a>
                      </div>
                      <div className="col-lg-4 col-12">
                        <a href="index-4.html">
                          <img
                            style={{ width: '100%' }}
                            src="assets/images/menu_img/home_4.jpg"
                            alt="image4"
                          />
                          <span>Home Four</span>
                        </a>
                      </div>
                    </div>
                  </div> */}
                </li>
                <li>
                  <a href="#featured" className="scrolls">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how_work" className="scrolls">
                    Pre-Sale ICO
                  </a>
                </li>
                {/* <li>
                  <a href="#team" className="scrolls">
                    Team
                  </a>
                </li> */}
                <li>
                  <a href="#whitePaper" className="scrolls">
                    White Paper
                  </a>
                </li>
                <li>
                  {wallet.provider && (
                    <button className="btn btn-primary wallet_btn" onClick={onboard.walletReset}>
                      Reset Wallet State
                    </button>
                  )}
                  {!wallet.provider && (
                    <button className="btn btn-primary wallet_btn" onClick={() => { onboard.walletSelect() }}>
                      Connect Wallet
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </div>
        {/* <!-- .container END --> */}
      </header>
  );
}

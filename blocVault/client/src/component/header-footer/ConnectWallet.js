import React, {useState, useEffect} from 'react';
// import getWeb3 from "./getWeb3";
import Web3 from "web3";
import { initOnboard, initNotify } from './services.js';
// import { ethers } from 'ethers';
// import getSigner from './signer'
import Onboard from 'bnc-onboard'
import avatarPlaceholder from './avatar-placeholder.png'
import networkEnum from './networkEnum'


export default function ConnectWallet() {
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
        
        <div className="xs-sidebar-group info-group">
            <div className="xs-overlay xs-bg-black"></div>
            <div className="xs-sidebar-widget">
                <div className="sidebar-widget-container">
                    <div className="widget-heading">
                        <a href="#" className="close-side-widget">
                        <i className="icon icon-cross"></i>
                        </a>
                    </div>
                    <div className="sidebar-textwidget">
                        <div className="sidebar-logo-wraper">
                            <img src="assets/images/sidebar_logo_1.png" alt="sidebar logo"/>
                        </div>
                        <div className="subscribe-from">
                            <p>Get Subscribed!</p>
                        </div>
                        <ul className="sideabr-list-widget">
                            <li>
                                <div className="media">
                                    <div className="d-flex">
                                        <i className="icon icon-placeholder2"></i>
                                    </div>
                                    <div className="media-body">
                                        <p>759 Pinewood Avenue</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="media">
                                    <div className="d-flex">
                                        <i className="icon icon-email2"></i>
                                    </div>
                                    <div className="media-body">
                                        <a href="mailto:info@domain.com">info@domain.com</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="media">
                                    <div className="d-flex">
                                    <i className="icon icon-phone-call2"></i>
                                    </div>
                                    <div className="media-body">
                                        <p>906-624-2565</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                     
                        {wallet.provider && (
                            <div className="text-center">
                                <button className="btn btn-primary wallet_btn"  onClick={onboard.walletSelect}>Switch Wallets</button>
                            </div>
                        )}
                        {wallet.provider && (
                            <div className="text-center">
                                <button className="btn btn-primary wallet_btn">Reset Wallet State</button>
                            </div>
                        )}
                        {!wallet.provider && (
                            <div className="text-center">
                                <button
                                    className="btn btn-primary wallet_btn"
                                    onClick={() => {
                                        onboard.walletSelect()
                                    }}
                                >
                                    Select a Wallet
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>    
                
    );
  }
  
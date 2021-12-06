import React, {useState, useEffect} from 'react';
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import getWeb3 from "./getWeb3";
import PublicSale from "../../contracts/PublicSale.json";
import BVToken from "../../contracts/BVToken.json";
import Modal from "react-modal";
import TimeAgo from 'javascript-time-ago';
import en from "javascript-time-ago/locale/en.json";
import "../css/style.css";
TimeAgo.addDefaultLocale(en);
Modal.setAppElement("#root");


export default function TokenArea() {
  //Modal
  const [isOpen, setIsOpen] = useState(false);
  const [isPrivateBuy, setIsPrivateBuy] = useState(false);
  const [isGetBV, setIsGetBV] = useState(false);
  //token
  const [userTokens,setUserTokens] = useState(0);
  const [tokenInstance, setTokenInstance] = useState(null);
  const [publicSaleInstance, setPublicSaleInstance] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [Amount, setAmount] = useState(0);
  const [web3, setWeb3] = useState(0);
  //time
  let [CountTime, setCountTime] = useState(-1);
  let [day, setDay] = useState(0);
  let [hour, setHour] = useState(0);
  let [minute, setMinute] = useState(0);
  let [second, setSecond] = useState(0);
  let [startTime, setStartTime] = useState(1638456600); // start unix time -- privateSale
  let [endTime, setEndTime] = useState(1638460800); // end unix time -- privateSale
  
  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const getPets = async () => {
    try{
        // Count Time
        let localTime = Math.ceil((new Date).getTime()/1000);
        if(localTime > startTime)
          setCountTime(endTime - localTime);
        else 
          setCountTime(endTime - startTime);
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        // Use web3 to get the user's accounts.
        const accounts_temp = await web3.eth.getAccounts();
        setAccounts(accounts_temp);
        //console.log("ogcaccoutn", accounts_temp);
        const networkId = await web3.eth.net.getId();
  
        const tokenInstance_temp = new web3.eth.Contract(
          BVToken.abi,
          BVToken.networks[networkId] && BVToken.networks[networkId].address,
        );
        
        
        const publicSaleInstance_temp = new web3.eth.Contract(
          PublicSale.abi,
          PublicSale.networks[networkId] && PublicSale.networks[networkId].address,
        );
        
        if(publicSaleInstance_temp){
          const birthDateInUnixTimestamp = await publicSaleInstance_temp.methods.getRemainTime().call();
          
        }

        const publicsalecount = await tokenInstance_temp.methods.balanceOf(publicSaleInstance_temp._address).call();
        console.log("bvcount_publicsale" , publicsalecount);

        setWeb3(web3);
        setTokenInstance(tokenInstance_temp);
        setPublicSaleInstance(publicSaleInstance_temp);
    }catch(error){
       // Catch any errors for any of the above operations.
      // alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  }

  const updateUserTokens = async () => {
    let userTokens = await tokenInstance.methods.balanceOf(accounts[0]).call();
    setUserTokens(userTokens);
  }

  const listenToTokenTransfer = () => {
    if(accounts[0])
      tokenInstance.events.Transfer({to: accounts[0]}).on("data", updateUserTokens);
  }

  const InputValue= (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setAmount(value);
  }
  
  const handleBuyToken = async() => {
    const tokenAmount = Number(Amount * 10 ** 18);
    if (Number(Amount) >= 0.2 && Number(Amount) <= 2){
      if (publicSaleInstance) {
        await publicSaleInstance.methods.investBNB().send({from: accounts[0], value: web3.utils.toWei(tokenAmount.toString(),"wei")});
        console.log("public_balance", await publicSaleInstance.methods.getbalance().call());
      }
    } else {
      store.addNotification({
        title: "Error BNB quantity",
        message: "You have to input between 0.5 BNB and 2 BNB.",
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

  
  const handlegetFunds = async() => {
    if(publicSaleInstance){
      //BNB
      await publicSaleInstance.methods.getFundsBNB().send({from:accounts[0]});
    }
  }

  const handlegetTime = async() => {
    const time = await publicSaleInstance.methods.symbol().call();
    console.log(time)
  }

  function countdown(s) {
    const d = Math.floor(s / (3600 * 24));
    s  -= d * 3600 * 24;
    setDay(d);

    const h = Math.floor(s / 3600);
    s  -= h * 3600;
    setHour(h);

    const m = Math.floor(s / 60);
    s  -= m * 60;
    setMinute(m);

    const tmp = [];
    (d) && tmp.push(d + 'd');
    (d || h) && tmp.push(h + 'h');
    (d || h || m) && tmp.push(m + 'm');
    tmp.push(s + 's');

    setSecond(s);
    return tmp.join(' ');
  }

  function initTime(){
    setDay(0);
    setHour(0);
    setMinute(0);
    setSecond(0);
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

  useEffect(() => {
    let localTime = Math.ceil((new Date).getTime()/1000);
    let remainTime = CountTime;
    // privateSale Time
    if (localTime >= startTime && localTime <= endTime){
      remainTime -= 1;
      if (remainTime >= 0) {
        countdown(remainTime)
        setIsPrivateBuy(true)
      } 
      // console.log(remainTime)  
    } else {
      initTime()
      setIsPrivateBuy(false)
    }
    // Get BV
    if (localTime > endTime){
      setIsGetBV(true)
    } else {
      setIsGetBV(false)
    }

    setTimeout(() => setCountTime(remainTime), 1000);
  }, );


  
    return (
      <>
        <div className="how-work-and-token-area">
          <section className="how-work-sec section-padding" id="how_work">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <div className="section-title-item">
                    <small className="xs-section-title"></small>
                    <h2 className="section-title">Token Launch Details</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-6 wow fadeInUp " data-wow-duration="1.5s">
                  <div className="xs-count-down">
                    <h3 className="xs-single-title">ICO Ends in</h3>
                    <ul className="xs-counter-list">
                      <li>
                        <strong id="">{day}</strong>
                        <span>Day</span>
                      </li>
                      <li>
                        <strong id="">{hour}</strong>
                        <span>Hours</span>
                      </li>
                      <li>
                        <strong id="">{minute}</strong>
                        <span>Minute</span>
                      </li>
                      <li>
                        <strong id="">{second}</strong>
                        <span>Second</span>
                      </li>
                    </ul>
                    {/* <div className="xs-progress-bar">
                      <span className="progess-text-1">Sold: $28,985,879</span>
                      <span className="progess-text-2">$50,000</span>
                      <div className="xs-bar">
                        <div className="bar-bg"></div>
                      </div>
                    </div> */}
                    <div className="btn-wrapper text-center">
                      {isPrivateBuy==true && (<button className="btn btn-primary" onClick={toggleModal}>ENTER ICO</button>)}
                      {isGetBV==true && (<button className="btn btn-primary" onClick={handlegetFunds}>Get BV</button>)}
                    </div>
                    <Modal
                      isOpen={isOpen}
                      onRequestClose={toggleModal}
                      contentLabel="My dialog"
                      className="mymodal"
                      overlayClassName="myoverlay"
                      closeTimeoutMS={500}
                    >
                       <div className="language-content">
                            <p>ICO</p>
                            <ul className="xs-counter-list">
                              <li>
                                <strong id="">{day}</strong>
                                <span>Day</span>
                              </li>
                              <li>
                                <strong id="">{hour}</strong>
                                <span>Hours</span>
                              </li>
                              <li>
                                <strong id="">{minute}</strong>
                                <span>Minute</span>
                              </li>
                              <li>
                                <strong id="">{second}</strong>
                                <span>Second</span>
                              </li>
                            </ul>
                            <ul className="flag-lists">
                              <li>
                                <input type="number" name="amount" value={Amount} onChange={InputValue} />
                              </li>
                              <li>
                                <div className="btn-wrapper text-center"><button className="btn btn-primary" onClick={handleBuyToken}>Buy</button></div>
                              </li>
                            </ul>
                            <a className="closeModal" onClick={toggleModal}>X</a>
                          </div>
                      
                    </Modal>
                    {/* <!-- xs modal --> */}
                    
                  </div>
                </div>
                <div className="col-lg-3 offset-lg-1 col-md-6 align-self-center wow fadeInUp" data-wow-duration="2s">
                  <div className="work-token-item">
                    <ul>
                      <li>
                        <strong> Pre-Sale Starts</strong>
                        <span> Open for registration</span>
                      </li>
                      <li>
                        <strong> Pre-Sale Terms</strong>
                        <span>To be confirmed</span>
                      </li>
                      <li>
                        <strong> Token Symbol</strong>
                        <span>BVLT</span>
                      </li>
                      <li>
                        <strong> Total Number of Tokens</strong>
                        <span>To be confirmed</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 align-self-center col-md-12 wow fadeInUp" data-wow-duration="2.5s">
                  <div className="work-video">
                    <img src="assets/images/how-works/video.jpg" alt=""/>
                    <a href="https://www.youtube.com/watch?v=G5Hy4-ri6b4" className="video-btn xs-video" data-effect="mfp-zoom-in">
                      <i className="icon icon-play-button2"></i>
                      <span className="btn-hover-anim"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="token-roadmap-area">
            <section className="token-distribution-sec section-padding" >
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 mx-auto">
                    <div className="section-title-item">
                      <small className="xs-section-title">Token Details</small>
                      <h2 className="section-title">Token Distribution</h2>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 wow fadeInUp" data-wow-duration="1.5s">
                    <div className="row chart-gap">
                      <div className="col-sm-7 ml-lg-auto">
                        <canvas className="token-chart-item" id="myChart"></canvas>
                        <h3 className="xs-single-title">Token Distribution</h3>
                      </div>
                      <div className=" col-sm-5">
                        <ul className="chart-label">
                          <li>
                            <img src="assets/images/token/label_img1.png" alt=""/>
                            <span className="chart-bg1"></span> To Be Comfirmed
                          </li>
                          <li>
                            <img src="assets/images/token/label_img2.png" alt=""/>
                            <span className="chart-bg2"></span> To Be Comfirmed
                          </li>
                          <li>
                            <img src="assets/images/token/label_img3.png" alt=""/>
                            <span className="chart-bg3"></span> To Be Comfirmed
                          </li>
                          <li>
                            <img src="assets/images/token/label_img4.png" alt=""/>
                            <span className="chart-bg4"></span> To Be Comfirmed
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 wow fadeInUp" data-wow-duration="2s">
                    <div className="row chart-gap">
                      <div className="col-sm-7 ml-lg-auto">
                        <canvas className="token-chart-item" id="myChartTwo"></canvas>
                        <h3 className="xs-single-title">Tokenomics</h3>
                      </div>
                      <div className="col-sm-5">
                        <ul className="chart-label chartLabel2">
                          <li>
                            <img src="assets/images/token/label_img2-1.png" alt=""/>
                            <span className="chart-bg1">2 %</span> Liquidity
                          </li>
                          <li>  
                            <img src="assets/images/token/label_img2-2.png" alt=""/>
                            <span className="chart-bg2">3 %</span> Development
                          </li>
                          <li>
                            <img src="assets/images/token/label_img2-3.png" alt=""/>
                            <span className="chart-bg3">2 %</span> Marketing
                          </li>
                          <li>
                            <img src="assets/images/token/label_img2-4.png" alt=""/>
                            <span className="chart-bg4">3 %</span> Holders
                          </li>
                          <li>
                            <img src="assets/images/token/label_img2-5.png" alt=""/>
                            <span className="chart-bg5">2 %</span> Buy Back
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="roadmap-sec section-padding" >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-8 mx-auto">
                    <div className="section-title-item">
                      <small className="xs-section-title"></small>
                      <h2 className="section-title">Blocvault Roadmap</h2>
                    </div>
                  </div>
                </div>
                <div className="roadmap-timeline">
                  <img src="assets/images/roadmap/timelinered.png" alt=""/>
                  <div className="custom-container container">
                    <div className="row roadmap-timeline-item">
                      <div className="col-md xs-roadmap wow fadeInUp" data-wow-duration="1.5s">
                        <div className="single-roadmap-timeline">
                          <b></b>
                          <h3>Oct 2021</h3>
                          <p> 
                              Social Media Platforms<br/>
                              Whitepaper Launch<br/>
                              Build out our community<br/>
                              Begin App Development
                          </p>
                        </div>
                      </div>
                      <div className="col-md xs-roadmap wow fadeInUp" data-wow-duration="2s">
                        <div className="single-roadmap-timeline">
                          <b></b>
                          <h3>Nov 2021</h3>
                            <p> 
                              Website Launch<br/>
                              Social Marketing<br/>
                              New token platforms<br/>
                              Techrate Audit.<br/>
                              Begin PPC campaign’s<br/>
                              Token Giveaways<br/>
                            </p>
                        </div>
                      </div>
                      <div className="col-md xs-roadmap wow fadeInUp" data-wow-duration="2.5s">
                        <div className="single-roadmap-timeline">
                          <b></b>
                          <h3>Dec 2021</h3>
                          <p> 
                            Pre-Sale BVLT Token<br/> 
                            Public Launch BVLT<br/>
                            List on CMC & CG<br/>
                            (fast-tracked)<br/>
                            Trend on DEX & CMC<br/> 
                            Massive marketing<br/>
                            push directly with<br/>
                            Launch
                          </p>
                        </div>
                      </div>
                      <div className="col-md xs-roadmap wow fadeInUp" data-wow-duration="3s">
                        <div className="single-roadmap-timeline">
                          <b></b>
                          <h3>Jan-Feb 2022</h3>
                          <p> 
                            Continue to market<br/>
                            BVLT Globally<br/>
                            Ramp up Development<br/>
                            of our App<br/>
                            Second Audit By Certik<br/>
                            Listing on Major<br/>
                            Exchanges<br/>
                            Launch of New Website 
                          </p>
                        </div>
                      </div>
                      <div className="col-md xs-roadmap wow fadeInUp" data-wow-duration="3.5s">
                        <div className="single-roadmap-timeline">
                          <b></b>
                          <h3>Mar-Apr 2022</h3>
                          <p>
                            Global App Marketing<br/>
                            Release Merch Store<br/>
                            Test App for Launch<br/>
                            Release BVW Wallet<br/>
                            Listing on top 10<br/>
                            exchange
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }
  
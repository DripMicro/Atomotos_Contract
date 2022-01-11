import React, {useState, useEffect} from 'react';
import { send } from 'emailjs-com';
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "../css/style.css";

export default function HomeNavbar() {
  const [toSend, setToSend] = useState({
    from_url: '',
    address: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    send(
      'service_l5jtea6',
      'template_qhe90is',
      toSend,
      'user_MgvYcHYIyMEkrdSoAvcZb'
    )
      .then((response) => {
        store.addNotification({
          title: "Success",
          message: "Thank you for entering our presale See you on the moon",
          type: "success", // 'default', 'success', 'info', 'warning'
          container: "top-right", // where to position the notifications
          animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
          animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
          dismiss: {
            duration: 10000
          }
        });
	setToSend({ from_url: '', address: ''});
      })
      .catch((err) => {
        store.addNotification({
          title: "Error",
          message: "You don't send your information",
          type: "danger", // 'default', 'success', 'info', 'warning'
          container: "top-right", // where to position the notifications
          animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
          animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
          dismiss: {
            duration: 3000
          }
        });
      });
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };


  return (
    <>
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
               
              </ul>
              <ul className="nav-menu align-to-right">
                <li className="active">
                  <a href="#">Home</a>
               
                </li>
                <li>
                  <a href="#featured" className="scrolls">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how_work" className="scrolls">
                    BVLT Pre Sale
                  </a>
                </li>
   
                <li>
                  <a href="#whitePaper" className="scrolls">
                    White Paper
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        {/* <!-- .container END --> */}
      </header>
      
      <div id="particles-js">
          <section className="banner-sec" id="particles-js1">
            <div
              className="banner-item"
              style={{
                background:
                  'url(assets/images/background/banner_bg.jpg) no-repeat center center /cover'
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 mx-auto">
                    <div className="banner-content">
                      <h1 className="banner-title">Welcome to the BlocVault Ecosystem</h1>
                      <p>
                        BlocVault is a decentralized BSC project that will use the BVLT token to reward
                        investors and holders within our App and on our Platform. 
                      </p>
                      {/* <a href="#" className="btn btn-primary">
                        HOW TO BUY
                      </a> */}
                    </div>
                  </div>
                </div>
                <div className="banner-img-item">
                  <img
                    className="banner-img"
                    src="assets/images/banner/banner_img.png"
                    alt=""
                  />
                  <img
                    className="banner-ico banner-ico-1"
                    src="assets/images/banner/b1.png"
                    alt=""
                  />
                  <img
                    className="banner-ico banner-ico-2"
                    src="assets/images/banner/b2.png"
                    alt=""
                  />
                  <img
                    className="banner-ico banner-ico-3"
                    src="assets/images/banner/b3.png"
                    alt=""
                  />
                  <img
                    className="banner-ico banner-ico-4"
                    src="assets/images/banner/b4.png"
                    alt=""
                  />
                  <img
                    className="banner-ico banner-ico-5"
                    src="assets/images/banner/b5.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
          <div className="featured-area">
            <div className="blockcain-and-featured-area">
              
              <section className="blockcain-top-sec">
                <div className="container">
                  <div className="row">
                    <div
                      className="col-md-6 wow fadeInUp"
                      data-wow-duration="1.5s"
                    >
                    
                      <div className="blockcain-top">
                        <h2 className="column-title">
                          Our revolutionary App suite.
                        </h2>
                        <p>
                          Buy, Sell, Swap, Trade, Chat and track all your 
                          investments in one place. Use our BV debit card
                          in-store worldwide.  
                        </p>
                      </div>
                    </div>
                    <div
                      className="col-md-5 offset-md-1 wow fadeInUp"
                      data-wow-duration="2s"
                    >
                      <div className="blockcain-top-content">
                        <h2 className="column-title">
                          Stay connected with our marketplace. 
                        </h2>
                        <p>
                          Our NFT marketplace & online products will allow
                          users to connect send & receive assets in seconds
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
  
              <section className="featured-sec" id="featured">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 mx-auto">
                      <div className="section-title-item">
                        <small className="xs-section-title"></small>
                        <h2 className="section-title">Revolutionary Features</h2>
                      </div>
                    </div>
                  </div>
                  <div className="main-fetured-item">
                    <div className="row">
                      <div
                        className="col-md-4 wow fadeInUp"
                        data-wow-duration="1.5s"
                      >
                        <div className="single-feaured-item">
                          <img src="assets/images/feature/icon-1.png" alt="" />
                          <h3 className="feature-title">
                            BV PAY
                          </h3>
                          <p>
                            Use our in app exchange 
                            and BV Debit Card to shop 
                            in-store worldwide. 
                          </p>
                        </div>
                      </div>
                      <div
                        className="col-md-4 wow fadeInUp"
                        data-wow-duration="2s"
                      >
                        <div className="single-feaured-item">
                          <img src="assets/images/feature/icon-2.png" alt="" />
                          <h3 className="feature-title">BV CHAT</h3>
                          <p>
                            Chat with friends & family
                            on the go. Video call or group
                            call with other investors. 
                          </p>
                        </div>
                      </div>
                      <div
                        className="col-md-4 wow fadeInUp"
                        data-wow-duration="2.5s"
                      >
                        <div className="single-feaured-item">
                          <img src="assets/images/feature/icon-3.png" alt="" />
                          <h3 className="feature-title">
                            BV SWAP
                          </h3>
                          <p>
                            Swap tokens across 
                            networks in seconds with 
                            BV multi chain swap
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div
                    className="featured-poligonal-img wow fadeInUp"
                    data-wow-duration="1.5s"
                  >
                    <img
                      className="poligonal-img"
                      src="assets/images/feature/poligonal.png"
                      alt=""
                    />
                  </div>
                </div>
              </section>
            </div>
            <div className="blockcain-and-logo-area">
              <section className="blockcain-business-sec">
                <div className="container">
                  <div className="row">
                    <div
                      className="col-md-6 col-lg-6 wow fadeInUp"
                      data-wow-duration="1.5s"
                    >
                      <div className="blockcain-img">
                        <img
                          src="assets/images/blockchain/block_img.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div
                      className="col-md-6 col-lg-5 offset-lg-1 wow fadeInUp"
                      data-wow-duration="2s"
                    >
                      <div className="blockcain-content">
                        <small className="xs-section-title">
                        </small>
                        <h3 className="column-title">The BVLT Token</h3>
                        <p>
                          The BVLT token is a Binance smart chain (BSC) deflationary token.
                          Binance smart chain (BSC) was developed as a means of utilizing
                          solidity-based smart contracts with much greater speed and efficiency
                          than other, competing chains. With decentralized exchanges on BSC
                          offering lightning fast swaps and extremely low fees, BSC has started to
                          become one of the most widely used block-chains for decentralized
                          finance (Defi). BSC uses a token protocol developed by the Binance team
                          called BEP-20. The BVLT tokens deflationary nature means that each time
                          a transaction occurs using a deflationary token a percentage of the tokens
                          used in the transactions are destroyed permanently. This function is
                          constantly at work removing tokens from the total available supply. Over
                          time, this action works to help increase the value of each token
                          dramatically as it increases the scarcity of tokens.
                        </p>
                        {/* <a href="#" className="btn btn-primary">
                          BUY TOKEN
                        </a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
  
              <section className="client-logo-sec">
                <div className="container">
                  <div className="client-logo-item">
                    <div className="row owl-carousel" id="client-slider">
                      <div
                        className="col-sm wow fadeInUp"
                        data-wow-duration="1.5s"
                      >
                        <div className="client-logo">
                          <img
                            src="assets/images/client_logo/logo_style1.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-sm wow fadeInUp" data-wow-duration="2s">
                        <div className="client-logo">
                          <img
                            src="assets/images/client_logo/logo_style2.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div
                        className="col-sm wow fadeInUp"
                        data-wow-duration="2.5s"
                      >
                        <div className="client-logo">
                          <img
                            src="assets/images/client_logo/logo_style3.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-sm wow fadeInUp" data-wow-duration="3s">
                        <div className="client-logo">
                          <img
                            src="assets/images/client_logo/logo_style4.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div
                        className="col-sm wow fadeInUp"
                        data-wow-duration="3.5s"
                      >
                        <div className="client-logo">
                          <img
                            src="assets/images/client_logo/logo_style5.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
     
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
                    <h3 className="xs-single-title">Join our Whitelist Pre-Sale</h3>
                    {/* <ul className="xs-counter-list">
                      <li>
                        <strong id="">0</strong>
                        <span>Day</span>
                      </li>
                      <li>
                        <strong id="">0</strong>
                        <span>Hours</span>
                      </li>
                      <li>
                        <strong id="">0</strong>
                        <span>Minute</span>
                      </li>
                      <li>
                        <strong id="">0</strong>
                        <span>Second</span>
                      </li>
                    </ul> */}
                    <form onSubmit={onSubmit}>
                      <div>
                        <span className='preSaleTitle'>Telegram or Discord handle</span>
                        <input 
                          className='preSaleBtn' 
                          name='from_url'
                          placeholder=''
                          value={toSend.from_url}
                          onChange={handleChange}
                        /><br/>
                        <span className='preSaleTitle'>Wallet Address for whitelist</span>
                        <input 
                          className='preSaleBtn'
                          name='address'
                          placeholder=''
                          value={toSend.address}
                          onChange={handleChange}
                        /><br/>
                        <div  className='preSaleTitle'>Please note:<br/> Your BVLT tokens will be airdropped to your wallet address after our Whitelisted Pre-sale ends</div>
                      </div>

                    <div className="btn-wrapper text-center">
                      <button type = "submit" className="btn btn-primary" >Enter Our Whitelist Pre-Sale</button>
                    </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 align-self-center wow fadeInUp" data-wow-duration="2s">
                  <div className="work-token-item">
                    <a href="https://pancakeswap.finance/swap" target="_blank"><button className="btn btn-primary">Pancake swap</button></a>
                    {/* <ul> */}
                      {/* <li>
                        <strong> Pre-Sale Date</strong>
                        <span> Wednesday 5th 8pm GMT </span>
                      </li>
                      <li>
                        <strong> Pre-Sale Price</strong>
                        <span>1375000000 BVLT presale per BNB</span><br/>
                        <span>1237500000 BVLT Listing rate per BNB</span>
                      </li>
                      <li>
                        <strong> BNB - Limit Per Wallet</strong>
                        <span>Min 0.25,  Max 1.0</span>
                      </li>
                      <li>
                        <strong> Listing Price</strong>
                        <span>1BNB = 254,000,000</span>
                      </li> */}
                    {/* </ul> */}
                  </div>
                </div>
                <div className="col-lg-4 align-self-center col-md-12 wow fadeInUp" data-wow-duration="2.5s">
                  <div className="work-video">
                    <img src="assets/images/how-works/video.jpg" alt=""/>
                    <a href="https://www.youtube.com/watch?v=IA40bfxCEec" className="video-btn xs-video" data-effect="mfp-zoom-in">
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
                  {/* <div className="col-lg-6 wow fadeInUp" data-wow-duration="1.5s">
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
                  </div> */}
                  <div className='col-lg-3'></div>
                  <div className="col-lg-8 col-lg-offset-3 wow fadeInUp" data-wow-duration="2s">
                    <div className="rows">
                      <div className="col-sm-12 ml-lg-auto">
                        <img src="assets/images/token/1.png"/>
                      </div>
                      <div className="col-sm-8">
                        <h3 className="xs-single-title">Tokenomics</h3>
                      </div>
                      {/* <div className="col-sm-5"> */}
                        {/* <ul className="chart-label chartLabel2">
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
                            <span className="chart-bg5">1 %</span> Buy Back
                          </li>
                          <li>
                            <img src="assets/images/token/label_img2-5.png" alt=""/>
                            <span className="chart-bg5">1 %</span> Buy Back
                          </li>
                        </ul> */}
                        
                      {/* </div> */}
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

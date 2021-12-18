
import React, { Component }  from 'react';
export default function Particles() {


    return (
      <>
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
                      <a href="#" className="btn btn-primary">
                        HOW TO BUY
                      </a>
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
          {/* <div style={{zIndex:10000}}>
            Input BUSD amount: <input type="text" name="busdamount" value={busdAmount} onChange={InputBusdValue} />
            <button type="button" onClick={handleBuyBUSDToken}>Buy tokens with BUSD</button>
            <button type="button" onClick={handlegetFundsBUSD}>Get Funds with BUSD</button>
            <button type="button" onClick={handlewithdrawBUSD}>withdraw BUSD</button>
          </div>
          <div style={{zIndex:10000}}>
            Input BNB amount: <input type="text" name="bnbamount" value={bnbAmount} onChange={InputBnbValue} />
            <button type="button" onClick={handleBuyBNBToken}>Buy tokens with BNB</button>
            <button type="button" onClick={handlegetFundsBNB}>Get Funds with BNB</button>
            <button type="button" onClick={handlewithdrawBNB}>withdraw BNB</button>
            <button type="button" onClick={handlegetTime}>getTime</button>
            <button type="button" onClick={handleGetBNBBalance}>PublicBNB</button>
            <button type="button" onClick={handleGetBVTBalance}>PublicBVT</button>
            <button type="button" onClick={handlewithdrawBVT}>WithdrawBVT</button>
            <button type="button" onClick={getPrivateWhiteList}>GetWhiteList</button>
          </div> */}
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
      </>
    );
  }
  
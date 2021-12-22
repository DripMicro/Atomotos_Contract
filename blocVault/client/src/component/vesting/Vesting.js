import React, {useState, useEffect} from 'react';

export default function Vesting() {
   
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
                      <button className="btn btn-primary wallet_btn">
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
                      <input class="preSaleBtn" />
                      <button className="btn btn-primary">Get BV</button>
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
                      <input class="preSaleBtn" />
                      <button className="btn btn-primary">Get BV</button>
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
                      <input class="preSaleBtn" />
                      <button className="btn btn-primary">Get BV</button>
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
                      <input class="preSaleBtn" />
                      <button className="btn btn-primary">Get BV</button>
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

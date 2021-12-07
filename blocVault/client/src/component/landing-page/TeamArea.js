import React, { Component }  from 'react';
export default function TeamArea() {
    return (
      <>
        <div className="document-and-team-area">
          
          <section className="doceumnt-sec section-padding" id="whitePaper">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <div className="section-title-item">
                    <small className="xs-section-title"></small>
                    <h2 className="section-title">Audits And Documentation</h2>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-lg-8 mx-auto wow fadeInUp" data-wow-duration="1.5s">
                  <div className="nav xs-tabs-menu" id="v-pills-tab" role="tablist" aria-orientation="horizontal">
                    <a className="active col-md" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
                      <i className="icon-wallet"></i> Wallet </a>
                    <a className="col-md" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-paper" role="tab" aria-controls="v-pills-paper" aria-selected="false">
                      <i className="icon-whitepaper"></i> White Paper </a>
                    <a className="col-md" id="v-pills-report-tab" data-toggle="pill" href="#v-pills-reports" role="tab" aria-controls="v-pills-reports" aria-selected="false">
                      <i className="icon-report"></i> Audits </a>
                    <a className="col-md" id="v-pills-ico-tab" data-toggle="pill" href="#v-pills-ICO" role="tab" aria-controls="v-pills-ICO" aria-selected="false">
                      <i className="icon-structure"></i> ICO Structure </a>
                  </div>
                  
                  <div className="road-map-tab">
                    <div className="tab-content" id="v-pills-tabContent">
                      <div className="tab-pane tab_item_1 show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <div className="row">
                          <div className="col-md-6 align-self-center">
                            <div className="xs-tabs-content">
                              <h3 className="xs-single-title underline">The BlocVault App</h3>
                              <span className="release_vertion"> I Am Coming soon </span>
                              <ul className="download-logo">
                                {/* <li>
                                  <img src="assets/images/documentation/windows_logo-1.png" alt=""/>
                                </li>
                                <li>
                                  <img src="assets/images/documentation/windows_logo-2.png" alt=""/>
                                </li> */}
                                <li>
                                  <img src="assets/images/documentation/mac_ico.png" alt=""/>
                                </li>
                                {/* <li>
                                  <img src="assets/images/documentation/linux_1.png" alt=""/>
                                </li> */}
                                <li>
                                  <img src="assets/images/documentation/android_1.png" alt=""/>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="xs-tabs-img">
                              <img src="assets/images/documentation/wallter_phones.png" alt=""/>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="tab-pane tab_item_2" id="v-pills-paper" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="xs-tabs-img text-center">
                              <img src="assets/images/documentation/whitepaper.png" alt=""/>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="xs-white-tabs-content">
                              <h3 className="xs-single-title">Download Whitepaper</h3>
                              <p> Please download our whitepaper below Blocvault is a multi module application that will generate revenue and rewards for its community. Our aim is to change how we interact with our digital assets. </p>
                              <a href={process.env.PUBLIC_URL + '/assets/pdf/BV-FINAL.pdf'} className="btn btn-primary sm-btn" download>Download Now</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="tab-pane tab_item_3" id="v-pills-reports" role="tabpanel" aria-labelledby="v-pills-report-tab">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="xs-white-tabs-content">
                              <p>Techrate audit coming soon. Please check back for updates as we are working hard updating information daily.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="tab-pane tab_item_4" id="v-pills-ICO" role="tabpanel" aria-labelledby="v-pills-ico-tab">
                        <div className="ico-table table-responsive">
                          <table className="table">
                            <tr>
                              <td>Pre-Sale Starts</td>
                              <td>To Be Confirmed</td>
                            </tr>
                            <tr>
                              <td>Pre-Sale Period</td>
                              <td>To Be Confirmed</td>
                            </tr>
                            <tr>
                              <td>Pre-Sale Cap</td>
                              <td>To Be Confirmed</td>
                            </tr>
                            <tr>
                              <td>Pre-Sale Terms</td>
                              <td>To Be Confirmed</td>
                            </tr>
                            <tr>
                              <td>Token Sale Starts</td>
                              <td>To Be Confirmed</td>
                            </tr>
                            <tr>
                              <td>Token Sale Period</td>
                              <td>To Be Confirmed</td>
                            </tr>
                            <tr>
                              <td>Soft Cap</td>
                              <td>To Be Confirmed</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            
            <div className="documentaion-shap-img">
              <img className="d-shap-img-1 wow fadeInLeft" data-wow-duration="1.5s" id="leftglobe" src="assets/images/documentation/globe1.png" alt=""/>
              <img className="d-shap-img-2 wow fadeInRight" data-wow-duration="1.5s" src="assets/images/documentation/globe2.png" alt=""/>
            </div>
          </section>
          
{/*           
          <section className="team-sec section-padding" id="team">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <div className="section-title-item">
                    <small className="xs-section-title">Our experts</small>
                    <h2 className="section-title">Team Members</h2>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-duration="1.5s">
                  <div className="single-team">
                    <div className="team-img">
                      <img src="assets/images/team/team_1.jpg" alt=""/>
                      <div className="team-social">
                        <a href="#">
                          <i className="icon icon-facebook"></i>
                        </a>
                        <a href="#">
                          <i className="icon icon-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="icon icon-linkedin"></i>
                        </a>
                      </div>
                    </div>
                    <div className="team-content">
                      <h3 className="xs-title md">Edward Joseph</h3>
                      <p>CEO</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-duration="2s">
                  <div className="single-team">
                    <div className="team-img">
                      <img src="assets/images/team/team_2.png" alt=""/>
                      <div className="team-social">
                        <a href="#">
                          <i className="icon icon-facebook"></i>
                        </a>
                        <a href="#">
                          <i className="icon icon-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="icon icon-linkedin"></i>
                        </a>
                      </div>
                    </div>
                    <div className="team-content">
                      <h3 className="xs-title md">Jenifar Lorany</h3>
                      <p>Marketing Head</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-duration="2.5s">
                  <div className="single-team">
                    <div className="team-img">
                      <img src="assets/images/team/team_3.png" alt=""/>
                      <div className="team-social">
                        <a href="#">
                          <i className="icon icon-facebook"></i>
                        </a>
                        <a href="#">
                          <i className="icon icon-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="icon icon-linkedin"></i>
                        </a>
                      </div>
                    </div>
                    <div className="team-content">
                      <h3 className="xs-title md">Akimoto Akira</h3>
                      <p>Senior Developer</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-duration="3s">
                  <div className="single-team">
                    <div className="team-img">
                      <img src="assets/images/team/team_4.png" alt=""/>
                      <div className="team-social">
                        <a href="#">
                          <i className="icon icon-facebook"></i>
                        </a>
                        <a href="#">
                          <i className="icon icon-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="icon icon-linkedin"></i>
                        </a>
                      </div>
                    </div>
                    <div className="team-content">
                      <h3 className="xs-title md">Liu Ping</h3>
                      <p>Senior Developer</p>
                    </div>
                  </div>
                </div>
                
              </div>
              
            </div>
          </section> */}
          
        </div>
      </>
    );
  }
  
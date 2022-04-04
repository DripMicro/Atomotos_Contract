import React, { Component }  from 'react';
export default function Blog() {
    return (
      <div className="blog-and-footer-area">
        <div className="blog-and-social-area">
        
        <section className="blog-sec section-padding" id="blog">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <div className="section-title-item">
                  {/* <small className="xs-section-title">Media Coverage</small>
                  <h2 className="section-title">Blog and Media</h2> */}
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-lg-7 wow fadeInUp" data-wow-duration="1.5s">
                <div className="blog-featured-post">
                  <a href="#">
                    <div className="blog-feaured-img">
                      <img src="assets/images/blog/blog-featured-img2.png" alt=""/>
                    </div>
                    <div className="blog-featured-content">
                      <span className="post-meta-date"></span>
                      <h3 className="xs-blog-title"> Manage and track all of your assets across multiple networks with the BV-App </h3>
                    </div>
                  </a>
                </div>
              </div>
              
              <div className="col-lg-5 wow fadeInUp" data-wow-duration="2s">
                <div className="blog-post">
                  <div className="single-blog-post media">
                    <div className="d-flex post-img">
                      <img src="assets/images/blog/blog_post_1.jpg" alt="blog post image" draggable="false"/>
                    </div>
                    <div className="media-body">
                      <span className="post-meta-date">  </span>
                      <h4 className="xs-post-title">
                        <a href="">Secure your assets in the BV-Vault, An offline in app solution that's safe.</a>
                      </h4>
                    </div>
                  </div>
                  
                  <div className="single-blog-post media">
                    <div className="d-flex post-img">
                      <img src="assets/images/blog/blog_post_2.jpg" alt="blog post image" draggable="false"/>
                    </div>
                    <div className="media-body">
                      <span className="post-meta-date">  </span>
                      <h4 className="xs-post-title">
                        <a href="">The worlds best wallet and app solution for NFT's and cross chain tokens.</a>
                      </h4>
                    </div>
                  </div>
                  
                  <div className="single-blog-post media">
                    <div className="d-flex post-img">
                      <img src="assets/images/blog/blog_post_3.jpg" alt="blog post image" draggable="false"/>
                    </div>
                    <div className="media-body">
                      <span className="post-meta-date">  </span>
                      <h4 className="xs-post-title">
                        <a href="">Swap assets and track your portfolio across multiple network in BV-Swap</a>
                      </h4>
                    </div>
                  </div>
                  
                </div>
                
              </div>
              
            </div>
            
          </div>
        </section>
        
        
        <section className="social-list-sec section-padding" >
          <div className="container">
            <div className="row">
              <div className="col-lg col-6 col-md-3 wow fadeInUp" data-wow-duration=".5s">
                <div className="single-social-list facebook">
                  <i className="fa fa-facebook"></i>
                  <h3 className="xs-title sm">Facebook</h3>
                  <a href="https://www.facebook.com/profile.php?id=100073562438224">
                    <span className="icon icon-arrow-right"></span>
                  </a>
                </div>
              </div>
              
              <div className="col-lg col-6 col-md-3 wow fadeInUp" data-wow-duration="1s">
                <div className="single-social-list twitter">
                  <i className="fa fa-twitter"></i>
                  <h3 className="xs-title sm">Twitter</h3>
                  <a href="https://twitter.com/BlocVaultAPP">
                    <span className="icon icon-arrow-right"></span>
                  </a>
                </div>
              </div>
              
              <div className="col-lg col-6 col-md-3 wow fadeInUp" data-wow-duration="2s">
                <div className="single-social-list slack">
                  <i className="fa fa-telegram"></i>
                  <h3 className="xs-title sm">Telegram</h3>
                  <a href="https://t.me/joinchat/Y_8OpWZHxrQ3Njlk">
                    <span className="icon icon-arrow-right"></span>
                  </a>
                </div>
              </div>
              
              <div className="col-lg col-6 col-md-3 wow fadeInUp" data-wow-duration="2.5s">
                <div className="single-social-list bitcoin">
                  <i className="fa fa-reddit"></i>
                  <h3 className="xs-title sm">Reddit</h3>
                  <a href="https://www.reddit.com/r/BlocVault/">
                    <span className="icon icon-arrow-right"></span>
                  </a>
                </div>
              </div>
              
              <div className="col-lg col-6 col-md-3 wow fadeInUp" data-wow-duration="3s">
                <div className="single-social-list youtube">
                  <i className="fa fa-youtube-play"></i>
                  <h3 className="xs-title sm">Youtube</h3>
                  <a href="https://www.youtube.com/watch?v=G5Hy4-ri6b4">
                    <span className="icon icon-arrow-right"></span>
                  </a>
                </div>
              </div>
      
              <div className="col-lg col-6 col-md-3 wow fadeInUp" data-wow-duration="3.5s">
                <div className="single-social-list medium">
                  <img src="assets/images/icon/discord.png"/>
                  <h3 className="xs-title sm">Discord</h3>
                  <a href="https://discord.gg/UtRuw6yv">
                    <span className="icon icon-arrow-right"></span>
                  </a>
                </div>
              </div>
              
            </div>
            
          </div>
        </section>
        
      </div>
      </div>
    );
  }
  
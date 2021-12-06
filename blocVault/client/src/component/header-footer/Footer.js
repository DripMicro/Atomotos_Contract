export default function Footer() {
 
    return (
    <div className="blog-and-footer-area">
        <footer className="xs-footer-sec">
        <div className="container">
          <div className="footer-area">
            <div className="row">
              <div className="col-lg-3 offset-lg-1 col-sm-6">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <a href="index.html">
                      <img src="assets/images/trypto_logo_blue.png" alt=""/>
                    </a>
                  </div>
                  <p> I am the future of crypto  BUY, SELL, SWAP, TRADE, and more. I Am Coming & I will be used by you. </p>
                </div>
              </div>
              
              <div className="col-lg-3 offset-lg-4 col-sm-6">
                <div className="footer-widget">
                  <h4 className="widget-title">Contact</h4>
                  <form method="get" className="widget-subscibe">
                    <input type="email" name="email" className="subscribe-email" placeholder="Email"/>
                    <button type="submit" className="subs-btn"><i className="fa fa-paper-plane"></i>
                    </button>
                  </form>
                  <ul>
                    
                    <li>info@blocvault.io</li>
                  </ul>
                </div>
              </div>
              
            </div>
            
          </div>
          
          
          <div className="footer-copyright">
            <p> Copyright © 2021 BlocVault </p>
          </div>
        </div>
        
      </footer>
    </div>
    );
  }
  
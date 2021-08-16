import React from 'react';
import {businessName} from '@mara/shared';


const Footer = () => {

  return (
    <React.Fragment>
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              © 2021 {businessName} <span className="d-none d-sm-inline-block"> - All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;

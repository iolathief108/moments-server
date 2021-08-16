import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { deAuthorize, sdk } from '@mara/shared';

class Logout extends Component {
    /**
     * Redirect to login
     */
    componentDidMount = () => {
        // emit the event
        sdk().vendorLogout().then(res => {
            if (res.data.vendorLogout) {
                deAuthorize();
                this.props.history.push('/login');
            }
        }).catch(e => console.log(e));
    };

    render() {
        return <React.Fragment />;
    }
}

export default withRouter(Logout);

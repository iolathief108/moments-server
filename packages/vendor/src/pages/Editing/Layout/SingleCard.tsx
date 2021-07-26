import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';
import {Col, Row} from 'reactstrap';


interface SingleCardProps {
    title: string
    full?: boolean
}

const SingleCard: FunctionComponent<SingleCardProps> = props => {
    return (
        <React.Fragment>
            <div className="container-fluid">

                {/* title thing */}
                <Row className="align-items-center">
                    <Col sm={6}>
                        <div className="page-title-box">
                            <h4 className="font-size-18">{props.title}</h4>
                            {/* <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item">
                                    <Link to="#">Veltrix</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="#">Forms</Link>
                                </li>
                                <li className="breadcrumb-item active">Form Editors</li>
                            </ol> */}
                        </div>
                    </Col>
                </Row>

                {/* Contact Details */}
                {
                    !props.full ?
                        <Row>
                            <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 ">
                                {props.children}
                            </div>
                        </Row>
                        :
                        <div>
                            {props.children}
                        </div>
                }
            </div>
        </React.Fragment>
    );
};

export default SingleCard;
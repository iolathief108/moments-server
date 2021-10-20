type propsThing = {
    iconClassName: string,
    title: string, val: any
}

function Thing(props: propsThing) {
    return (
        <div className="dbox w-100 d-flex align-items-start pb-3">
            <div className="icon d-flex align-items-center justify-content-center mt-1">
                <span className={props.iconClassName}></span>
            </div>
            <div className="text pl-3">
                <p style={{fontFamily: 'roboto, sans-serif'}}>
                    <span className={'font-weight-bold'}>{props.title}:</span> <span style={{color: typeof props.val !== 'string' && 'rgb(34 124 255 / 91%)'}}>{props.val}</span>
                </p>
            </div>
        </div>
    );
}

function Container(props) {
    return (
        <div style={{
            paddingBottom: '10%',
            paddingTop: '13%',
            textAlign: 'center',
        }}>
            <div className="row justify-content-center" style={{width: '100%'}}>
                <div className="col-lg-10 col-md-12">
                    <div className="wrapper">
                        <div className="row no-gutters">
                            <div className="col-md-5 d-flex align-items-stretch">
                                <div className="info-wrap w-100 p-lg-5 p-4"
                                     style={{backgroundColor: 'rgb(255 11 126 / 12%)', borderRadius: '10px'}}>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ContactUs() {
    return (
        <div>
            <Container>
                {/*<h3 className="mb-4 mt-md-4">Contact us</h3>*/}
                <div style={{fontSize: '1.1rem'}}>
                    <Thing iconClassName={'fa fa-map-marker'} title={'Address'}
                           val={'91/16, Dematagoda Road, Colombo 10.'}/>
                    <Thing iconClassName={'fa fa-phone'} title={'Phone'}
                           val={<a href="tel://+94775737981">+94 77 573 7981</a>}/>
                    <Thing iconClassName={'fa fa-paper-plane'} title={'Email'} val={<a
                        href="mailto:momentslk21@gmail.com">momentslk21@gmail.com</a>}/>
                    {/*<Thing iconClassName={'fa fa-globe'} title={'Website'} val={<a href="#">yoursite.com</a>}/>*/}
                </div>
            </Container>
        </div>
    );
}

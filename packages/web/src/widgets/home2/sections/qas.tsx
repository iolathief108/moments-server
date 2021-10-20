import {FunctionComponent, useState} from 'react';
import {commonState} from '../../../state';


export function Line() {
    return (
        <div style={{borderBottom: '1.5px solid #0002', marginBottom: '17px', marginTop: '17px'}}></div>
    );
}

type AnswerProps = {
    isClosed: boolean
    answer: FunctionComponent | string
}
const Answer = (props: AnswerProps) => {
    return (
        <div style={{
            maxHeight: props.isClosed ? 0 : '1000px',
            overflow: 'hidden',
            transition: `all ${props.isClosed ? 0.3 : 1.2}s ease`,
            // transition: `${props.isClosed ? 'height' : 'max-height'} 0.7s ease`,
        }}>
            <p style={{
                fontFamily: 'roboto, sans-serif',
                color: '#666f',
                lineHeight: '22px',
                fontWeight: 400,
                paddingTop: '16px'
            }}>
                {props.answer}
            </p>
        </div>
    );
};

type QuestionProps = {
    isClosed: boolean
    question: string
    clickAction: () => void
}
const Question = (props: QuestionProps) => {
    return (
        <div style={{
            display: 'flex',
            cursor: 'pointer',
        }}
             onClick={props.clickAction}
        >
            <i style={{alignSelf: 'flex-start', marginTop: '5px', marginRight: '19px'}} className={props.isClosed ? 'fa fa-angle-down' : 'fa fa-angle-up'}></i>
            <div><p className={''} style={{fontWeight: 500, lineHeight: '21px', color: '#333', fontFamily: 'roboto, sans-serif'}}>{props.question}</p></div>
        </div>
    );
};

type QaProps = {
    question: string
    answer: FunctionComponent | string
}
export const Qa = (props: QaProps) => {
    const [isMobile] = commonState.useGlobalState('isMobile');
    const [open, setOpen] = useState<boolean>(!isMobile);

    return (
        <div style={{}}>
            <Question isClosed={open} question={props.question} clickAction={() => setOpen(!open)}/>
            <Answer isClosed={open} answer={props.answer}/>
            <Line/>
        </div>
    );
};


export const Qas = () => {
    return (
        <div className={'container pt-5 pb-5'}>
            <div className="row">
                <div className="col-lg-4">
                    <h4 className={'serif text-center text-sm-left h3 pb-4 pt-lg-3'}>Frequently Asked Questions</h4>
                </div>
                <div className={'col-lg-8'}>
                    <Line/>
                    <Qa question={'How does Moments decide which wedding vendors can join its community?'} answer={'We carefully pre-screen every vendor to ensure that they have a track record of delivering exceptional wedding services to couples. We also require every vendor to take our vendor pledge and get recommendations from past clients and peers before we publish their listing.'}/>
                    <Qa question={'What wedding vendors do we need to book?'} answer={'A standard wedding vendor list includes a Venue, Photographer, Videographer, Caterer, Cakes & Desserts, and Florist all of which we’ll help you find at Moments. We also have Expert Advice on how to book other wedding services you may need, like a Musician Or DJ, Beauty Professional, attire, and more.'}/>
                    <Qa question={'Which wedding vendors should we reach out to first?'} answer={'If you’re just starting to plan, we recommend finding a Venue first. Already have a venue? We’ll Help You Look for a Photographer who can capture every moment of your special day. Checked off both of those to-dos? We’ll help you find these vendors, too: Videographer, Caterer, Florist, and Beauty Professional (with more to come!).'}/>
                </div>
            </div>
        </div>
    );
};


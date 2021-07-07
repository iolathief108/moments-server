import {useState} from 'react';
import FAQStyle from '../../../styles/store-front-comps/Faqs.module.scss';
import {VendorDetailsBQuery} from '../../../http/generated';


function Question({qn, ans}: {qn: string, ans: string}) {
    const [open, setOpen] = useState(false);

    return (
        <div style={{
            paddingBottom: '8px',
            paddingTop: '12px',
            // borderTop: '2px solid #d9d9d9',
            borderBottom: '1.5px solid #d9d9d9',
        }}>
            <button onClick={() => setOpen(!open)} className={FAQStyle.accortionButton} style={{}}>
                <h5 style={{fontWeight: 400}}>{open ? '- ' : '+ '} {qn}</h5>
            </button>
            <p style={{
                display: open ? 'block' : 'none',
                paddingBottom: '10px',
            }}>{ans}</p>
        </div>
    );
}

export function Faqs({data}: {data: VendorDetailsBQuery}) {
    if (!data.vendorDetailsB?.frequent_questions.length)
        return null;

    return (
        <div style={{
            marginTop: '70px',
            marginBottom: '60px',
        }}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-7 '}>

                        <h2>Frequently Asked Question</h2>
                        <p>{data.vendorDetailsB.frequent_questions.length} Answers</p>
                        <div style={{borderTop: '1.5px solid #d9d9d9', marginBottom: '5px'}}/>
                        {
                            data.vendorDetailsB?.frequent_questions.map(item => (
                                <Question qn={item.question} ans={item.answer}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
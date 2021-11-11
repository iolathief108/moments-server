import Template, {ViewProps} from '../Layout/Template';
import {
    EditVendorDetailsMutationVariables,
    FrequentQuestion,
    FrequentQuestionInput,
    VendorDetailsExtra,
} from '../../../../../shared';
import {useState} from 'react';
import {Button} from 'reactstrap';


function View(props: ViewProps) {

    const FrView = (fq: FrequentQuestion) => {
        return (
            <div>
                <span className={'font-weight-bold'}>
                    {fq.question}
                </span>
                <p>{fq.answer}</p>
            </div>
        );
    };

    return (
        <div>
            {props?.vDetails?.frequent_questions.map((value, index) => {
                return (
                    <FrView key={index} question={value.question} answer={value.answer}/>
                );
            })}
        </div>
    );
}


export function Frequent() {
    const [frequents, setFrequents] = useState<FrequentQuestionInput[]>([]);

    const onEditMode = (vDetails: VendorDetailsExtra) => {
        setFrequents(vDetails?.frequent_questions || []);
    };

    const onSubmit = () => {

        let viva: EditVendorDetailsMutationVariables = {
            frequentQuestion: frequents,
        };
        return viva;
    };

    type QuestionProps = {
        questionIndex: number
    }
    const Question = ({questionIndex}: QuestionProps) => {

        return (
            <>
                <div className={'d-flex'}>
                    <div>{questionIndex + 1}.{' '}</div>
                    <div>
                        <textarea
                            // type="text"
                            value={frequents[questionIndex].question || ''}
                            style={{
                                minWidth: '300px',
                                minHeight: '100px'
                            }}
                            placeholder={'Question'}
                            onChange={val => {
                                let newFr = frequents;
                                newFr[questionIndex].question = val.target.value;
                                setFrequents([...newFr]);
                            }}
                        /><br/>
                        <textarea
                            // type="text"
                            value={frequents[questionIndex].answer || ''}
                            placeholder={'Answer'}
                            onChange={val => {
                                let newFr = frequents;
                                newFr[questionIndex] = {...newFr[questionIndex], answer: val.target.value};
                                setFrequents([...newFr]);
                            }}
                        />
                    </div>
                </div>
                <Button className={'btn-danger ml-2 mt-2'} onClick={() => {
                    let newFr = frequents;
                    newFr.splice(questionIndex, 1);
                    setFrequents([...newFr]);
                }}>delete
                </Button>
            </>
        );
    };

    const Edit = () => {

        return (
            <div>
                {
                    frequents?.map((value, index) => (
                        <div key={index}>
                            {Question({questionIndex: index})}
                        </div>
                    ))
                }
                <Button className={'mt-3'} onClick={() => {
                    setFrequents([...frequents, {question: '', answer: ''}]);
                }}> Add Quesiton</Button>
            </div>
        );
    };

    return (
        <Template title={'Frequent Question'} onEditMode={onEditMode} View={View}
                  onSubmitVariables={onSubmit}>
            {Edit()}
        </Template>
    );
}

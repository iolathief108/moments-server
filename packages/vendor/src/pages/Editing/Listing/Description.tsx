import React from 'react';
import {AvField} from 'availity-reactstrap-validation';
import Template, {EditProps, ViewProps} from '../Layout/Template';


const getDescription = (description?: string) => {
    if (!description) {
        return null;
    }
    let wow = description;
    wow = wow.replace('\n\n\n', '\n\n');
    const sep = wow.split('\n');
    let final: string[][] = [[]];
    for (let ss of sep) {
        if (ss !== '') {
            final[final.length - 1].push(ss);
        } else {
            final.push([]);
        }
    }
    return (
        final.map((i, index) => (
            <p key={index}>
                {
                    i.map(
                        (r, index) =>
                            <span key={index}>
                                {r}
                                <br/>
                            </span>,
                    )
                }
            </p>
        ))
    );
};

const validateDescription = (value) => {
    if (value?.length < 10) {
        return 'should be more that 10 characters';
    }
    return true;
};

const Description = () => {

    const View = (props: ViewProps) => {
        return (
            <div>
                {getDescription(props.vDetails?.description) ||
                <span className={'text-danger'}>No data has been added yet</span>}
            </div>
        );
    };

    const Edit = (props: EditProps) => {
        return (
            <div>
                <AvField
                    name="About"
                    placeholder="Type your description here"
                    type="textarea"
                    style={{height: '100px'}}
                    disabled={props.globalLoading}
                    validate={{validate: validateDescription, required: {value: true}}}
                    value={props.vDetails?.description || undefined}
                />
            </div>
        );
    };

    const onSubmit = (_event: any, values: any) => {
        return {
            description: values.About,
        };
    };

    return (
        <Template onSubmitVariables={onSubmit} View={View} Edit={Edit} title={'About'}
                  desc={'Briefly describe your offering'}/>
    );
};

export default Description;

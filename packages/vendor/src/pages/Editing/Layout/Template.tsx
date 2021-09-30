// noinspection DuplicatedCode

import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, CardBody, FormGroup} from 'reactstrap';
import {EditVendorDetailsMutationVariables, sdk, VendorDetailsExtra} from '@mara/shared';
import {AvForm, AvField} from 'availity-reactstrap-validation';


interface FrameProps {
    title?: string;
    desc?: string;
}

const Frame = (props: React.PropsWithChildren<FrameProps>) => {
    return (
        <Card>
            <CardBody>
                <div className={'headings mb-4'}>
                    {
                        props.title && <h4 className="card-title mb-2">{props.title}</h4>
                    }
                    {
                        props.desc &&
                        <p className="card-title-desc">
                            {props.desc}
                        </p>
                    }
                </div>
                <div>
                    {props.children}
                </div>
            </CardBody>
        </Card>
    );
};

interface EditModeProps {
    onCancel: () => void;
    disabled: boolean;
}

const EditModeButtons = (props: EditModeProps) => {

    return (
        <FormGroup className="mb-0 mt-4">
            <div>
                <Button className="mr-2" onClick={props.onCancel}>Cancel</Button>
                <Button type="submit" color="primary" className="mr-1" disabled={props.disabled}>
                    Submit
                </Button>
            </div>
        </FormGroup>
    );
};

interface ErrorDisplayProps {
    error?: string;
}

const ErrorDisplay = (props: ErrorDisplayProps) => {
    return (
        <div>
            {props.error ? (
                <Alert color="danger">{props.error}</Alert>
            ) : null}
        </div>
    );
};

export interface ViewProps {
    vDetails: VendorDetailsExtra;
    globalLoading: boolean;
}

export interface EditProps extends ViewProps {
    setError: Function;
}
export type SubmitType = (_event:any, values: any) => EditVendorDetailsMutationVariables | null
interface BlaProps {
    View: (props: ViewProps) => JSX.Element;
    Edit?: (props: EditProps) => JSX.Element;
    desc?: string;
    title?: string;
    onSubmitVariables: SubmitType;
    submitLoading?: boolean
    onViewMode?: () => void
    onEditMode?: (vDetails: VendorDetailsExtra) => void
}

const Template = (props: React.PropsWithChildren<BlaProps>) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [error, setError] = useState<string>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [vDetails, setVDetails] = useState<VendorDetailsExtra>(null);

    useEffect(() => {
        if (editMode) {
            if (vDetails && props.onEditMode) {
                props.onEditMode(vDetails);
            }
            return;
        };
        if (vDetails && props.onViewMode) {
            props.onViewMode()
        }
        sdk().getVendorDetailsExtra().then(res => {
            console.log(res);
            if (res.data.vendorDetailsExtra) {
                setVDetails(res.data.vendorDetailsExtra);
            }
            setLoading(false);
        }).catch(e => {
            setError('Oops! Something went wrong!');
            setLoading(false);
        });


    }, [editMode]);

    async function onSubmit(_event: any, values: any) {
        setLoading(true);

        try {
            const variables = await props.onSubmitVariables(_event, values)
            if (!variables) {
                setLoading(false)
            }
            const editVD = await sdk().editVendorDetails(variables);

            if (editVD.data.vendorEditDetails) {
                setTimeout(() => {
                    if (error) {
                        setError(null);
                    }
                }, 800);
                setEditMode(false);
            } else {
                setError('Oops! Something went wrong!');
            }
            setLoading(false);

        } catch (e) {
            //@ts-ignore
            setError(e.response?.errors[0]?.message || 'Oops! Something went wrong');
            setLoading(false);
        }
    }

    if (!editMode) {
        return (
            <Frame title={props.title} desc={props.desc}>
                <props.View globalLoading={loading} vDetails={vDetails}/>
                <Button onClick={() => setEditMode(true)}>Edit</Button>
            </Frame>
        );
    }

    return (
        <Frame title={props.title} desc={props.desc}>
            <AvForm
                onValidSubmit={onSubmit}
            >
                <ErrorDisplay error={error}/>
                {
                    props.children ?
                        props.children :
                        props.Edit &&
                        <props.Edit setError={setError} globalLoading={loading} vDetails={vDetails}/>
                }
                <EditModeButtons onCancel={() => setEditMode(false)} disabled={loading || props.submitLoading}/>
            </AvForm>
        </Frame>
    );
};

export default Template;


import Template, {EditProps, ViewProps} from '../Layout/Template';
import {AvField} from 'availity-reactstrap-validation';
import React from 'react';
import {EditVendorDetailsMutationVariables, isNumeric, VendorType} from '@mara/shared';
import {getGlobalState} from '../../../state';

function validateGC(val: string) {
    if (!isNumeric(val)) {
        return 'Guest capacity should be a number'
    }
    const eh = parseInt(val)
    if (eh > 3000 || eh <10) {
        return 'Guest capacity should be greater than 20 or less than 2500'
    }
    return true
}


const GuestCapacity = () => {

    const View = (props: ViewProps) => {
        return (
            <div>
                <p>guest capacity:</p>
                {props?.vDetails?.vendorTypes?.venue_type?.guestCapacity}
            </div>
        );
    };

    const Edit = (props: EditProps) => {
        return (
            <div>
                <AvField
                    name="guestCapacity"
                    placeholder="Maximum Guest Capacity"
                    disabled={props.globalLoading}
                    validate={{validate: validateGC, required: {value: true}}}
                    value={props.vDetails?.vendorTypes?.venue_type?.guestCapacity || undefined}
                />
            </div>
        );
    };

    const onSubmit = (_event: any, values: any):EditVendorDetailsMutationVariables => {
        return {
            venueDetails: {
                guestCapacity: parseInt(values.guestCapacity)
            },
        };
    };

    if (getGlobalState('category') !== VendorType.Venue)
        return null

    return (
        <Template onSubmitVariables={onSubmit} View={View} Edit={Edit} title={'Guest Capacity'}/>
    );
};

export default GuestCapacity;

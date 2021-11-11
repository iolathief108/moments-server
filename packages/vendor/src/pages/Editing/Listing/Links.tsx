import React from 'react';
import {AvField} from 'availity-reactstrap-validation';
import Template, {EditProps, ViewProps} from '../Layout/Template';


function nullItPussy(val?: string | null) {
    if (!val) return null;
    if (val === '') return null;
    return val;
}

const linkValidator = type => (value: string) => {

    let temp: any = value
        .replace(/ +/g, '');
    if (!temp) {
        return true;
    }

    if (type === 'facebook') {
        const pattern = /^(?:https:\/\/)?(?:www\.)?facebook\.com\/[a-z0-9-_]{1,255}\/?$/i;
        if (!pattern.test(value)) {
            return false;
        }
    }

    if (type === 'instagram') {
        const pattern = /^(?:https:\/\/)?(?:www\.)?instagram\.com\/[a-z0-9-_]{1,255}\/?$/i;
        if (!pattern.test(value)) {
            return false;
        }
    }
    if (type === 'pinterest') {
        const pattern = /^(?:https:\/\/)?(?:www\.)?pinterest\.(?:co\.uk|com)\/[a-z0-9-_]{1,255}(?:\/|\/[a-z0-9-_]{1,255}\/?)?$/i;
        if (!pattern.test(value)) {
            return false;
        }
    }
    if (type === 'website') {
        const pattern = /^https?:\/\/(:?www\.)?[a-z0-9-_]{1,255}\.(com|lk)\/?$/;
        if (!pattern.test(value)) {
            return false;
        }
    }
    return true;
};

const Links = function () {

    const View = (props: ViewProps) => {
        return (
            <div>
                <dl className="row">
                    <dt className="col-sm-3">Facebook</dt>
                    <dd className="col-sm-9">{props.vDetails?.links?.facebook ??
                    <span className={'text-danger'}>Not set</span>}</dd>

                    <dt className="col-sm-3">Instagram</dt>
                    <dd className="col-sm-9">{props.vDetails?.links?.instagram ??
                    <span className={'text-danger'}>Not set</span>}</dd>

                    <dt className="col-sm-3">Pinterest</dt>
                    <dd className="col-sm-9">{props.vDetails?.links?.pinterest ??
                    <span className={'text-danger'}>Not set</span>}</dd>

                    <dt className="col-sm-3">Website</dt>
                    <dd className="col-sm-9">{props.vDetails?.links?.website ??
                    <span className={'text-danger'}>Not set</span>}</dd>
                </dl>
            </div>
        );
    };

    const Edit = (props: EditProps) => {
        return (
            <div>
                <AvField
                    name="instagram"
                    label="Instagram"
                    placeholder="your Instagram Account"
                    type="text"
                    disabled={props.globalLoading}
                    validate={{myValidation: linkValidator('instagram'), required: {value: false}}}
                    value={props.vDetails?.links?.instagram || undefined}
                />
                <AvField
                    name="facebook"
                    label="Facebook"
                    placeholder="Facebook Page Url"
                    type="text"
                    disabled={props.globalLoading}
                    value={props.vDetails?.links?.facebook || undefined}
                    validate={{myValidation: linkValidator('facebook'), required: {value: false}}}
                />
                <AvField
                    name="pinterest"
                    label="Pinterest"
                    placeholder="Pinterest Page Url"
                    type="text"
                    disabled={props.globalLoading}
                    value={props.vDetails?.links?.pinterest || undefined}
                    validate={{myValidation: linkValidator('pinterest'), required: {value: false}}}
                />
                <AvField
                    name="website"
                    label="Website"
                    placeholder="Website"
                    type="text"
                    disabled={props.globalLoading}
                    value={props.vDetails?.links?.website || undefined}
                    validate={{myValidation: linkValidator('website'), required: {value: false}}}
                />
            </div>
        );
    };

    const onSubmit = (_event: any, values: any) => {

        if (values.facebook)
            values.facebook = values.facebook.startsWith('http') ? values.facebook : 'https://' + values.facebook;
        if (values.instagram)
            values.instagram = values.instagram.startsWith('http') ? values.instagram : 'https://' + values.instagram;
        if (values.pinterest)
            values.pinterest = values.pinterest.startsWith('http') ? values.pinterest : 'https://' + values.pinterest;

        return {
            facebook: nullItPussy(values.facebook),
            instagram: nullItPussy(values.instagram),
            pinterest: nullItPussy(values.pinterest),
            website: nullItPussy(values.website),
        };
    };

    return (
        <Template title={'Links'} View={View} Edit={Edit} onSubmitVariables={onSubmit}/>
    );
};

export default Links;

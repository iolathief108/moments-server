import {Button, Card, CardBody} from 'reactstrap';
import SingleCard from './Layout/SingleCard';
import React, {useEffect, useState} from 'react';
import {sdk, Clap, StoreClap} from '@mara/shared';
import {getGlobalState} from '../../state';
import Select from 'react-select';
import Location from './Location';
import Contacts from './Contacts';
import Description from './Description';


let tempClaps: Clap[] = [];

const Ghost = () => {

    const [loading, setLoading] = useState(true);
    const [clapStores, setClapStores] = useState<StoreClap[]>(null);
    const [claps, setClaps] = useState<Clap[]>(null);
    const [_editMode, _setEditMode] = useState(false);
    const [error, setError] = useState<string>(null);

    const damn = async () => {
        const res = await sdk().getVendorDetailsExtra();
        let dd = res.data.vendorDetailsExtra.claps || [];

        let keys: string[] = [];
        for (let ddElement of dd) {
            if (keys.find(i => i === ddElement.key)) {
                dd = [];
                break;
            }
            keys.push(ddElement.key);
        }
        setClaps(dd);
        tempClaps = dd || [];
    };

    useEffect(() => {
        (async function () {
            try {
                //push it to temp thing
                // const res = await sdk().getVendorDetailsExtra();
                // let dd = res.data.vendorDetailsExtra.claps || []
                //
                // let keys: string[] = [];
                // for (let ddElement of dd) {
                //     if (keys.find(i => i === ddElement.key)) {
                //         dd = []
                //         break;
                //     }
                //     keys.push(ddElement.key);
                // }
                // setClaps(dd);
                // tempClaps = dd || [];
                await damn();
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    const changeEditMode = async (editMode: boolean) => {
        if (editMode) {
            tempClaps = claps;
            setLoading(true);
        } else {
            _setEditMode(false);
            setClapStores(null);
        }

        await damn();


        if (editMode && !clapStores) {
            const clapStore = sdk().getClapStore({vendorType: getGlobalState('category')});
            setClapStores((await clapStore).data.clapStore);
        }
        _setEditMode(editMode);
        setLoading(false);
    };

    const onSubmit = async () => {
        try {
            //check tempClap
            let keys: string[] = [];
            for (let tempClap of tempClaps) {
                if (keys.find(i => i === tempClap.key)) {
                    tempClaps = [];
                    await sdk().editVendorDetails({
                        claps: [],
                    });
                    setClaps([]);
                    setError('duplicate key found');
                    return;
                }
                keys.push(tempClap.key);
            }
            const res = await sdk().editVendorDetails({
                claps: tempClaps,
            });
            if (!res.data.vendorEditDetails) {
                setError('something went wrong!');
                return;
            }
            setClaps(tempClaps);
            tempClaps = [];
        } catch (e) {
            console.log(e);
        }
        changeEditMode(false);
    };

    const onSelect = (key, name) => (v: {value: string}[]) => {
        for (const tempClap of tempClaps) {
            if (tempClap.key === key || tempClap.name === name) {
                tempClap.values = v.map(i => i.value);
                return;
            }
        }
        tempClaps.push({
            name,
            key,
            values: v.map(i => i.value),
        });
    };

    if (!_editMode) {
        return (
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">Key Informations</h4>
                        <ul className={'list-unstyled mb-4'}>

                        {
                            (!loading && claps && claps.length) ? claps.map(clap => (
                                <li key={clap.key} className={'mb-3'}>
                                    {/*<p className={'card-title-desc'}>{clap.name}</p>*/}
                                    {clap.name}
                                    <ul className={'pt-1 pl-4'}>
                                        {
                                            clap?.values.map(value => (
                                                <li key={value}>
                                                    {value}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            )) : <p className="text-danger">No data has been added yet.</p>
                        }
                        </ul>
                        <Button disabled={loading} onClick={() => changeEditMode(true)} className="mr-1">Edit</Button>
                    </CardBody>
                </Card>
        );
    }

    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-4">Key Informations</h4>
                {
                    error ? <p className="text-danger">{error}</p> : null
                }
                {
                    clapStores.map(clapStore => (
                        <div key={clapStore.key} className={'mb-4'}>
                            <span className={'d-block mb-2'}>{clapStore.name}</span>
                            <Select
                                defaultValue={claps.find(item => item.key === clapStore.key)?.values?.map(i => ({
                                    value: i,
                                    label: i,
                                })) || []}
                                isMulti
                                name={clapStore.name}
                                onChange={onSelect(clapStore.key, clapStore.name) as any}
                                isLoading={loading}
                                isDisabled={loading}
                                options={clapStore.values.map(i => ({value: i, label: i}))}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </div>
                    ))
                }

                <Button onClick={() => changeEditMode(false)} className="mr-2">Cancel</Button>
                <Button onClick={onSubmit} color="primary" className="mr-2">Submit</Button>
            </CardBody>
        </Card>
    );
};

const Yan = () => {
    return (
        <SingleCard title={'Listing Details'}>
            <Ghost/>
            <Location/>
            <Contacts/>
            <Description/>
        </SingleCard>
    );
}

export default Yan;

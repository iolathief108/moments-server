import {Button, Card, CardBody} from 'reactstrap';
// import SingleCard from './Layout/SingleCard';
import React, {useEffect, useState} from 'react';
import {sdk, LocationNode} from '@mara/shared';
import Select from 'react-select';
import './location.css'


let tempSelected: LocationNode[] = null;
const Location = () => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [error, setError] = useState<string>(null);
    const [loading, setLoadiing] = useState<boolean>(true);

    const [selectedSearchDistricts, setSelectedSearchDistricts] = useState<string[]>([]);
    const [allDistricts, setAllDistricts] = useState<LocationNode[]>(null);

    useEffect(() => {
        (async function () {
            const thing = await sdk().getVendorDetailsExtra();
            setSelectedSearchDistricts(thing.data.vendorDetailsExtra.search_districts);
        })();
    }, []);

    const changeEditMode = async (editMode: boolean) => {
        setLoadiing(true);

        if (editMode && !allDistricts) {
            const d = await sdk().getDistricts();
            setAllDistricts(d?.data?.districts || []);
        }

        setEditMode(editMode);
        setLoadiing(false);
    };

    const sadf = () => {
        if (!allDistricts) return [];
        const dd = selectedSearchDistricts.map(disName => allDistricts.find(i => i.name === disName));

        return dd;
    };

    const onSubmit = async (t) => {
        if (tempSelected === null) {
            changeEditMode(false);
            return;
        }
        try {
            console.log(tempSelected.map(t => t.id));
            const res = await sdk().editVendorDetails({
                searchDistrictIDs: tempSelected.map(t => t.id),
            });
            if (!res.data.vendorEditDetails) {
                setError('something went wrong!');
                return;
            }
        } catch (e) {
            setError('Oops! Something went wrong!');
            return;
        }
        setSelectedSearchDistricts(tempSelected.map(e => e.name));
        tempSelected = null;
        changeEditMode(false);
    };

    const onSelect = (t: {value: string}[]) => {
        tempSelected = t.map(t => allDistricts.find(value => value.key === t.value));
    };


    return (
            <Card>
                <CardBody>

                    {
                        !editMode ?
                            <div>
                                <p>Districts</p>
                                {
                                    selectedSearchDistricts && selectedSearchDistricts.map(i => (
                                        <p key={i}>{i}</p>
                                    ))
                                }
                                <Button onClick={() => changeEditMode(true)}>Edit</Button>
                            </div> :
                            <div>
                                <Select
                                    options={allDistricts.map(a => ({value: a.key, label: a.name})) as any}
                                    isMulti={true}
                                    name={'asdfad'}
                                    onChange={onSelect as any}
                                    defaultValue={sadf().map(a => ({value: a.key, label: a.name}))}
                                />
                                <Button onClick={() => changeEditMode(false)}>Cancel</Button>
                                <Button onClick={onSubmit as any}>Submit</Button>
                            </div>
                    }
                </CardBody>
            </Card>
    );
};
export default Location;
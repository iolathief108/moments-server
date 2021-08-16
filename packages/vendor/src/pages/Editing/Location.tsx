import React, {useEffect, useState} from 'react';
import {sdk, VendorType} from '@mara/shared';
import './location.css';
import {AvField, AvForm, AvRadio, AvRadioGroup, AvCheckboxGroup, AvCheckbox} from 'availity-reactstrap-validation';
import Loader from '../../comps/Loader';
import {Button, Card, CardBody, FormGroup} from 'reactstrap';

// venue
interface VenState {
    selectedDistrict: {
        name: string
        key: string
    }
    selectedCity: {
        name: string
        key: string
    }
    cities: {
        name: string
        key: string
        id: string
    }[]
    districts: {
        name: string
        key: string
        id: string
    }[]
    citiesLoading: boolean
    error: string
    submitLoading: boolean
    initialLoading: boolean
}

interface VenProps {
    onNormalMode: () => void
}

const Ven = ({onNormalMode}: VenProps) => {
    const [state, setState] = useState<VenState>({
        cities: [],
        districts: [],
        selectedCity: null,
        selectedDistrict: null,
        citiesLoading: false,
        error: null,
        submitLoading: null,
        initialLoading: true,
    });

    useEffect(() => {
        (async () => {
            // Initialize Districts
            const districtsResult = await sdk().getDistricts();
            setState({
                ...state,
                districts: districtsResult.data.districts.map(d => ({
                    id: d.id,
                    key: d.key,
                    name: d.name,
                })),
            });

            // Initialize selected districts
            const vDetailsResult = await sdk().getVendorDetailsExtra();
            const selectedDistrict = vDetailsResult.data.vendorDetailsExtra.searchLocations.length > 0 ? vDetailsResult.data.vendorDetailsExtra.searchLocations[0] : null;
            if (selectedDistrict) {
                setState(state => ({
                    ...state,
                    selectedDistrict: {
                        key: selectedDistrict.key,
                        name: selectedDistrict.name,
                    },
                }));
            }

            if (selectedDistrict) {
                // Initialize cities
                const citiesResult = await sdk().getCities({
                    districtId: districtsResult.data.districts.find(d => d.key === selectedDistrict.key).id,
                });
                setState(state => ({
                    ...state,
                    cities: citiesResult.data.cities.map(c => ({
                        key: c.key,
                        id: c.id,
                        name: c.name,
                    })),
                }));
            }

            const selectedCity = selectedDistrict?.cities.length > 0 ? selectedDistrict.cities[0] : null;
            if (selectedCity) {
                // Initialize city
                setState(state => ({
                    ...state,
                    selectedCity: {
                        name: selectedCity.name,
                        key: selectedCity.key,
                    },
                }));
            }
            setState(state => ({...state, initialLoading: false}));

        })();
    }, []);

    const onSubmit = async (event, errors, values) => {
        setState({
            ...state,
            submitLoading: true,
        });
        if (!values.city) {
            return;
        }
        const cityId = state.cities.find(c => c.key === values.city).id;
        if (!cityId) {
            return;
        }
        const result = await sdk().editVendorDetails({
            cityIds: [cityId],
        });
        if (result.data.vendorEditDetails) {
            onNormalMode();
            return;
        }
        setState({
            ...state,
            submitLoading: false,
            error: 'Submit failed',
        });
    };

    const onDistrictChange = async (a, districtKey: string) => {
        const dis = state.districts.find(d => d.key === districtKey);
        if (!dis) {
            setState({
                ...state,
                selectedCity: null,
                cities: [],
            });
            return;
        }
        ;
        setState({
            ...state,
            selectedDistrict: dis,
            selectedCity: null,
            cities: [],
            citiesLoading: true,
        });

        const res = await sdk().getCities({districtId: dis.id});
        setState({
            ...state,
            cities: res.data.cities,
            citiesLoading: false,
        });
    };

    return (
        <div>
            {
                !state.initialLoading ?
                    <AvForm model={{
                        district: state.selectedDistrict?.key,
                        city: state.selectedCity?.key,
                    }}
                            onSubmit={onSubmit}
                    >
                        {
                            state.districts ?
                                <AvField onChange={onDistrictChange} type="select" name="district" label="Districts">
                                    <option key={'select-one'}>Select One</option>
                                    {
                                        state.districts?.map(d => (<option value={d.key} key={d.key}>{d.name}</option>))
                                    }
                                </AvField> : <Loader/>
                        }
                        {
                            state.citiesLoading ?
                                <Loader/> :
                                state.cities && state.cities.length > 0 ?
                                    <>
                                        <h6>Cities</h6>
                                        <AvRadioGroup name="city" required>
                                            {
                                                state.cities.map(c => (
                                                    <AvRadio key={c.key} label={c.name} value={c.key}/>))
                                            }
                                        </AvRadioGroup>
                                    </> :
                                    null
                        }
                        <FormGroup>
                            <Button className="mr-2" onClick={onNormalMode}>Cancel</Button>
                            <Button type="submit" color="primary" className="mr-1" disabled={state.citiesLoading}>
                                Submit
                            </Button>
                        </FormGroup>
                    </AvForm> : <Loader/>
            }
        </div>
    );
};

// default
interface DefaultState {
    allDistricts: {
        name: string
        key: string
        id: string
    }[]
    locations: {
        selectedDistrictKey: string
        cities: {
            name: string
            key: string
            id: string
        }[]
        selectedCityKeys: string[]
        cityLoading: boolean
    }[]
    initialLoading?: boolean
    submitLoading?: boolean
}

const Default = ({onNormalMode}: VenProps) => {
    const [state, setState] = useState<DefaultState>({
        allDistricts: [],
        initialLoading: true,
        locations: [],
    });

    useEffect(() => {
        (async function () {
            const dis = await sdk().getDistricts();
            setState({
                ...state,
                allDistricts: dis.data.districts.map(d => ({
                    name: d.name,
                    id: d.id,
                    key: d.key,
                })),
            });

            const vDetails = await sdk().getVendorDetailsExtra();
            const sLocations = vDetails.data.vendorDetailsExtra?.searchLocations;

            let locations = [];
            for (let sLocation of sLocations) {
                const districtId = dis.data.districts.find(d => d.key === sLocation.key).id;
                const location = {
                    selectedDistrictKey: sLocation.key,
                    selectedCityKeys: sLocation.cities.map(c => c.key),
                    cityLoading: false,
                    cities: (await sdk().getCities({districtId})).data.cities.map(c => ({
                        name: c.name,
                        key: c.key,
                        id: c.id,
                    })),
                };
                locations.push(location);
            }

            setState(state => ({
                ...state,
                locations: [...locations, {
                    selectedCityKeys: [],
                    selectedDistrictKey: null,
                    cities: [],
                    cityLoading: false,
                }],
                initialLoading: false,
            }));

        })();
    }, []);

    const onSubmit = async () => {
        setState({
            ...state,
            submitLoading: true,
        });
        let cityIds = [];
        for (let location of state.locations) {
            for (let selectedCityKey of location.selectedCityKeys) {
                const id = location.cities.find(c => c.key === selectedCityKey)?.id;
                if (id) {
                    cityIds.push(id);
                }
            }
        }

        const result = await sdk().editVendorDetails({
            cityIds,
        });
        if (result.data.vendorEditDetails) {
            onNormalMode();
            return;
        }
        setState({
            ...state,
            submitLoading: false,
        });
    };

    const onSelect = (cityKeys, index) => {
        if (cityKeys === undefined) {
            return;
        }

        let createNew = false;
        setState({
            ...state,
            locations: state.locations.map((l, i) => {
                if (i === index) {
                    if (l.selectedCityKeys.length === 0) {
                        createNew = true;
                    }
                    l.selectedCityKeys = cityKeys;
                }
                return l;
            }),
        });

        if (createNew) {
            setState(state => {
                if (state.locations[state.locations.length - 1].selectedCityKeys.length > 0) {
                    return ({
                        ...state,
                        locations: [...state.locations, {
                            cityLoading: false,
                            selectedCityKeys: [],
                            selectedDistrictKey: null,
                            cities: [],
                        }],
                    });
                }
                return state;
            });
        }
    };

    const onDistrictChange = async (districtKey, index) => {

        // enable loading
        setState({
            ...state,
            locations: state.locations.map((l, i) => {
                if (i === index) {
                    l.cityLoading = true;
                    l.selectedDistrictKey = districtKey;
                    l.selectedCityKeys = [];
                }
                return l;
            }),
        });

        //
        const id = state.allDistricts.find(d => d.key === districtKey).id;
        const cities = (await sdk().getCities({districtId: id})).data.cities;
        setState({
            ...state,
            locations: state.locations.map((l, i) => {
                if (i === index) {
                    l.cityLoading = false;
                    l.cities = cities;
                }
                return l;
            }),
        });
    };

    const getModel = () => {
        let model = {};
        state.locations.forEach(((value, index) => {
            if (value.selectedDistrictKey) {
                model[index] = {
                    district: value.selectedDistrictKey,
                };
            }
            if (value.selectedCityKeys) {
                model[index] ? model[index]['cities'] = value.selectedCityKeys : model[index] = {
                    cities: value.selectedCityKeys,
                };
            }
        }));
        return model;
    };

    return (
        <div>
            {
                !state.initialLoading ?
                    <AvForm onSubmit={onSubmit} model={getModel()}>
                        {
                            state.locations.map((location, index) => {
                                const selectionKey = location.selectedDistrictKey;
                                let disableKeys: string[] = [];
                                for (let location of state.locations) {
                                    if (location.selectedDistrictKey !== selectionKey) {
                                        disableKeys.push(location.selectedDistrictKey);
                                    }
                                }
                                return (
                                    <div key={index}>
                                        {/* district */}
                                        <AvField onChange={(a, b) => onDistrictChange(b, index)} type="select"
                                                 name={`${index}.district`}
                                                 label="Districts">
                                            <option key={'select-one'}>Select One{index > 0 ? ' (Optional)': ''}</option>
                                            {
                                                state.allDistricts.map(d => (
                                                    <option key={d.key} value={d.key}
                                                            disabled={disableKeys.includes(d.key)}>{d.name}</option>
                                                ))
                                            }
                                        </AvField>
                                        {/* cities */}
                                        <AvCheckboxGroup onChange={(a, b) => onSelect(b, index)}
                                                         name={`${index}.cities`}>
                                            {
                                                location.cityLoading && <Loader/>
                                            }
                                            {
                                                !location.cityLoading && location.cities.map(c => (
                                                    <AvCheckbox label={c.name} key={c.key} value={c.key}/>
                                                ))
                                            }
                                        </AvCheckboxGroup>
                                    </div>
                                );
                            })
                        }
                        <FormGroup>
                            <Button className="mr-2" onClick={onNormalMode}>Cancel</Button>
                            <Button type="submit" color="primary" className="mr-1">
                                Submit
                            </Button>
                        </FormGroup>
                    </AvForm> :
                    <Loader/>
            }
        </div>
    );
};

// normal
interface NormalState {
    loading: boolean
    data: {
        districtName: string
        cityNames: string[]
    }[]
    isVenue: boolean
}

const Normal = ({onEditMode}: {onEditMode: () => void}) => {
    const [state, setState] = useState<NormalState>({
        loading: true,
        data: [],
        isVenue: false,
    });

    useEffect(() => {
        sdk().getVendorDetailsExtra().then(res => {
            const l = res.data.vendorDetailsExtra.searchLocations;
            setState({
                data: l.map(d => ({districtName: d.name, cityNames: d.cities.map(c => c.name)})),
                loading: false,
                isVenue: res.data.vendorDetailsExtra.vendor_type === VendorType.Venue,
            });
        });
    }, []);

    if (state.isVenue) {
        return (
            <div>
                {
                    state.loading ?
                        <Loader/> :
                        state.data.length > 0 &&
                        <div className={'mb-4'}>
                            <span>{state.data[0].cityNames[0]}</span>{', '}
                            <span>{state.data[0].districtName}</span>
                        </div>
                }
                {
                    !state.loading && state.data.length < 1 &&
                    <p className={'text-danger'}>No Location has been selected</p>
                }
                <Button disabled={state.loading} onClick={onEditMode}>Edit</Button>
            </div>
        );
    }

    return (
        <div>
            {
                state.loading ?
                    <Loader/> :
                    <ul className={'list-unstyled mb-4'}>
                        {
                            state.data.map(d => (
                                <li className={'mb-3'} key={d.districtName}>
                                    {d.districtName}
                                    <ul className={'pt-1 pl-4'}>
                                        {
                                            d.cityNames.map(c => (
                                                <li key={c}>{c}</li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>
            }
            {
                !state.loading && state.data.length < 1 &&
                <p className={'text-danger'}>No Location has been selected</p>
            }
            <Button disabled={state.loading} onClick={onEditMode}>Edit</Button>
        </div>
    );
};

// location
interface LocationState {
    isEditMode: boolean;
    loading: boolean;
    isVenue: boolean;
}

const Location = () => {
    const [state, setState] = useState<LocationState>({
        isEditMode: false,
        isVenue: null,
        loading: true,
    });

    useEffect(() => {
        (async () => {
            const result = await sdk().getVendorDetailsExtra();
            setState({
                ...state,
                isVenue: result.data.vendorDetailsExtra.vendor_type === VendorType.Venue,
                loading: false,
            });
        })();
    }, []);

    const changeEditMode = (isEditMode: boolean) => {
        setState({
            ...state,
            isEditMode,
        });
    };

    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-3">Locations (Home Markets)</h4>
                {
                    state.loading && <Loader/>
                }
                {
                    !state.loading ?
                        !state.isEditMode ?
                            <Normal onEditMode={() => changeEditMode(true)}/> :
                            state.isVenue ?
                                <Ven onNormalMode={() => changeEditMode(false)}/> :
                                <Default onNormalMode={() => changeEditMode(false)}/> : null
                }
            </CardBody>
        </Card>
    );
};

export default Location;

import SingleCard from './Layout/SingleCard';
import React from 'react';
import LocationA from './Listing/LocationA';
import Contacts from './Listing/Contacts';
import Description from './Listing/Description';
import Links from './Listing/Links';
import KeyInfo from './Listing/KeyInfo';
import Pricing from './Listing/Pricing';
import PersonInfoView from './Listing/PersonInfoView';


const Listing = () => {
    return (
        <SingleCard title={'Listing Details'}>
            <PersonInfoView/>
            <Pricing/>
            <KeyInfo />
            <LocationA />
            <Contacts />
            <Description />
            <Links/>
        </SingleCard>
    );
};

export default Listing;

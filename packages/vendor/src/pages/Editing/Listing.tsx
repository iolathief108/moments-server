import SingleCard from './Layout/SingleCard';
import React from 'react';
import LocationA from './Listing/LocationA';
import Contacts from './Listing/Contacts';
import Description from './Listing/Description';
import Links from './Listing/Links';
import KeyInfo from './Listing/KeyInfo';


const Listing = () => {
    return (
        <SingleCard title={'Listing Details'}>
            <KeyInfo />
            <LocationA />
            <Contacts />
            <Description />
            <Links/>
        </SingleCard>
    );
};

export default Listing;

import SingleCard from './Layout/SingleCard';
import React from 'react';
import LocationA from './Listing/LocationA';
import Contacts from './Listing/Contacts';
import Description from './Listing/Description';
import Links from './Listing/Links';
import KeyInfo from './Listing/KeyInfo';
import Pricing from './Listing/Pricing';
import PersonInfoView from './Listing/PersonInfoView';
import {Frequent} from './Listing/Frequent';
import Video from './Listing/Video';
import ServicePrice from './Listing/ServicePrice';
import GuestCapacity from './Listing/GuestCapacity';


const Listing = () => {
    return (
        <SingleCard title={'Listing Details'}>
            <ServicePrice/>
            <Video/>
            <GuestCapacity/>
            <Frequent/>
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

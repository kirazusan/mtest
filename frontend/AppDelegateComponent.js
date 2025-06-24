

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import MainContent from './MainContent';

const AppDelegateComponent = () => {
    return (
        <div>
            <Header />
            <Navigation />
            <MainContent />
            <Footer />
        </div>
    );
};

export default AppDelegateComponent;
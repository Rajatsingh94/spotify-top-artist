import React from 'react';
import logo from '../Component/util/images.jpg';


const Image = () => {
    return (
        <div className="image">
        <img src={logo} alt={"logo"}></img>
        </div>
    );
};

export default Image;
import React from 'react';
import Image from '../Component/image';


const ArtistCard = (props) => {
    console.log(props)
    return (
        <div className="container-fluid artistcard">
                <div className="card">
                <Image/>
                <div className="card-body">
                    <p className="card-text">Name : {props.name}</p>
                    <p className="card-text">Popularity : {props.popular}</p>
                    <p className="card-text">Followers : {props.follower}</p>
                </div>
            </div>
        </div>
    );
};

export default ArtistCard;
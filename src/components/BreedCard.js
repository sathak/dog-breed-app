import React, { Suspense } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const BreedCard = (breed, idx) => {
      const Loading = (
        <img
            src="../assets/images/loader.gif"
            alt="loader"
        />
    );
    const _breed = breed.breed;
    {
        if (_breed.image){

            return (
                <div  >

                    <LazyLoadImage effect="blur" placeholder={Loading} delayTime={5000} height="190px" width="100%" src={_breed.image.url} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{_breed.name}</h5>
                        <div className="card-text">{_breed.bred_for}
                            <div className="card-text">Breed Group: {_breed.breed_group ? _breed.breed_group : '-'}</div>
                            <div className="card-text">Life Span: {_breed.life_span}</div>
                            <div className="card-text">Height: {_breed.height.metric}</div>
                        </div>
                    </div>

                </div>
            )
        }
        else{
            return(null)
        }
    }
};

export default BreedCard;
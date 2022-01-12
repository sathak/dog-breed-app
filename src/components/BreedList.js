import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListofBreeds } from "../actions/breedlistAction";
import BreedCard from "./BreedCard";
import LazyLoad from 'react-lazyload';


const BreedList = () => {
    const allBreeds = useSelector((state) => state.breedList);
    const [IntialData, setIntialData] = useState([]);
    const [searchValue, setSearchValue] = useState(null);
    const [sortBy, setSortBy] = useState(1);
    const [sortOrder, setSortOrder] = useState(1);
    const [hasError, setHasError] = useState(false);
    const [errorInfo, setErrorInfo] = useState(false);
    const didMountRef = useRef(false);
    const dispatch = useDispatch();
    // console.log(allBreeds);

    const Sorting = (response, index, order) => {
        if (order == 1) {
            if (index == 1) {
                return response.sort(function (a, b) {
                    if (a.name < b.name)
                        return -1;
                    if (a.name > b.name)
                        return 1;
                    return 0;
                    //  return a.name > b.name;
                });
            } else if (index == 2) {
                return response.sort(function (a, b) {
                    let aheight = a.height.metric.split('-');
                    let bheight = b.height.metric.split('-');
                    let _aheight = aheight.length > 1 ? aheight[1] : aheight[0];
                    let _bheight = bheight.length > 1 ? bheight[1] : bheight[0];
                    return _aheight - _bheight;
                });
            } else if (index == 3) {
                return response.sort(function (a, b) {
                    let alifespan = a.life_span.split('-');
                    let blifespan = b.life_span.split('-');
                    let _alifespan = alifespan.length > 1 ? alifespan[1].replace('years', '') : alifespan[0].replace('years', '');
                    let _blifespan = blifespan.length > 1 ? blifespan[1].replace('years', '') : blifespan[0].replace('years', '');
                    return _alifespan - _blifespan;
                });
            }

        } else {
            if (index == 1) {
                return response.sort(function (a, b) {
                    if (a.name > b.name)
                        return -1;
                    if (a.name < b.name)
                        return 1;
                    return 0;
                    //  return a.name > b.name;
                });
            } else if (index == 2) {
                return response.sort(function (a, b) {
                    let aheight = a.height.metric.split('-');
                    let bheight = b.height.metric.split('-');
                    let _aheight = aheight.length > 1 ? aheight[1] : aheight[0];
                    let _bheight = bheight.length > 1 ? bheight[1] : bheight[0];
                    return _bheight - _aheight;
                });
            } else if (index == 3) {
                return response.sort(function (a, b) {
                    let alifespan = a.life_span.split('-');
                    let blifespan = b.life_span.split('-');
                    let _alifespan = alifespan.length > 1 ? alifespan[1].replace('years', '') : alifespan[0].replace('years', '');
                    let _blifespan = blifespan.length > 1 ? blifespan[1].replace('years', '') : blifespan[0].replace('years', '');
                    return _blifespan - _alifespan;
                });
            }
        }
    };


    const fetchAllBreeds = async () => {
        const response = await fetch("https://api.thedogapi.com/v1/breeds")
            .then(response => response.json())
            .catch((error) => {
                setHasError(true);
                setErrorInfo(error);
            });

        let getSortedData = Sorting(response, 1, 1);

        setIntialData(getSortedData);

        dispatch(getListofBreeds(getSortedData));
    };
    const fetchbyBreedName = async () => {
        let val = searchValue;
        console.log(val);
        const response = await fetch("https://api.thedogapi.com/v1/breeds/search?q=" + val)
            .then(response => response.json())
            .catch((error) => {
                setHasError(true);
                setErrorInfo(error);
            });

        let filteredData = [];
        for (let i = 0; i < IntialData.length; i++) {
            for (let j = 0; j < response.length; j++) {
                if (IntialData[i].id == response[j].id) {
                    filteredData.push(IntialData[i]);
                }
            }
        }



        if (val == '') {
            let getSortedData = Sorting(IntialData, sortBy, sortOrder);
            dispatch(getListofBreeds(getSortedData));
        } else {
            let getSortedData = Sorting(filteredData, sortBy, sortOrder);
            dispatch(getListofBreeds(filteredData));
        }

    };
    const onSortBy = (e) => {

        setSortBy(e.target.value);
        let getSortedData = Sorting(allBreeds.breeds, e.target.value, sortOrder);
        dispatch(getListofBreeds(getSortedData));
    }

    const onSortOrder = (e) => {

        setSortOrder(e.target.value);
        let getSortedData = Sorting(allBreeds.breeds, sortBy, e.target.value);
        dispatch(getListofBreeds(getSortedData));
    }

    useEffect(() => {
        if (!didMountRef.current) {
            fetchAllBreeds();
        }


        let delayDebounceFn;

        if (didMountRef.current) {
            delayDebounceFn = setTimeout(fetchbyBreedName, 1000)
        } else {
            didMountRef.current = true;
        }

        return () => clearTimeout(delayDebounceFn);
    }, [searchValue]);

    const Loading = (
        <img
            src="../assets/images/loader.gif"
            alt="loader"
        />
    );

    return (
        
        <div>
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <img src="../assets/images/dog.jpg" width="50px" height="50px"
                        alt="loader"
                    /> <a href="#" className="navbar-brand">Dog Breeds</a>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav">

                        </div>

                        <div className="navbar-nav ms-auto">
                            <div className="padRight5">
                                <span>Sort By : </span>
                                <select className='drpSelect' onChange={onSortBy}>
                                    <option defaultValue={1} value="1">Name</option>
                                    <option value="2">Height</option>
                                    <option value="3">Life Span</option>
                                </select>
                            </div>
                            <div className="padRight5">
                                <span>Sort order : </span>
                                <select className='drpSelect' onChange={onSortOrder}>
                                    <option defaultValue={1} value="1">Asc</option>
                                    <option value="2">Desc</option>
                                </select>
                            </div>
                            <div>
                                <input type="text" placeholder="Search by Name..." onChange={e => setSearchValue(e.target.value)}></input>
                            </div>

                        </div>
                    </div>
                </div>
            </nav>
            <div className="card-deck">
                {allBreeds.breeds.map((breed, idx) => {
                    if (breed)
                        return <LazyLoad placeholder={Loading} className="card card-width" key={idx} once offset={100} throttle={250}>
                            <BreedCard breed={breed} ></BreedCard>
                        </LazyLoad>

                })
                }
            </div>
        </div>
    )
};

export default BreedList;
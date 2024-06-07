import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SearchResultBox({ keyword }) {
    const [resultSearch, setResultSearch] = useState([]);
    const [categories, setCategories] = useState([]);
    const [names, setNames] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        if (keyword) {
            handleSearch();
        }
    }, [keyword]);

    const handleSearch = async () => {
        try {
            const response = await Axios.post("http://localhost:3001/SearchBarRecom", { keyword });
            if (response.status === 200) {
                console.log(response.data.data);
                setResultSearch(response.data.data);
                setCategories(getUniqueCategories(response.data.data));
                setNames(getUniqueName(response.data.data));
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Function to filter out duplicate categories
    const getUniqueCategories = (data) => {
        const uniqueCategories = [];
        const categorySet = new Set();
        data.forEach(item => {
            if (!categorySet.has(item.courseCategory)) {
                categorySet.add(item.courseCategory);
                uniqueCategories.push(item.courseCategory);
            }
        });
        return uniqueCategories;
    };

    const getUniqueName = (data) => {
        const uniqueNames = [];
        const nameSet = new Set();
        data.forEach(item => {
            if (!nameSet.has(item.courseName)) {
                nameSet.add(item.courseName);
                uniqueNames.push(item.courseName);
            }
        });
        return uniqueNames;
    };

    const handleCategoryClick = (category) => {
        localStorage.setItem('searchKeyword', category);
        nav("/SearchView")
        window.location.reload();
    };

    const handleNameClick = (name) => {
        localStorage.setItem('searchKeyword', name);
        nav("/SearchView")
        window.location.reload();
    };

    return (
        <div className='flex flex-col border bg-white absolute w-[500px] left-0 p-5'>
            {categories && categories.map((category, index) => (
                <div className='p-1 cursor-pointer' key={index} onClick={() => handleCategoryClick(category)}>
                    <span>
                        {category}<br></br>
                    </span>
                </div>
            ))}

            {names && names.map((name, index) => (
                <div className='p-1 cursor-pointer' key={index} onClick={() => handleNameClick(name)}>
                    <span>
                        {name}<br></br>
                    </span>
                </div>
            ))}
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import styles from '../InfiniteScroll/InfiniteScroll.module.css';

import { Data } from '../Data.js';

function InfiniteScroll() {
    const [items, setItems] = useState([]); // Renamed for clarity
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = () => {
        setIsLoading(true);

        setTimeout(() => {
            setItems((prevItems) => [...prevItems, ...Data]); // Appending new data
            setIsLoading(false);
        }, 1000);
    };

    const handleScroll = () => {
        const containerHeight = document.querySelector(`.${styles.MainParent}`).scrollHeight;
        const windowHeight = window.innerHeight + window.scrollY + 250;

        if (windowHeight > containerHeight && !isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoading]);

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <div className={styles.MainParent}>
            <h2>React Infinite Scroll</h2>
            <div className={styles.Content}>
                {items.map((item, idx) => (
                    <div key={idx} className={styles.Card}>
                        <h3>{item.name}</h3>
                        <p><strong>Location:</strong> {item.location}</p>
                        <p><strong>Type:</strong> {item.type}</p>
                        <p><strong>Number of Students:</strong> {item.studentsCount}</p>
                        <p><strong>Established:</strong> {item.establishedYear}</p>
                        <p><strong>Principal:</strong> {item.principal}</p>
                        <p><strong>Facilities:</strong> {item.facilities.join(', ')}</p>
                        <p><strong>Rating:</strong> {item.rating} ⭐</p>
                    </div>
                ))}

                {isLoading && <div className={styles.Loading}>Loading...</div>}
            </div>
        </div>
    );
}

export default InfiniteScroll;

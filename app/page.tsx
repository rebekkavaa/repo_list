"use client"

import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { Repository, fetchRepositories } from './api/api';
import RepositoryTable from '../components/RepositoryTable';

const ITEMS_PER_PAGE = 20;
const TOTAL_REPOSITORIES = 100;

const Home: React.FC = () => {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            try {
                const repositoriesData = await fetchRepositories();
                setRepositories(repositoriesData);
            } catch (error) {
                console.error("error")
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const visibleRepositories = repositories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleLoadMore = () => {
        setStartIndex((prevIndex) => prevIndex + ITEMS_PER_PAGE);
    };

    const handleLoadPrevious = () => {
        setStartIndex((prevIndex) => Math.max(0, prevIndex - ITEMS_PER_PAGE));
    };

    const isNextButtonDisabled = startIndex + ITEMS_PER_PAGE >= TOTAL_REPOSITORIES;

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {!isLoading && <RepositoryTable repositories={visibleRepositories} />}
            {!isLoading && (
                <>
                    <Button onClick={handleLoadPrevious} disabled={startIndex === 0}>
                        Previous
                    </Button>
                    <Button onClick={handleLoadMore} disabled={isNextButtonDisabled}>
                        Next
                    </Button>
                </>
            )}
        </>
    );
};

export default Home;


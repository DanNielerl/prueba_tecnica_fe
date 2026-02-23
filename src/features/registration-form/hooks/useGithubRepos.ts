import { useState } from 'react';
import { getGithubRepos } from '../api/getGithubRepos';
import type { Repository } from '../api/getGithubRepos';

export const useGithubRepos = () => {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRepos = async (username: string) => {
        if (!username) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            const data = await getGithubRepos(username);
            setRepos(data);
        } catch (err: any) {
            setError(err.message);
            setRepos([]);
        } finally {
            setIsLoading(false);
        }
    };

    return { repos, isLoading, error, fetchRepos };
};
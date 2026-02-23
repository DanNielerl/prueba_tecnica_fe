export type Repository = {
  id: string;
  name: string;
  description: string;
  stars: number;
};

export const getGithubRepos = async (username: string): Promise<Repository[]> => {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  
  if (!response.ok) {
    throw new Error('Error al consultar los repositorios. Verifica el usuario.');
  }

  const rawData = await response.json();

  return rawData.map((repo: any) => ({
    id: repo.id.toString(),
    name: repo.name,
    description: repo.description || 'Sin descripción',
    stars: repo.stargazers_count,
  }));
};
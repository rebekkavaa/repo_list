export interface Repository {
  id: number;
  name: string;
  description: string;
  owner: any;
}

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
      const response = await fetch(
          `https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100`
      );
      const data = await response.json();
      const repositories: Repository[] = data.items;
      return repositories;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
};
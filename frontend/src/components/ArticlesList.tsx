import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Article {
  id: number;
  title: string;
  content: string;
}

const ArticlesList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get<Article[]>('/api/articles');
      setArticles(response.data);
    };
    fetchArticles();
  }, []);

  return (
    <div>
      <h1> Liste des articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h2> {article.title}</h2>
            <p> {article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ArticlesList;

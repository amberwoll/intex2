// TvRecs.tsx
'use client';
import { useEffect, useState } from 'react';
import TrendCard from './TrendCard';
import { fetchUserTvRecommendationById } from '../../api/UserTvRecommendationsAPI';

const TvRecs = () => {
  const [tvImagePaths, setTvImagePaths] = useState<string[]>([]);
  const [tvList, setTvList] = useState<{ title: string }[]>([]);
  const userId = '1';

  const sanitizeFileName = (title: string) =>
    title
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[&:–—'"!?@#$%^*(){}\[\]<>,.|\\/`~+=\-]/g, '')
      .trim();

  useEffect(() => {
    const fetchTvRecs = async () => {
      try {
        const recData = await fetchUserTvRecommendationById(userId);

        const showIds = Object.entries(recData)
          .filter(([key]) => key.startsWith('recommendation'))
          .map(([_, value]) => value);

        const titleResponse = await fetch(
          'https://localhost:5500/Movie/GetMovieTitlesByShowIds',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(showIds),
            credentials: 'include',
          }
        );

        if (!titleResponse.ok)
          throw new Error('Failed to fetch TV show titles');
        const tvList = await titleResponse.json();

        const paths = tvList
          .filter((tv: { title?: string }) => !!tv.title)
          .map(
            (tv: { title: string }) =>
              `https://intexphotos.blob.core.windows.net/posters/${sanitizeFileName(tv.title)}.jpg`
          );

        setTvImagePaths(paths);
        setTvList(tvList);
      } catch (error) {
        console.error('Error loading TV recommendations:', error);
      }
    };

    fetchTvRecs();
  }, []);

  return (
    <section
      className="trends-section"
      role="region"
      aria-label="Trending Content"
    >
      <h2 className="trends-title">Today's Top TV Picks for You</h2>
      <div className="trends-scroll-container">
        <div className="trends-grid">
          {tvList.map((tv, index) => (
            <TrendCard
              key={index}
              imageUrl={tvImagePaths[index] ?? ''}
              title={tv.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TvRecs;

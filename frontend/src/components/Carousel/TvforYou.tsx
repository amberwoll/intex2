'use client';

import { useEffect, useState, useContext } from 'react';
import TrendCard from './TrendCard';
import { fetchUserTvRecommendationById } from '../../api/UserTvRecommendationsAPI';
import { UserContext } from '../AuthorizeView'; // Adjust if path differs

const TvRecs = () => {
  const user = useContext(UserContext);
  const [userId, setUserId] = useState<null>(null);
  const [tvList, setTvList] = useState<{ title: string; showId: string }[]>([]);
  const [imagePaths, setImagePaths] = useState<string[]>([]);

  const sanitizeFileName = (title: string) =>
    title
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[&:–—'"!?@#$%^*(){}\[\]<>,.|\\/`~+=\-]/g, '')
      .trim();

  useEffect(() => {
    if (userId) {
    }
    const fetchUserIdAndTvRecs = async () => {
      if (!user?.email) return;

      try {
        // STEP 1: Get userId by email
        const emailEncoded = encodeURIComponent(user.email);
        const userRes = await fetch(
          `https://intex-2-1-backend-brh0g6hbeqhybcb4.eastus-01.azurewebsites.net/MoviesUser/ByEmail/${emailEncoded}`,
          { credentials: 'include' }
        );
        if (!userRes.ok) throw new Error('Failed to fetch user ID');
        const userData = await userRes.json();
        const uid = userData.userId;
        setUserId(uid);

        // STEP 2: Fetch TV recommendations
        const recData = await fetchUserTvRecommendationById(uid);

        const showIds = Object.entries(recData)
          .filter(([key]) => key.startsWith('recommendation'))
          .map(([_, value]) => value);

        const titleRes = await fetch(
          'https://intex-2-1-backend-brh0g6hbeqhybcb4.eastus-01.azurewebsites.net/Movie/GetMovieTitlesByShowIds',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(showIds),
            credentials: 'include',
          }
        );

        if (!titleRes.ok) throw new Error('Failed to fetch TV titles');
        const tvData = await titleRes.json();

        setTvList(tvData);
        setImagePaths(
          tvData.map(
            (tv: { title: string }) =>
              `https://intexphotos.blob.core.windows.net/posters/${sanitizeFileName(tv.title)}.jpg`
          )
        );
      } catch (error) {
        console.error('Error loading TV recommendations:', error);
      }
    };

    fetchUserIdAndTvRecs();
  }, [user?.email]);

  return (
    <section
      className="trends-section"
      role="region"
      aria-label="Trending TV Recommendations"
    >
      <h2 className="trends-title">Today's Top TV Picks for You</h2>
      <div className="trends-scroll-container">
        <div className="trends-grid">
          {tvList.map((tv, index) => (
            <TrendCard
              key={tv.showId}
              imageUrl={imagePaths[index] ?? ''}
              title={tv.title}
              showId={tv.showId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TvRecs;

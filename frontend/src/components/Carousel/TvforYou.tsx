'use client';

import { useEffect, useState } from 'react';
import TrendCard from './TrendCard';
import { fetchUserTvRecommendationById } from '../../api/UserTvRecommendationsAPI';
import { useUser } from '../UserContext'; // ✅ Use the shared hook

const TvRecs = () => {
  const user = useUser(); // ✅ Proper hook usage
  const [ ,setUserId] = useState<string | null>(null);
  const [tvList, setTvList] = useState<{ title: string; showId: string }[]>([]);
  const [imagePaths, setImagePaths] = useState<string[]>([]);

  const sanitizeFileName = (title: string) =>
    title
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[&:–—'"!?@#$%^*(){}\[\]<>,.|\\/`~+=\-]/g, '')
      .trim();

  useEffect(() => {
    const fetchUserIdAndTvRecs = async () => {
      if (!user?.email) return;

      try {
        const emailEncoded = encodeURIComponent(user.email);
        const userRes = await fetch(
          `https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/MoviesUser/ByEmail/${emailEncoded}`,
          { credentials: 'include' }
        );

        if (!userRes.ok) throw new Error('Failed to fetch user ID');

        const userData = await userRes.json();
        const uid = userData.userId;
        setUserId(uid);

        const recData = await fetchUserTvRecommendationById(uid);
        const showIds = Object.values(recData).filter(Boolean);

        const titleRes = await fetch(
          'https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/Movie/GetMovieTitlesByShowIds',
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

  if (!user) return null; // Or show a loading state

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

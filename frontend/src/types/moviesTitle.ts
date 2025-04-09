export interface moviesTitle {
  id?: number;
  showId?: string;
  type?: string;
  title?: string;
  director?: string;
  cast?: string;
  country?: string;
  releaseYear?: number;
  rating?: string;
  duration?: string;
  description?: string;
  action?: number;
  adventure?: number;
  animeSeriesInternationalTvShows?: number;
  britishTvShowsDocuseriesInternationalTvShows?: number;
  children?: number;
  comedies?: number;
  comediesDramasInternationalMovies?: number;
  comediesInternationalMovies?: number;
  comediesRomanticMovies?: number;
  crimeTvShowsDocuseries?: number;
  documentaries?: number;
  documentariesInternationalMovies?: number;
  docuseries?: number;
  dramas?: number;
  dramasInternationalMovies?: number;
  dramasRomanticMovies?: number;
  familyMovies?: number;
  fantasy?: number;
  horrorMovies?: number;
  internationalMoviesThrillers?: number;
  internationalTvShowsRomanticTvShowsTvDramas?: number;
  kidsTv?: number;
  languageTvShows?: number;
  musicals?: number;
  natureTv?: number;
  realityTv?: number;
  spirituality?: number;
  tvAction?: number;
  tvComedies?: number;
  tvDramas?: number;
  talkShowsTvComedies?: number;
  thrillers?: number;

  [key: string]: any; // ← Add this to handle genre assignment dynamically
}

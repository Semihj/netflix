const key = "15b489d482590738a2bd580bb842c207"

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
    requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    requestVideo:`https://api.themoviedb.org/3/movie/157336/videos?api_key=${key}&append_to_response=videos`,
    requestVideo2:`https://api.themoviedb.org/3/movie/157336/videos?api_key=${key}`
  };

  export default requests
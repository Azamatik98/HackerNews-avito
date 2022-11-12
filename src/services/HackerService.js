import axios from "axios";

const _apiHacker = "https://hacker-news.firebaseio.com/v0/";

const getHackerNew = async (id) => {
  try {
    const news = await axios.get(`${_apiHacker}/item/${id}.json`);
    return news;
  } catch (error) {
    console.log("Error while getting a story.");
  }
};

const getHackerNews = async (type) => {
  try {
    const { data: newsIds } = await axios.get(
      `${_apiHacker}/${type}stories.json`
    );
    const newer = await Promise.all(newsIds.slice(0, 100).map(getHackerNew));
    return newer;
  } catch (error) {
    console.log("Error while getting list of stories.");
  }
};

export default getHackerNews;

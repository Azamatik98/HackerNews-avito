import axios from "axios";

const _apiHacker = "https://hacker-news.firebaseio.com/v0/";

export const getHackerNews = async () =>
  await axios
    .get(`${_apiHacker}newstories.json`)
    .then(({ data }) => data)
    .catch((error) => {
      console.log("Error when receiving the news list", error);
    });

export const getNewsItem = async (id) =>
  await axios
    .get(`${_apiHacker}item/${id}.json`)
    .then(({ data }) => data)
    .catch((error) => {
      console.log("Error receiving news", error);
    });

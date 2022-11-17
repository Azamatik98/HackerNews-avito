export const timeHackNews = (time) =>
  new Date(time * 1000).toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

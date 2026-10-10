const defaultVideoTitle = "Dr. Bipin Nepal — Featured Video";

// Add a new URL and title here to automatically create a new video block.
const videos = [
  { url: "https://youtu.be/ecD8Z2SkxTo", title: defaultVideoTitle },
  { url: "https://youtu.be/2ey79XnfrVY", title: defaultVideoTitle },
  { url: "https://youtu.be/G9fOmq_QkJQ", title: defaultVideoTitle },
  { url: "https://youtu.be/IL_hHkaRhJ0", title: defaultVideoTitle },
  { url: "https://youtu.be/HhCxEprGl7A", title: defaultVideoTitle },
  { url: "https://youtu.be/4WDk0Bo-Xw8", title: defaultVideoTitle },
  { url: "https://youtu.be/G0uunXlOBbs", title: defaultVideoTitle },
  { url: "https://youtu.be/7m3LyZ6rZ4Y", title: defaultVideoTitle },
  { url: "https://youtu.be/QgrOGBxV4UU", title: defaultVideoTitle },
  { url: "https://youtu.be/dufFsXk3mcY", title: defaultVideoTitle },
  { url: "https://youtu.be/ia3I82seHXI", title: defaultVideoTitle },
  { url: "https://youtu.be/5FrWp_pxjoQ", title: defaultVideoTitle },
  { url: "https://youtu.be/60HXpH6RztU", title: defaultVideoTitle },
  { url: "https://youtu.be/Xh_-nZILZI8", title: defaultVideoTitle },
  { url: "https://youtu.be/fMS4O9W-7LE", title: defaultVideoTitle },
  { url: "https://youtu.be/MZvr3Arh5cE", title: defaultVideoTitle },
  { url: "https://youtu.be/DZPQ0eEMFbM", title: defaultVideoTitle },
];

export function getYouTubeId(url) {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === "youtu.be") return parsedUrl.pathname.slice(1);
    return parsedUrl.searchParams.get("v") || "";
  } catch {
    return "";
  }
}

export default videos;

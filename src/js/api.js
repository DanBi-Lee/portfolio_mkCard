const key = "17163984-867a8b6f54b9fd842905aca26";

export const getFontList = async () => {
  const response = await fetch("./data/fontList.json");
  const data = await response.json();
  return data;
};

export const fetchImg = async (keyword, page = 1) => {
  const response = await fetch(
    `https://pixabay.com/api/?key=${key}&q=${keyword}&per_page=36&page=${page}`
  );
  const data = await response.json();
  return data;
};

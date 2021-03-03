const fontUrl = "./data/fontList.json";

export const getFontList = async () => {
  const response = await fetch("./data/fontList.json");
  const data = await response.json();
  return data;
};

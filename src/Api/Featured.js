import useAxios from "../Hooks/useAxios";

//// image post in database
export const imagePost = async (img) => {
  const { data } = await useAxios.post("/images", img);
  return data;
};

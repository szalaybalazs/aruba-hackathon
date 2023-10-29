import { useLocation } from "react-router-dom";

export const useFromLocation = () => {
  const location = useLocation();
  const from = `${location?.pathname}${location?.search}`;
  return from;
};

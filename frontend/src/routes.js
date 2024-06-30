export const beginGame = async () => {
  const response = await fetch("http://localhost:5555/game", {
    method: "POST",
  });
  return response;
};

export const fetchGame = async () => {
  const response = await fetch("http://localhost:5555/game/1");
  const json = await response.json();
  return json;
};

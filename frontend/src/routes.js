export const beginGame = async () => {
  const response = await fetch("/api/game", {
    method: "POST",
  });
  return response;
};

export const fetchGame = async (game) => {
  const response = await fetch("/api/game/1");
  return response;
};

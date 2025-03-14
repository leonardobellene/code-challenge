export const formatRuntime = (minutes: string | null): string => {
  if (!minutes) return "Unknown runtime";
  const mins = parseInt(minutes, 10);
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m`;
};

export const parseCharacters = (characters: string | null): string[] => {
  if (!characters) return [];

  try {
    const parsed = JSON.parse(characters);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse characters:", error);
    return [];
  }
};

export const convertMinsToHours = (mins: number) => {
  if (mins % 60 === 0) return `1 hr`;
  if (mins / 60 < 1 && mins % 60 <= 59) return `${mins} min`;
  return `${Math.floor(mins / 60)}hr ${mins % 60}min`;
};

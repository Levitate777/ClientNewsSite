export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleDateString('en-US', options);
};

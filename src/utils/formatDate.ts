export const formatDate = (isoString: string) => {
  const date = isoString.length ? new Date(isoString) : new Date('2011-02-03T09:12:12.000Z');

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleDateString('en-US', options);
};

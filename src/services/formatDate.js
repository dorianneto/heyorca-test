const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'America/Vancouver'
};

module.exports = (date) => {
  return new Intl
    .DateTimeFormat('en-CA', options)
    .format(new Date(date).getTime());
}

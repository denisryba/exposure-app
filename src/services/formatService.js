const setName = name => name.first + ' ' + name.middle + ' ' + name.last;
const setShortName = name => name.first[0] + '. ' + name.middle[0] + '. ' + name.last;
const setDate = date => new Date(date).toLocaleDateString();

export default {
  setName,
  setShortName,
  setDate
};
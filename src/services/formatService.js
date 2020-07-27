const setName = name => name.last + ' ' + name.first + ' ' + name.middle;
const setShortName = name => name.first[0] + '. ' + name.middle[0] + '. ' + name.last;
const setDate = date => new Date(date).toLocaleDateString();

export default {
  setName,
  setShortName,
  setDate
};
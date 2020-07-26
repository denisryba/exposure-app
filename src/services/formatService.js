const getName = name => name.first + ' ' + name.middle + ' ' + name.last;
const getShortName = name => name.first[0] + '. ' + name.middle[0] + '. ' + name.last;
const getDate = date => new Date(date).toLocaleDateString();

export default {
  getName,
  getShortName,
  getDate
};
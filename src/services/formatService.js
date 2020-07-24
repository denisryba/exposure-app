const setName = name => name.first + ' ' + name.middle + ' ' + name.last;
const setDate = date => new Date(date).toLocaleDateString();

export default {
  setName,
  setDate
};
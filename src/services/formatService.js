const setName = name => name.last + ' ' + name.first + ' ' + name.middle;

const setShortName = (name)=> 'черепашка'

const setDate = date => new Date(date).toLocaleDateString();

const getRole = role => {
  const roleMaps = {
    employee: 'сотрудник',
    supervisor: 'руководитель',
    hr: 'сотрудник кадровой службы',
  };
  return roleMaps[role];
};

const capitalizeFirstLetter = str => str[0].toUpperCase() + str.slice(1);

export default {
  setName,
  setShortName,
  setDate,
  getRole,
  capitalizeFirstLetter
};
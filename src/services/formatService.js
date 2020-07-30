
const setShortName = name => name.split(/\s+/).map((w, i) => i ? w.substring(0,1).toUpperCase() + '.' : w ).join(' ');

const getStage = (stage) => {
  switch (stage) {
    case 0:
      stage = 'Заполнение сотрудником';
      break;
    case 1:
      stage = 'Согласование руководителем';
      break;
    case 2:
      stage = 'Выполнение';
      break;
    case 3:
      stage = 'Оценка руководителем';
      break;
    default:
      stage = 'Оценка завершена';
  }
  return stage;
}


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
  getStage,
  setShortName,
  setDate,
  getRole,
  capitalizeFirstLetter
};
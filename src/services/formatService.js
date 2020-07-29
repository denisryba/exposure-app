const setName = name => name.last + ' ' + name.first + ' ' + name.middle;

const setShortName = (name)=> 'черепашка';

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
  setName,
  setShortName,
  setDate,
  getRole,
  capitalizeFirstLetter
};
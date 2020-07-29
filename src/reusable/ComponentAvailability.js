export default function ComponentAvailability({ stageRoleObj, currentRole, currentStage, children }) {
  if (currentStage === 4) return null
  else if (currentRole === 'hr') return children;
  
  const userIn = stageRoleObj[currentRole].includes(currentStage);
  // console.log(stageRoleObj[currentRole]);
  // console.log(currentStage);

  if (userIn) {
    return (
      children
    )
  } else {
    return null;
  }
}
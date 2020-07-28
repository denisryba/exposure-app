export default function ComponentAvailability({ stageRoleObj, currentRole, currentStage, children }) {
  if (currentStage === 4) return null
  else if (currentRole === 'hr') return children;
  console.log(stageRoleObj);
  const userIn = stageRoleObj[currentRole].includes(currentStage);

  if (userIn) {
    return (
      children
    )
  } else {
    return null;
  }
}
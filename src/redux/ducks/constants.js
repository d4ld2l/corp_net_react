export const projectName = 'shr'

export function actionTemplate(storeName){
  return (action) => `${projectName}/${storeName}/${action}`
}

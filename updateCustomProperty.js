/*Helper file that updates custom css values into JS values easier */

/* Get CSS value, get specific prop value, and convert to a NUMBER
if no number then default to 0*/
export function getCustomProperty(elem, prop) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
}
/* set value*/
export function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value)
}

/* combines both 
get current value, added inc and set the value*/
export function incrementCustomProperty(elem, prop, inc) {
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)
}

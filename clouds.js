///*update ground position on screen*/
import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const cloudsElems = document.querySelectorAll("[data-clouds]")
    
 export function updateClouds(delta, speedScale) {
    cloudsElems.forEach(clouds => {
      incrementCustomProperty(clouds, "--left", delta * speedScale * SPEED * -1)
  
      /*Make sures clouds are looped in background*/
      if (getCustomProperty(clouds, "--left") <= -300) {
        incrementCustomProperty(clouds, "--left", 600)
      }
    })
  }
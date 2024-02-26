import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const WATER_INTERVAL_MIN = 500 /*when water appears*/
  const WATER_INTERVAL_MAX = 2000
  const worldElem = document.querySelector("[data-world]") /*adds water to screen*/
  
  let nextWaterTime


export function setupWater() {
    nextWaterTime = WATER_INTERVAL_MIN
    document.querySelectorAll("[data-water]").forEach(water => {
      water.remove()
    })
}
  
export function updateWater(delta, speedScale) {
    document.querySelectorAll("[data-water]").forEach(water => {
      incrementCustomProperty(water, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(water, "--left") <= -100) {
        water.remove() /*get rid when restart*/
      }
    })
  
    if (nextWaterTime <= 0) {
      createWater()
      nextWaterTime =
        randomNumberBetween(WATER_INTERVAL_MIN, WATER_INTERVAL_MAX) / speedScale
    }
    nextWaterTime -= delta
}
  
export function getWaterRects() {
    return [...document.querySelectorAll("[data-water]")].map(water => {
      return water.getBoundingClientRect()
    })
}
  
  
  function createWater() { 
    const water = document.createElement("img")
    water.dataset.water = true
    water.src = "imgs/water.png"
    water.classList.add("water")
    setCustomProperty(water, "--left", 100)
    worldElem.append(water)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
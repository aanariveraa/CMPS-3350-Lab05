/*Makes Cat jump*/
import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"

const catElem = document.querySelector("[data-cat]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const CAT_FRAME_COUNT = 2 
const FRAME_TIME = 100

let isJumping
let catFrame
let currentFrameTime
let yVelocity
let jumpSound = new Audio("jump.mp3") //jump audio 
let deadSound = new Audio("dead.mp3") //dead audio 
let isFirstJump = true // Flag to track if it's the first jump

export function setupCat() {
    isJumping = false
    catFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(catElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump) 
    document.addEventListener("keydown", onJump)
}
  
export function updateCat(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
  }

export function getCatRect() {
    return catElem.getBoundingClientRect()
  }
  
export function setCatLose() {
    catElem.src = "images/cat-lose.png"
    deadSound.play();
  }

function handleRun(delta, speedScale) {
    if (isJumping) {
      catElem.src = `images/cutecat.png`
      return
    }

    if (currentFrameTime >= FRAME_TIME) { 
      catFrame = (catFrame + 1) % CAT_FRAME_COUNT /*updates frame*/
      catElem.src = `images/cat-run-${catFrame}.png` 
      currentFrameTime -= FRAME_TIME /*reset frame*/
    }
    currentFrameTime += delta * speedScale /*animation gets faster*/
  }
  
function handleJump(delta) {
    if (!isJumping) return
  
    incrementCustomProperty(catElem, "--bottom", yVelocity * delta)
  
    if (getCustomProperty(catElem, "--bottom") <= 0) {
      setCustomProperty(catElem, "--bottom", 0)
      isJumping = false
    }
    yVelocity -= GRAVITY * delta
}
  
  function onJump(e) { /*Envent listener to make jump */
    if (e.code !== "Space" || isJumping) return

    //sound effect for jumping
    if (!isFirstJump) {
      jumpSound.currentTime = 0 // Reset the audio to start from the beginning
      jumpSound.play() // Play the jump sound
    } else {
      isFirstJump = false // Set isFirstJump to false after the first jump
    }
      
    yVelocity = JUMP_SPEED
    isJumping = true
  }

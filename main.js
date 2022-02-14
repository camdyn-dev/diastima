// import './style.css'

import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'//"three"

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const scene = new THREE.Scene()


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

renderer.render(scene, camera)



// const geometry = new THREE.TorusGeometry(10, 3, 16, 100) //this decides what shape the object takes
// const material = new THREE.MeshPhongMaterial({ color: 0xA020F0 }) //this decides the material of that shape
// const torus = new THREE.Mesh(geometry, material) //this instantiates the shape

// scene.add(torus)
const earthTexture = new THREE.TextureLoader().load("img/earf.jpg")
const earthNormal = new THREE.TextureLoader().load("img/earfNormal.jpg")
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture, normal: earthNormal })
)
const earthOrbit = new THREE.Object3D()

const moonTexture = new THREE.TextureLoader().load("img/moon.jpg")
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2.5, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture })
)

const jupiterTexture = new THREE.TextureLoader().load("img/jupiter2.jpg")
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(110, 32, 32),
  new THREE.MeshStandardMaterial({ map: jupiterTexture })
)

const marsTexture = new THREE.TextureLoader().load("img/mars2.jpg")
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({ map: marsTexture })
)

jupiter.position.x = -500 //setting jupiter far away
jupiter.position.z = -1000 //setting it far off to the right
jupiter.position.y = 100 //setting it H I G H
earthOrbit.add(moon) //making the moon orbit earf

earthOrbit.position.z = -1 //offsetting the earth a bit for the camera
earth.position.z = -1 //same here

mars.position.z = -250
mars.position.x = -150
mars.position.y = -30

moon.position.x = -50 //moon positioning
moon.position.y = 30
moon.position.z = -8

scene.add(earth, earthOrbit, jupiter, mars)


camera.position.set(35, 0, 10) //LEAVE THIS, FOR SOME FUCKING REASON IT DOES N O T WORK WITHOUT IT, CHECK LINE 78 -> 82

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(250, 0, 0) //lightbulb. set it's position on the x y z axis
scene.add(pointLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(2000, 50) //this creates a grid
// scene.add(lightHelper, gridHelper) //shows where the point light is and what direction it points

// const controls = new OrbitControls(camera, renderer.domElement) //this creates a control for me to move around and view that grid in 35


const spaceTexture = new THREE.TextureLoader().load("img/space.jpg")
scene.background = spaceTexture
let t = document.body.getBoundingClientRect().top

for (let i = 0; i < 1; i++) {
  camera.position.x = t * -.005 + 7
  camera.position.y = t * -.0001 + 0
  camera.position.z = t * -.0001 + 15
} //LEAVE THIS AS WELL, IT REMOVES THE BUG WHERE IT SNAPS INTO THE CORRECT POSITION UPON FIRST SCROLL


//this lets me move the camera while it scrolls 
function moveCamera() {
  t = document.body.getBoundingClientRect().top
  // moves the camera position


  camera.position.x = t * -.006 + 7
  camera.position.y = t * -.0001 + 0
  camera.position.z = t * -.0001 + 15
}

document.body.onscroll = moveCamera



const animate = () => {
  requestAnimationFrame(animate)

  // torus.rotation.x += 0.01 //rotation for the object
  // torus.rotation.y += 0.01
  // torus.rotation.z += 0.01
  earth.rotateY(0.0005) // one rotation in 1 min 45 secs
  mars.rotateY(0.00049)
  moon.rotateY(0.00001785) // now I think this should do one rotation every like 50 mins
  earthOrbit.rotateY(0.00001785)
  jupiter.rotateY(0.0012)


  // mars.rotateY(0.0004) //mars days r a lil longer so i do dat

  // controls.update() //updates the controls to add the orbitcontrols

  renderer.render(scene, camera)
  document.body.scroll({
    top: 1
  })
}

animate()
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const paperBasePath = "static/textures/Watercolor_Paper_001_COLOR.jpg"
const paperNormalPath = "static/textures/Watercolor_Paper_001_NORM.jpg"
// const typeWriterModlePath = "https://rawcdn.githack.com/nishi-dy/glb--files/d0a6e1e252671749fc9d80dd5e8e375f132dab56/glass.glb"
const typeWriterModlePath = "static/model/typewriter.glb"

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#webGL") as HTMLCanvasElement
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)

// Scene
const scene = new THREE.Scene()

/**
 * Camera
 */
const fov: number = 45              // 画角
    , aspectRatio = sizes.width / sizes.height  // アスペクト比
const camera = new THREE.PerspectiveCamera(fov, aspectRatio)
camera.position.set(1, 0, 10)

/**
 * Light
 */
const directionalLight = new THREE.DirectionalLight(0xFFFFFF)
directionalLight.position.set(0, 15, 20)
scene.add(directionalLight)

// textures
const textureLoader = new THREE.TextureLoader()
const paperBaseColor = textureLoader.load(paperBasePath)
const paperNormalMap = textureLoader.load(paperNormalPath)

// Paper 実寸 437, 618px
const a4 = {
    width: 21.0,
    height: 29.7
}
const geometry = new THREE.PlaneGeometry(4.2, 5) // 形状
const material = new THREE.MeshStandardMaterial({
    map: paperBaseColor,
    normalMap: paperNormalMap,
    normalScale: new THREE.Vector2(0.2, 0.2),
}) // 質感
const paper = new THREE.Mesh(geometry, material)
paper.position.set(1.15, -1.5, -0.7)
scene.add(paper)

tick();

function tick() {
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
}

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// typeWriter
let typeWriter = new THREE.Group;
const gltfLoader = new GLTFLoader();
gltfLoader.load(typeWriterModlePath, function(gltf){
    console.log(gltf)
    typeWriter = gltf.scene
    typeWriter.scale.set(2, 2, 2)
    typeWriter.position.set(0, -3.5, -1)
    scene.add(typeWriter)
})

// const mainElement = document.querySelector(".main")
// const div = document.createElement("div")
// div.style.position = "absolute"
// div.innerHTML = "Hello, World!\na\na\na\na\na\na\na\na\na"
// let divTop = a4.height + paper.position.y
// let divLeft = a4.width + paper.position.x
// div.style.top =  divTop + "px"
// div.style.left = divLeft + "px"
// mainElement?.appendChild(div)
const overlay = document.querySelector("#overlay")
const paperOverlay = document.createElement("div")
paperOverlay.className = "paper"
paperOverlay.style.position = "absolute"
paperOverlay.style.top = paper.position.y + "px"
overlay?.appendChild(paperOverlay)

window.addEventListener('wheel', (event) => {
    event.preventDefault();
    paper.position.y -= event.deltaY * 0.005
    paper.position.clampScalar(-50, 10)

    // const paperPosition = paper.getWorldPosition(new THREE.Vector3())
    // const projection = paperPosition.project(camera)
    // const sx = (sizes.height / 2) * (+projection.x + 1.0)
    // const sy = (sizes.width / 2) * (-projection.y + 1.0)
    // divTop += event.deltaY * 0.005
    // div.style.top = sy + -180 + "px"
}, { passive: false })
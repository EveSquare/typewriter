import * as THREE from "three"

const paperBasePath = "static/textures/Watercolor_Paper_001_COLOR.jpg"
const paperNormalPath = "static/textures/Watercolor_Paper_001_NORM.jpg"


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
camera.position.set(0, 0, +500)

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

// Paper
const geometry = new THREE.PlaneGeometry(210, 297) // 形状
const material = new THREE.MeshStandardMaterial({
    map: paperBaseColor,
    normalMap: paperNormalMap,
    normalScale: new THREE.Vector2(0.2, 0.2),
}) // 質感
const paper = new THREE.Mesh(geometry, material)
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
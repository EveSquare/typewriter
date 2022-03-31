import { WebGLRenderer, PerspectiveCamera, Scene, Color } from 'three';
import TypeScene from './objects/Scene';

// import FontJSON from "assets/font/Roboto-msdf.json";
// import FontImage from "assets/font/Roboto-msdf.png";

// const typeWriterModlePath = "https://rawcdn.githack.com/nishi-dy/glb--files/d0a6e1e252671749fc9d80dd5e8e375f132dab56/glass.glb"

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({antialias: true});
const typeScene = new TypeScene();

/**
 * Scene
 */
scene.add(typeScene);
scene.background = new Color( 0x505050 );

/**
 * Camera
 */
camera.position.set(1, 0, 10);
// camera.lookAt(new Vector3(0,0,0));

/**
 * Renderer
 */
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor(0x7ec0ee, 1);

/**
 * Render loop
 */
const onAnimationFrameHandler = (timeStamp: any) => {
    renderer.render(scene, camera);
    typeScene.update && typeScene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

/**
 * Resize
 */
const windowResizeHanlder = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

window.addEventListener("wheel", onMouseWheel, { passive: false });

/**
 * DOM
 */
document.body.style.margin = "0";
document.body.appendChild( renderer.domElement );

// const mainElement = document.querySelector(".main")
// const div = document.createElement("div")
// div.style.position = "absolute"
// div.innerHTML = "Hello, World!\na\na\na\na\na\na\na\na\na"
// let divTop = a4.height + paper.position.y
// let divLeft = a4.width + paper.position.x
// div.style.top =  divTop + "px"
// div.style.left = divLeft + "px"
// mainElement?.appendChild(div)

function onMouseWheel(event: WheelEvent) {
    // event.preventDefault();
    // paper.position.y -= event.deltaY * 0.005
    // paper.position.clampScalar(-50, 10)

    // const paperPosition = paper.getWorldPosition(new THREE.Vector3())
    // const projection = paperPosition.project(camera)
    // const sx = (sizes.height / 2) * (+projection.x + 1.0)
    // const sy = (sizes.width / 2) * (-projection.y + 1.0)
    // divTop += event.deltaY * 0.005
    // div.style.top = sy + -180 + "px"
}

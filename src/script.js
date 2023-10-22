import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'lil-gui'
import Stats from 'stats.js'

// Concept adapted from @kandabi via https://github.com/kandabi/threejs-impossibox
import { ImpossibleBox } from './content/impossible-box'


/**
 * Stats
 */
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

THREE.ColorManagement.enabled = false


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const rgbeLoader = new RGBELoader()

rgbeLoader.load('/textures/environmentMaps/space_sunset.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 10
camera.position.y = 10
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
const pointLight_1 = new THREE.PointLight(0xffffff, 0.7, 50, 0.7);
pointLight_1.position.set(-5, 12, 10);

const pointLight_2 = new THREE.PointLight(0xffffff, 0.35, 50, 0.7);
pointLight_2.position.set(4, 9, 4);

pointLight_1.castShadow = true;
pointLight_1.shadow.radius = 4;
pointLight_1.shadow.mapSize.height = 512;
pointLight_1.shadow.mapSize.width = 512;

pointLight_2.castShadow = true;
pointLight_2.shadow.radius = 4;
pointLight_2.shadow.mapSize.height = 512;
pointLight_2.shadow.mapSize.width = 512;


scene.add(ambientLight);
scene.add(pointLight_1);
scene.add(pointLight_2);


/**
 * Loaders
 */

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/draco/');
dracoLoader.preload();

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);


/**
 * Box Frame
 */

gltfLoader.load('/models/box_frame.glb', (gltf) => {
    gltf.scene.scale.set(2.0, 2.0, 2.0)
    gltf.scene.position.set(0, -4.0, 0)
    scene.add(gltf.scene)
})


gltfLoader.load('/models/scene.glb', (gltf) => {
    gltf.scene.scale.set(2.0, 2.0, 2.0)
    gltf.scene.position.set(0, -6.0, 0)
    gltf.scene.receiveShadow = true;
    scene.add(gltf.scene)
})


/**
 * Impossible Box
 */
const impossibleBox = new ImpossibleBox(scene);
impossibleBox.create();


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    stats.begin()

    const elapsedTime = clock.getElapsedTime()

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)

    stats.end()
}

tick()
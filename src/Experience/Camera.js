import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        this.setInstance()
        this.setControls()

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Camera')

            this.debugFolder.add(this.instance.position, 'x').step(0.01).min(-10).max(10).name('position x')
            this.debugFolder.add(this.instance.position, 'y').step(0.01).min(-10).max(10).name('position y')
            this.debugFolder.add(this.instance.position, 'z').step(0.01).min(-10).max(10).name('position z')

            this.debugFolder.add(this.controls.target, 'x').step(0.01).min(-10).max(10).name('target x')
            this.debugFolder.add(this.controls.target, 'y').step(0.01).min(-10).max(10).name('target y')
            this.debugFolder.add(this.controls.target, 'z').step(0.01).min(-10).max(10).name('target z')

            this.debugFolder.add(this.controls, 'minDistance').step(0.01).min(0).max(100).name('minDistance')
            this.debugFolder.add(this.controls, 'maxDistance').step(0.01).min(0).max(100).name('maxDistance')
            this.debugFolder.add(this.controls, 'minPolarAngle').step(0.01).min(0).max(Math.PI).name('minPolarAngle')
            this.debugFolder.add(this.controls, 'maxPolarAngle').step(0.01).min(0).max(Math.PI).name('maxPolarAngle')
            this.debugFolder.add(this.controls, 'minAzimuthAngle').step(0.01).min(-Math.PI).max(Math.PI).name('minAzimuthAngle')
            this.debugFolder.add(this.controls, 'maxAzimuthAngle').step(0.01).min(-Math.PI).max(Math.PI).name('maxAzimuthAngle')

            this.debugFolder.add(this.controls, 'enableDamping').name('enableDamping')
            this.debugFolder.add(this.controls, 'enablePan').name('enablePan')
            this.debugFolder.add(this.controls, 'enableZoom').name('enableZoom')
            this.debugFolder.add(this.controls, 'enableRotate').name('enableRotate')
            this.debugFolder.add(this.controls, 'autoRotate').name('autoRotate')
            this.debugFolder.add(this.controls, 'autoRotateSpeed').step(0.01).min(-10).max(10).name('autoRotateSpeed')
            this.debugFolder.add(this.controls, 'dampingFactor').step(0.001).min(0).max(.1).name('dampingFactor')
            this.debugFolder.add(this.controls, 'zoomSpeed').step(0.01).min(-10).max(10).name('zoomSpeed')
            this.debugFolder.add(this.controls, 'rotateSpeed').step(0.01).min(-10).max(10).name('rotateSpeed')
            this.debugFolder.add(this.controls, 'panSpeed').step(0.01).min(-10).max(10).name('panSpeed')


        }
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(10, 10, 10)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enablePan = false
        this.controls.minDistance = 10
        this.controls.maxDistance = 25
        this.controls.maxPolarAngle = Math.PI / 1.75
        this.controls.rotateSpeed = .8
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}
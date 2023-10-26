import * as THREE from 'three'
import Experience from '../Experience.js'

export default class BedRoom
{
    constructor() 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Kitchen')
        }

        // Resource
        this.resource = this.resources.items.kitchenModel
        
        this.setBackground()
        this.setModel()
    }

    setBackground() 
    {
        const backgroundGeometrySphere = new THREE.SphereGeometry(8, 32, 32);
        const backgroundMaterial = new THREE.MeshStandardMaterial({
            side: THREE.BackSide,
            color: new THREE.Color(0xf5fa6e),
            flatShading: true,
            envMap: this.resources.items.spaceSunsetEnvironmentMap,
        });

        this.background = new THREE.Mesh(
            backgroundGeometrySphere,
            backgroundMaterial
        );
    }

    setModel() 
    {
        this.model = this.resource.scene
    }
}
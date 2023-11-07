import * as THREE from 'three'
import Experience from '../Experience.js'

export default class PortalScene
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
            this.debugFolder = this.debug.ui.addFolder('Portal Scene')
        }

        // Resource
        this.resource = this.resources.items.portalSceneModel
        
        this.setBackground()
        this.setModel()
    }

    setBackground() 
    {
        const environmentMap = this.resources.items.spaceSunsetEnvironmentMapHDR

        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(30, 32, 32),
            new THREE.MeshBasicMaterial({ 
                side: THREE.BackSide,
                envMap: environmentMap, 
             }),
        )
        this.background = sphere
    }

    setModel() 
    {
        this.backedTexture = this.resources.items.portalTexture
        this.backedTexture.flipY = false

        this.model = this.resource.scene

        const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0 })
        const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5,  transparent: true, opacity: 0.0 })

        this.model.traverse((child) =>
        {
            if(child.isMesh)
            {
                child.scale.set(4, 4, 4)
                child.position.set(0, -4, 0)
                child.rotation.set(0, Math.PI, 0)

                child.material.envMap = this.resources.items.spaceSunsetEnvironmentMap
                child.material.map = this.backedTexture
            }
        })

        const portalLightMesh = this.model.getObjectByName('portalLight')
        const poleLightAMesh = this.model.getObjectByName('poleLightA')
        const poleLightBMesh = this.model.getObjectByName('poleLightB')

        portalLightMesh.material = portalLightMaterial
        poleLightAMesh.material = poleLightMaterial
        poleLightBMesh.material = poleLightMaterial
    }
}
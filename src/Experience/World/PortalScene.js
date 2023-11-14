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
        
        this.setModel()
    }

    setModel() 
    {

        const stencilId = 5

        this.backedTexture = this.resources.items.portalTexture
        this.backedTexture.flipY = false

        this.model = this.resource.scene
        this.model.scale.set(4.0, 4.0, 4.0)
        this.model.position.set(0, -4, 0)
        this.model.rotation.set(0, Math.PI, 0)
        this.scene.add(this.model)

        const portalLightMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            stencilFuncMask: 0xff,
            stencilWrite: true,
            stencilFunc: THREE.EqualStencilFunc,
            stencilZPass: THREE.KeepStencilOp,
            stencilZFail: THREE.KeepStencilOp,
            stencilFail: THREE.KeepStencilOp,
            stencilRef: stencilId
        })
        const poleLightMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffe5,
            stencilFuncMask: 0xff,
            stencilWrite: true,
            stencilFunc: THREE.EqualStencilFunc,
            stencilZPass: THREE.KeepStencilOp,
            stencilZFail: THREE.KeepStencilOp,
            stencilFail: THREE.KeepStencilOp,
            stencilRef: stencilId
        })


        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                let newMaterial = child.material.clone()
                newMaterial.stencilFuncMask = 0xff;
                newMaterial.stencilWrite = true
                newMaterial.stencilFunc = THREE.EqualStencilFunc
                newMaterial.stencilZPass = THREE.KeepStencilOp
                newMaterial.stencilZFail = THREE.KeepStencilOp
                newMaterial.stencilFail = THREE.KeepStencilOp
                newMaterial.stencilRef = stencilId

                newMaterial.envMap = this.resources.items.spaceSunsetEnvironmentMap
                newMaterial.map = this.backedTexture
                child.material = newMaterial
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
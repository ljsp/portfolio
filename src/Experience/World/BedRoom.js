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
            this.debugFolder = this.debug.ui.addFolder('Room')
        }

        // Resource
        this.resource = this.resources.items.bedRoomModel

        this.setModel()
    }

    setModel() 
    {
        this.model = this.resource.scene
        this.model.scale.set(2.0, 2.0, 2.0)
        this.model.rotation.set(0, - Math.PI / 2, 0)
        this.scene.add(this.model)

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
                newMaterial.stencilRef = 0
                child.material = newMaterial
            }
        })
    }
}
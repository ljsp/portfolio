import * as THREE from 'three'
import { Portal } from '../Utils/Portal.js'
import Experience from '../Experience.js'
import Kitchen from './Kitchen.js'
import SpaceShip from './SpaceShip.js'
import PortalScene from './PortalScene.js'

 
export default class ImpossibleBox 
{

   constructor() 
   {
      this.experience = new Experience()
      this.scene = this.experience.scene
      this.resources = this.experience.resources
      this.time = this.experience.time
      this.debug = this.experience.debug
      
      this.group = new THREE.Group()
      this.squarePortal = new Portal(8,8)
      this.rectanglePortal = new Portal(4,8)
      

      // Debug
      if(this.debug.active)
      {
         this.debugFolder = this.debug.ui.addFolder('ImpossibleBox')      
      }

      // Resources
      this.kitchen = new Kitchen()
      this.spaceShip = new SpaceShip()
      this.portalScene = new PortalScene()

      //this.createBoxFrame()
      this.createPortals()

      this.scene.add(this.group)

   }

   render(time) {
      this.group.rotation.y += time * 0.15
      this.meshes.forEach((mesh, index) => {
         mesh.rotation.y += time * 0.05 * (index + 1)
         mesh.rotation.z -= time * 0.1 * (index + 1)
      });
   }
 
   createBoxFrame() {
      this.boxFrame = this.resources.items.boxFrame.scene
      this.boxFrame.scale.set(2, 2, 2)
      this.boxFrame.position.set(0, -4, 0)
      this.scene.add(this.boxFrame)
   }
 
   createPortals() {

      this.group.add(
         this.rectanglePortal.create({
            background: this.spaceShip.background, 
            scene: this.spaceShip.model,
            portal: {
               position: new THREE.Vector3(0, -2., 4),
               //debugColor: new THREE.Color('#0000ff'),
            }
         })
      )

      
      this.group.add(
         this.rectanglePortal.create({
            background: this.kitchen.background,
            scene: this.kitchen.model,
            portal: {
               position: new THREE.Vector3(4.0, -2., 0),
               rotation: new THREE.Vector3(0, Math.PI * 0.5, 0),
               //debugColor: new THREE.Color('#00ff00'),
            }
         })
      )
      

      this.group.add(
         this.squarePortal.create({
            background: this.spaceShip.background,
            scene: this.spaceShip.model,
            portal: {
               position: new THREE.Vector3(-4, 0, 0),
               rotation: new THREE.Vector3(0, Math.PI * -0.5, 0),
            }
         })
      )

      this.group.add(
         this.squarePortal.create({
            background: this.portalScene.background,
            scene: this.portalScene.model,
            portal: {
               position: new THREE.Vector3(0, 0, -4),
               rotation: new THREE.Vector3(0, Math.PI, 0),
            }
         })
      )

      /*
      this.group.add(
         this.squarePortal.create({
            background: this.room.background,
            scene: this.room.model,
            portal: {
               height: 8,
               width: 8,
               position: new THREE.Vector3(0, 0, 0),
               rotation: new THREE.Vector3(Math.PI * -0.5, 0, 0),
               debugColor: new THREE.Color('#ff0000'),
            }
         })
      )
      */
   }
}
 

 
import * as THREE from 'three';
import Experience from '../Experience.js';
import BedRoom from './BedRoom.js';
import Kitchen from './Kitchen.js';
import { Portal } from '../Utils/Portal.js';

 
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
      this.portal = new Portal(8)
      

      // Debug
      if(this.debug.active)
      {
         this.debugFolder = this.debug.ui.addFolder('ImpossibleBox')
      }

      // Resources
      this.room = new BedRoom();
      this.kitchen = new Kitchen();


      this.createBoxFrame()
      this.createPortals()

      this.scene.add(this.group)

   }

   render(time) {
      this.group.rotation.y += time * 0.15;
      this.meshes.forEach((mesh, index) => {
         mesh.rotation.y += time * 0.05 * (index + 1);
         mesh.rotation.z -= time * 0.1 * (index + 1);
      });
   }
 
   createBoxFrame() {
      this.boxFrame = this.resources.items.boxFrame.scene;
      this.boxFrame.scale.set(2, 2, 2);
      this.boxFrame.position.set(0, -4, 0);
      this.scene.add(this.boxFrame);
   }
 
   createPortals() {

      this.group.add(
         this.portal.create({
            background: this.room.background, 
            scene: this.room.model,
            portal: {
               position: new THREE.Vector3(0, 0, 4),
            },
         })
      );

      
      this.group.add(
         this.portal.create({
            background: this.kitchen.background,
            scene: this.kitchen.model,
            portal: {
               position: new THREE.Vector3(4.0, 0, 0),
               rotation: new THREE.Vector3(0, Math.PI * 0.5, 0),
            },
         })
      );
      

      this.group.add(
         this.portal.create({
            background: this.room.background,
            scene: this.room.model,
            portal: {
               position: new THREE.Vector3(-4, 0, 0),
               rotation: new THREE.Vector3(0, Math.PI * -0.5, 0),
            },
         })
      );

      this.group.add(
         this.portal.create({
            background: this.kitchen.background,
            scene: this.kitchen.model,
            portal: {
               position: new THREE.Vector3(0, 0, -4),
               rotation: new THREE.Vector3(0, Math.PI, 0),
            },
         })
      );

      this.group.add(
         this.portal.create({
            background: this.room.background,
            scene: this.room.model,
            portal: {
               position: new THREE.Vector3(0, 4, 0),
               rotation: new THREE.Vector3(Math.PI * -0.5, 0, 0),
            },
         })
      );

      this.group.add(
         this.portal.create({
            background: this.kitchen.background,
            scene: this.kitchen.model,
            portal: {
               position: new THREE.Vector3(0, -4, 0),
               rotation: new THREE.Vector3(Math.PI * 0.5, 0, 0),
            },
         })
      );
      
   }
}
 

 
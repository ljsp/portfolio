import * as THREE from 'three'
import { Portal } from '../Utils/Portal.js'
import Experience from '../Experience.js'
import Kitchen from './Kitchen.js'
import Workshop from './Workshop.js'
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
      
      this.backgrounds = []
      this.group = new THREE.Group()
      this.squarePortal = new Portal(8,8)
      this.rectanglePortal = new Portal(4,8)
      

      // Debug
      if(this.debug.active)
      {
         this.debugFolder = this.debug.ui.addFolder('ImpossibleBox')      
      }

      this.createPortals()

      // Resources
      this.kitchen = new Kitchen()
      this.workshop = new Workshop()
      this.portalScene = new PortalScene()

      //this.createBoxFrame()

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

      // Workshop Background
      const backgroundGeometrySphere = new THREE.SphereGeometry(16, 32, 32);
        const backgroundMaterial = new THREE.MeshStandardMaterial({
            side: THREE.BackSide,
            color: new THREE.Color(0xf5fa6e),
            flatShading: true,
            envMap: this.resources.items.spaceSunsetEnvironmentMap,
        });

        const workshopBackground = new THREE.Mesh(
            backgroundGeometrySphere,
            backgroundMaterial
        );

      this.group.add(
         this.rectanglePortal.create({
            background: workshopBackground, 
            portal: {
               position: new THREE.Vector3(0, -2., 4),
               //debugColor: new THREE.Color('#0000ff'),
            }
         })
      )

      // Kitchen Background
      const backgroundGeometrySphere2 = new THREE.SphereGeometry(8, 32, 32);
      const backgroundMaterial2 = new THREE.MeshStandardMaterial({
          side: THREE.BackSide,
          color: new THREE.Color(0xf5fa6e),
          flatShading: true,
          envMap: this.resources.items.spaceSunsetEnvironmentMapHDR,
      });

      const kitchenBackground = new THREE.Mesh(
          backgroundGeometrySphere2,
          backgroundMaterial2
      );
      
      this.group.add(
         this.rectanglePortal.create({
            background: kitchenBackground,
            portal: {
               position: new THREE.Vector3(4.0, -2., 0),
               rotation: new THREE.Vector3(0, Math.PI * 0.5, 0),
               //debugColor: new THREE.Color('#00ff00'),
            }
         })
      )
      
      // Undefined Scene Background
      this.group.add(
         this.squarePortal.create({
            background: workshopBackground,
            portal: {
               position: new THREE.Vector3(-4, 0, 0),
               rotation: new THREE.Vector3(0, Math.PI * -0.5, 0),
            }
         })
      )

      // Portal Scene Background
      const environmentMap = this.resources.items.spaceSunsetEnvironmentMapHDR

      const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(30, 32, 32),
          new THREE.MeshBasicMaterial({ 
              side: THREE.BackSide,
              envMap: environmentMap, 
           }),
      )
      const portalSceneBackground = sphere
      
      this.group.add(
         this.squarePortal.create({
            background: portalSceneBackground,
            portal: {
               position: new THREE.Vector3(0, 0, -4),
               rotation: new THREE.Vector3(0, Math.PI, 0),
            }
         })
      )
   }
}
 

 
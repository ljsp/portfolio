import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        
        this.SKY_COLOR = 0x999999
        this.GROUND_COLOR = 0x242424
        this.SKY_SIZE = 50

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.setSunLight()
        this.setPlane()
        this.setBase()
        this.addSkyGradient()
        //this.setEnvironmentMap()
    }

    setSunLight()
    {

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        this.pointLight_1 = new THREE.PointLight(0xffffff, 0.7, 50, 0.7);
        this.pointLight_1.position.set(-5, 12, 10);

        this.pointLight_2 = new THREE.PointLight(0xffffff, 0.35, 50, 0.7);
        this.pointLight_2.position.set(4, 9, 4);

        this.pointLight_1.castShadow = true;
        this.pointLight_1.shadow.radius = 4;
        this.pointLight_1.shadow.mapSize.height = 512;
        this.pointLight_1.shadow.mapSize.width = 512;

        this.pointLight_2.castShadow = true;
        this.pointLight_2.shadow.radius = 4;
        this.pointLight_2.shadow.mapSize.height = 512;
        this.pointLight_2.shadow.mapSize.width = 512;

        this.scene.add(this.ambientLight);
        this.scene.add(this.pointLight_1);
        this.scene.add(this.pointLight_2);    

        /*
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3.5, 2, - 1.25)
        this.scene.add(this.sunLight)


        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(-10)
                .max(10)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(-10)
                .max(10)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(-10)
                .max(10)
                .step(0.001)
        }
        */
    }

    setPlane() 
    {
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshBasicMaterial({ 
                color: 0x171616,
                stencilFuncMask: 0xff,
                stencilWrite: true,
                stencilFunc: THREE.EqualStencilFunc,
                stencilZPass: THREE.KeepStencilOp,
                stencilZFail: THREE.KeepStencilOp,
                stencilFail: THREE.KeepStencilOp,
                stencilRef: 0
            })
        )
        plane.rotation.x = - Math.PI * 0.5
        plane.position.y = - 6.5
        this.scene.add(plane)
    }

    setBase()
    {
        const base = this.resources.items.scene.scene
        base.scale.set(2.0, 2.0, 2.0)
        base.position.set(0, - 6, 0)
        this.scene.add(base)

        base.traverse((child) =>
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

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.8
        this.environmentMap.mapping = THREE.EquirectangularReflectionMapping
        this.environmentMap.texture = this.resources.items.spaceSunsetEnvironmentMap
        
        this.scene.environment = this.environmentMap.texture
        this.scene.background = this.environmentMap.texture

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }

    }

    addSkyGradient() {

        const vertexShader = this.resources.items.gradientVertexShader
        const fragmentShader = this.resources.items.gradientFragmentShader

        const uniforms = {
            topColor: { value: new THREE.Color(this.SKY_COLOR) },
            bottomColor: { value: new THREE.Color(this.GROUND_COLOR) }
        }
        const skyGeo = new THREE.SphereGeometry(this.SKY_SIZE, 32, 15)
        const skyMat = new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            side: THREE.BackSide
        })

        const sky = new THREE.Mesh(skyGeo, skyMat)
        this.scene.add(sky)
    }
}
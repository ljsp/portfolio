import * as THREE from 'three'
import Experience from './Experience.js'
import gsap from 'gsap'

export default class LoadingScreen
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.setInstance()

        this.resources.on('ready', () => {
            gsap.to(this.overlayMaterial.uniforms.uAlpha, {
                duration: 1.0,
                value: 0.0,
                onComplete: () => {
                    this.overlayMaterial.dispose()
                    this.overlayGeometry.dispose()
                    this.scene.remove(this.overlay)
                }
            })
        })
    }

    setInstance()
    {
        this.overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
        this.overlayMaterial = new THREE.ShaderMaterial({
            transparent: true,
            uniforms: {
                uAlpha: { value: 1.0 }
            },
            vertexShader:
            `
            void main() 
                {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: 
            `
            varying vec2 vUv;
            uniform float uAlpha;

            void main()
                {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
                }
            `
        });

        this.overlay = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial)
        this.scene.add(this.overlay)
    }
}
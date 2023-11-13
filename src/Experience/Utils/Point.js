import * as THREE from 'three';
import Experience from '../Experience.js'

export default class Point {
    constructor() 
    {
        this.experience = new Experience()
        this.camera = this.experience.camera.instance
        this.sizes = this.experience.sizes
        this.raycaster = this.experience.raycaster.instance
        this.scene = this.experience.scene

        this.points = [
            {
                position: new THREE.Vector3(1, 1, -5),
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing'
            },
            {
                position: new THREE.Vector3(1, 1, 5),
                text: 'Lorem ipsoumi dolor sit amet consectetur adipisicing'
            }
        ]

        const parent = document.querySelector('body')
        let index = 0
        
        for(const point of this.points)
        {
            let element = document.createElement('div')
            element.classList.add('point')
            element.classList.add('point-' + index)
            element.classList.add('visible')

            let label = document.createElement('div')
            label.classList.add('label')
            label.textContent = index + 1
            element.appendChild(label)

            let text = document.createElement('div')
            text.classList.add('text')
            text.textContent = point.text
            element.appendChild(text)

            point.element = element
            parent.appendChild(element)
            index++
        }
    }

    update()
    {
        for(const point of this.points)
        {
            const screenPosition = point.position.clone()
            screenPosition.project(this.camera)

            this.raycaster.setFromCamera(screenPosition, this.camera)
            const intersects = this.raycaster.intersectObjects(this.scene.children, true)

            if(intersects.length === 0)
            {
                point.element.classList.add('visible')
            }
            else
            {
                const intersectionDistance = intersects[0].distance
                const pointDistance = point.position.distanceTo(this.camera.position)

                if(intersectionDistance < pointDistance)
                {
                    point.element.classList.remove('visible')
                }
                else
                {
                    point.element.classList.add('visible')
                }
            }

            const translateX = screenPosition.x * this.sizes.width * 0.5
            const translateY = - screenPosition.y * this.sizes.height * 0.5

            point.element.style.transform = `translate(${translateX}px, ${translateY}px)`
        }
    }
}
import * as THREE from 'three';
import Experience from '../Experience.js'

// TODO: Load the content from a json file &| Add a class for the modal

export default class Point {
    constructor() 
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.camera = this.experience.camera.instance
        this.sizes = this.experience.sizes
        this.raycaster = this.experience.raycaster.instance
        this.scene = this.experience.scene

        this.resources.on('ready', () => {
            
            this.ready = true

            this.points = [
                {
                    position: new THREE.Vector3(1, 1, -5),
                    description: 'A small 3D model viewer made with OpenGL in C++',
                    title : 'Litho 3D',
                    image: this.experience.resources.items.cubeFaceTexture,
                    content: 
                    '<p>\
                        This project showcases a compact 3D model viewer developed using OpenGL, a powerful graphics API, and C++, a highly efficient programming language. The viewer is capable of loading and rendering 3D models in real-time, offering users interactive control over the viewing angle, zoom, and lighting. Utilizing OpenGL\'s extensive functionalities, the application renders models with high precision and supports various shading and texturing techniques, making it an ideal tool for visualizing complex 3D objects.\
                    </p>\
                    <p> \
                        The C++ backend ensures optimal performance, making the viewer suitable for both educational and professional purposes in fields like computer graphics, game development, and digital art. Its user-friendly interface and efficient rendering capabilities demonstrate the power and versatility of combining OpenGL with C++ for 3D graphics applications.\
                    </p>',
                    pageLink: 'https://ljsp.github.io/Litho3D/',
                    githubLink: 'https://github.com/ljsp/Litho3D'
                },
                {
                    position: new THREE.Vector3(1, 1, 5),
                    description: 'My personal website using Three.js',
                    title : 'Portfolio',
                    image: this.experience.resources.items.cubeFaceTexture,
                    content: 
                    '<p>\
                        Welcome to my personal website, where the centerpiece is a fascinating rendering of an "impossible cube" brought to life using the power of Three.js. This website not only showcases my skills in web development and graphics programming but also serves as a testament to the endless possibilities of 3D rendering on the web. The impossible cube, a classic optical illusion, is rendered here in stunning detail, inviting visitors to explore the intricacies of its seemingly paradoxical geometry. By leveraging Three.js, a robust JavaScript library for 3D graphics, the cube is presented in a fully interactive 3D environment, allowing users to rotate, zoom, and view it from various perspectives. This interactive experience not only captures the viewer\'s imagination but also demonstrates the dynamic and engaging web experiences that modern web technologies can create. As a developer and artist, this website reflects my passion for blending creativity with technology, constantly pushing the boundaries of what\'s possible in web-based graphics.\
                    </p>',
                    pageLink: 'https://ljsp.github.io/Portfolio/',
                    githubLink: 'https://github.com/ljsp/portfolio'
                },
                {
                    position: new THREE.Vector3(5, 1, 1),
                    description: 'A simple visualiser for the lamps I make',
                    title : 'Lamp Visualiser',
                    image: this.experience.resources.items.cubeFaceTexture,
                    content: 
                    '<p>\
                        Welcome to the unique section of my personal website dedicated to the lamps I craft. This space features a simple yet elegant visualizer, designed to display the beauty and intricacy of each lamp. Utilizing intuitive web technologies, the visualizer allows visitors to explore the fine details of my handcrafted lamps in a virtual space. Users can rotate and zoom into each lamp, experiencing the textures, colors, and craftsmanship that go into every piece. This interactive tool not only highlights the aesthetic appeal of the lamps but also demonstrates the functionality and ambient lighting they provide. As an artisan, this visualizer is an extension of my commitment to quality and design, offering an immersive experience that bridges the gap between the physical art of lamp-making and the digital realm. It\'s a testament to the fusion of traditional craftsmanship with modern technology, bringing the warmth and creativity of my work to a broader audience.\
                    </p>',
                    pageLink: 'https://lamp-visualiser.vercel.app/',
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


                let description = document.createElement('div')
                description.classList.add('description')
                description.textContent = point.description

                element.addEventListener('click', () => {
                    this.createModal(parent, point)
                })

                element.appendChild(label)
                element.appendChild(description)
                parent.appendChild(element)

                point.element = element
                index++
            }
        })
    }

    update()
    {

        if(!this.ready)
        {
            return
        }

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
                const distanceToCenter = this.camera.position.distanceTo(new THREE.Vector3())

                if(intersectionDistance < pointDistance || distanceToCenter > 11)
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

    createModal(parent, point) {
        const template = document.querySelector('#modal-template')
        const clone = template.content.cloneNode(true)
        const modal = clone.querySelector('#default-modal')
        const modalTitle = clone.querySelector('#default-modal #modal-title');
        const modalContent = clone.querySelector('#default-modal #modal-content');
        const modalImage = clone.querySelector('#default-modal #modal-image');
        const modalFooter = clone.querySelector('#default-modal #modal-footer');
        const modalFooterPageButton = clone.querySelector('#default-modal #modal-footer-page-button');
        const closeButton = clone.querySelector('#default-modal #modal-close-button');

        modalTitle.textContent = point.title

        closeButton.onclick = () => {
            parent.removeChild(modal)
        }
        
        modalImage.src = point.image
        
        const modalAppendedContent = document.createElement('div');
        modalAppendedContent.classList.add(
            'text-md', 'leading-relaxed', 'text-gray-500', 'dark:text-gray-400'
        );
        modalAppendedContent.innerHTML = point.content;
        modalContent.appendChild(modalAppendedContent)

        modalFooterPageButton.onclick = () => {
            location.href = point.pageLink
        }
        
        if (point.githubLink) {
            this.appendButtonToFooter(modalFooter, "Github", point.githubLink)
        }

        parent.appendChild(clone)
    }

    appendButtonToFooter(modalFooter, text, link) {
        const button = document.createElement('button');
        button.classList.add(
            'ms-3', 'text-gray-500', 'bg-white', 'hover:bg-gray-100',
            'focus:ring-4', 'focus:outline-none', 'focus:ring-blue-300',
            'rounded-lg', 'border', 'border-gray-200', 'text-sm', 
            'font-medium', 'px-5', 'py-2.5', 'hover:text-gray-900', 
            'focus:z-10', 'dark:bg-gray-700', 'dark:text-gray-300',
            'dark:border-gray-500', 'dark:hover:text-white',
            'dark:hover:bg-gray-600', 'dark:focus:ring-gray-600'
        );
        
        button.textContent = text;
        button.onclick = () => {
            location.href = link
        }
        modalFooter.appendChild(button)
    }

}
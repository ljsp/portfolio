import Experience from '../Experience.js'
import Environment from './Environment.js'
import ImpossibleBox from './ImpossibleBox.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.impossibleBox = new ImpossibleBox()
            this.environment = new Environment()

        })
    }

    update()
    {
    }
}
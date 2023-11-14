import Experience from '../Experience.js'
import Environment from './Environment.js'
import ImpossibleBox from './ImpossibleBox.js'
import BedRoom from './BedRoom.js'

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
            this.room = new BedRoom()
            this.environment = new Environment()
        })
    }

    update()
    {
    }
}
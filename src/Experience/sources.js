export default [
    {
        name: 'spaceSunsetEnvironmentMap',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMaps/space_sunset/px.png',
            'textures/environmentMaps/space_sunset/nx.png',
            'textures/environmentMaps/space_sunset/py.png',
            'textures/environmentMaps/space_sunset/ny.png',
            'textures/environmentMaps/space_sunset/pz.png',
            'textures/environmentMaps/space_sunset/nz.png'
        ]
    },
    {
        name: 'spaceSunsetEnvironmentMapHDR',
        type: 'hdrTexture',
        path: 'textures/environmentMaps/space_sunset.hdr'
    },
    {
        name: 'cubeFaceTexture',
        type: 'texture',
        path: 'textures/cubeFace/faceTextureBorder.png'
    },
    {
        name: 'gradientVertexShader',
        type: 'shader',
        path: 'shaders/gradient.vert'
    },
    {
        name: 'gradientFragmentShader',
        type: 'shader',
        path: 'shaders/gradient.frag'
    },
    {
        name: 'scene',
        type: 'gltfModel',
        path: 'models/scene/scene.glb'
    },
    {
        name: 'boxFrame',
        type: 'gltfModel',
        path: 'models/boxFrame/box_frame.glb'
    },
    {
        name: 'portalSceneModel',
        type: 'gltfModel',
        path: 'models/portalScene/portal.glb'
    },
    {
        name: 'portalTexture',
        type: 'texture',
        path: 'models/portalScene/portal.jpg'
    },
    {
        name: 'bedRoomModel',
        type: 'gltfModel',
        path: 'models/bedroom/bedroom_basic.glb'
    },
    {
        name: 'kitchenModel',
        type: 'gltfModel',
        path: 'models/kitchen/kitchen.glb'
    },
    {
        name: 'workshopModel',
        type: 'gltfModel',
        path: 'models/workshop/workshop.glb'
    }
]
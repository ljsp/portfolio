import * as THREE from 'three';

const stencilConfig = {
    stencilZPass: THREE.ReplaceStencilOp,
    stencilZFail: THREE.KeepStencilOp,
    stencilFail: THREE.KeepStencilOp,
    stencilFuncMask: 0xff,
    stencilWrite: true,
};

let stencilId = 1;

class Portal {
    constructor(portalSize) 
    {
        this.geometry = new THREE.PlaneGeometry(portalSize, portalSize);
    }

    create({ portal, background, scene }) {
        const portalGroup = new THREE.Group();
        const hiddenGroup = new THREE.Group();
        stencilId++;

        const portalMesh = new THREE.Mesh(
            this.geometry,
            new THREE.MeshBasicMaterial({
                side: THREE.FrontSide,
                colorWrite: false,
                depthWrite: false,
                stencilFunc: THREE.AlwaysStencilFunc,
                stencilRef: stencilId,
                ...stencilConfig,
            })
        );
        portalMesh.position.copy(portal.position);
        if (portal.rotation) {
            portalMesh.rotation.setFromVector3(portal.rotation);
        }


        const material = background.material;
        material.stencilFuncMask = stencilConfig.stencilFuncMask;
        material.stencilWrite = stencilConfig.stencilWrite;
        material.stencilZPass = stencilConfig.stencilZPass;
        material.stencilZFail = stencilConfig.stencilZFail;
        material.stencilFail = stencilConfig.stencilFail;
        material.stencilFunc = THREE.EqualStencilFunc;
        material.stencilRef = stencilId;
        hiddenGroup.renderOrder = stencilId;
        hiddenGroup.add(background);

        scene.traverse((child) => {
            if (child.isMesh) {
                const mesh = child.clone();
                mesh.material = mesh.material.clone();
                mesh.material.stencilFuncMask = stencilConfig.stencilFuncMask;
                mesh.material.stencilWrite = stencilConfig.stencilWrite;
                mesh.material.stencilZPass = stencilConfig.stencilZPass;
                mesh.material.stencilZFail = stencilConfig.stencilZFail;
                mesh.material.stencilFail = stencilConfig.stencilFail;
                mesh.material.stencilFunc = THREE.EqualStencilFunc;
                mesh.material.stencilRef = stencilId;
                hiddenGroup.add(mesh);
            }
        })

        portalGroup.add(portalMesh);
        portalGroup.add(hiddenGroup);

        return portalGroup;
    }
}

export { Portal };

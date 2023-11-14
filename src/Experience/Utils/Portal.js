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
    constructor(portalHeight, portalWidth) 
    {
        this.portalHeight = portalHeight
        this.portalWidth = portalWidth
    }

    create({background, portal }) {

        this.geometry = new THREE.PlaneGeometry(this.portalWidth, this.portalHeight);

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

        if (portal.debugColor) {
            portalMesh.material.color = portal.debugColor;
            portalMesh.material.colorWrite = true;
            portalMesh.material.depthWrite = true;
            portalMesh.material.stencilWrite = false;
            portalMesh.material.transparent = true;
            portalMesh.material.opacity = 0.5;
        }

        const backgroundMaterial = background.material;
        backgroundMaterial.stencilFuncMask = stencilConfig.stencilFuncMask;
        backgroundMaterial.stencilWrite = stencilConfig.stencilWrite;
        backgroundMaterial.stencilZPass = stencilConfig.stencilZPass;
        backgroundMaterial.stencilZFail = stencilConfig.stencilZFail;
        backgroundMaterial.stencilFail = stencilConfig.stencilFail;
        backgroundMaterial.stencilFunc = THREE.EqualStencilFunc;
        backgroundMaterial.stencilRef = stencilId;
        hiddenGroup.renderOrder = stencilId;
        hiddenGroup.add(background);

        portalGroup.add(portalMesh);
        portalGroup.add(hiddenGroup);

        return portalGroup;
    }
}

export { Portal };

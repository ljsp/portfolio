import {
    AlwaysStencilFunc,
    EqualStencilFunc,
    FrontSide,
    Group,
    KeepStencilOp,
    Material,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
    ReplaceStencilOp,
    Vector3,
} from 'three';

const stencilConfig = {
    stencilZPass: ReplaceStencilOp,
    stencilZFail: KeepStencilOp,
    stencilFail: KeepStencilOp,
    stencilFuncMask: 0xff,
    stencilWrite: true,
};

let stencilId = 1;

class Portal {
    constructor(portalSize) {
        this.geometry = new PlaneGeometry(portalSize, portalSize);
    }

    create({ portal, content }) {
        const portalGroup = new Group();
        const hiddenGroup = new Group();
        stencilId++;

        const portalMesh = new Mesh(
            this.geometry,
            new MeshBasicMaterial({
                side: FrontSide,
                colorWrite: false,
                depthWrite: false,
                stencilFunc: AlwaysStencilFunc,
                stencilRef: stencilId,
                ...stencilConfig,
            })
        );

        portalMesh.position.copy(portal.position);
        if (portal.rotation) {
            portalMesh.rotation.setFromVector3(portal.rotation);
        }

        content.forEach((mesh) => {
            const material = mesh.material;
            material.stencilFuncMask = stencilConfig.stencilFuncMask;
            material.stencilWrite = stencilConfig.stencilWrite;
            material.stencilZPass = stencilConfig.stencilZPass;
            material.stencilZFail = stencilConfig.stencilZFail;
            material.stencilFail = stencilConfig.stencilFail;
            material.stencilFunc = EqualStencilFunc;
            material.stencilRef = stencilId;
            hiddenGroup.renderOrder = stencilId;
            hiddenGroup.add(mesh);
        });

        portalGroup.add(portalMesh);
        portalGroup.add(hiddenGroup);

        return portalGroup;
    }
}

export { Portal };

import { getTransformedAABB, aabbIntersection } from "./common/engine/core/SceneUtils.js";

export class Physics {

    constructor(scene, node) {
        this.scene = scene;
        this.node = node;
    }

    update(t, dt) {
        this.scene.traverse(other =>
            {
                //Collision
                if (this.node !== other && other.getComponentOfType(Physics))
                {
                    this.node.action(this.node, other, this.resolveCollision(this.node, other));
                }
            });
    }

    resolveCollision(a, b) {
        const aBox = getTransformedAABB(a);
        const bBox = getTransformedAABB(b);

        //console.log(aabbIntersection(aBox, bBox));
        return aabbIntersection(aBox, bBox);
    }
}

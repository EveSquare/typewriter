import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// @ts-ignore
import MODEL from './Typewriter.glb';

export default class Typewriter extends Group {
    constructor() {
        super();
        const loader = new GLTFLoader();

        this.name = 'typewriter';

        loader.load(MODEL, (gltf) => {
            const typeWriter = gltf.scene;
            typeWriter.scale.set(2, 2, 2);
            typeWriter.position.set(0, -3.5, -1);

            this.add(typeWriter);
        });
    }
}

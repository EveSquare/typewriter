import { Group, DirectionalLight } from 'three';

export default class BaseLight extends Group {
    constructor() {
        super();

        const directionalLight = new DirectionalLight(0xFFFFFF);
        directionalLight.position.set(0, 15, 20);

        this.add(directionalLight);
    }
}

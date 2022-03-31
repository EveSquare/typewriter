import { Group, TextureLoader, PlaneGeometry, MeshStandardMaterial, Vector2, Mesh } from 'three';
// @ts-ignore
import paperBasePath from './Watercolor_Paper_001_COLOR.jpg';
// @ts-ignore
import paperNormalPath from './Watercolor_Paper_001_NORM.jpg';

export default class Paper extends Group {

    constructor() {
        super();

        this.name = 'paper';

        // textures
        const textureLoader = new TextureLoader();
        const paperBaseColor = textureLoader.load(paperBasePath);
        const paperNormalMap = textureLoader.load(paperNormalPath);

        // Paper 実寸 437, 618px
        const a4 = {
            width: 21.0,
            height: 29.7
        };
        const geometry = new PlaneGeometry(4.2, 5); // 形状
        const material = new MeshStandardMaterial({
            map: paperBaseColor,
            normalMap: paperNormalMap,
            normalScale: new Vector2(0.2, 0.2),
        }); // 質感
        const paper = new Mesh(geometry, material);
        paper.position.set(1.15, -1.5, -0.7);

        // const paperOverlay = document.createElement("div")
        // paperOverlay.className = "paper"
        // paperOverlay.style.position = "absolute"
        // paperOverlay.style.top = paper.position.y + "px"
        // document.body?.appendChild(paperOverlay)

        // add text
        // paper.add(
        //     new ThreeMeshUI.Text({
        //         content: "Texxt",
        //         fontSize: 5
        //     })
        // )
    }

    update(timeStamp: any) {
        // this.rotation.y = timeStamp / 10000;
    }

}

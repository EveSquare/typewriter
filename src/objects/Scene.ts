import { Group } from 'three';
import Typewriter from './Typewriter/Typewriter';
import Paper from './Paper/Paper';
import BaseLight from './Lights';

export default class TypeScene extends Group {
    constructor() {
      super();

      const typewriter = new Typewriter();
      const paper = new Paper();
      const lights = new BaseLight();

      this.add(typewriter, paper, lights);
    }

    update(timeStamp: any) {
    }
  }

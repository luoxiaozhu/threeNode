import * as THREE from 'three';
import $ from 'jquery';

const _creatContainer = (id) => {
    var containers = $('<div></div>');
    containers.css('cssText', 'top:0;left:0;height:100%;width:100%;overflow:hidden;position:absolute;');
    containers.attr('id', id);
    return containers;
};
const _parseCts = (cts) => {
    let $dom = (typeof cts === 'object') ? $(cts) : $('#' + cts);
    if ($dom.length <= 0) return null;
    return $dom;
};
const _detector = () => {
    try {
        return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl');
    } catch (e) {
        return false;
    }
};
const _getWH = (container) => {
    return {
        w: container.width(),
        h: container.height()
    };
};

const _create3DMesh = () => {
    let geometry = new THREE.BoxGeometry(10, 10, 10);
    let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    return new THREE.Mesh(geometry, material);
};
const defaultConfig = {
    background: {
        color: '#ffffff',
        opacity: 0.0
    },
    camera: {
        fov: 45,
        near: 1,
        far: 20000,
        position: [0, 0, 100]
    }
};
let dfConfig = {};

class ThreeNode {
    constructor (cts, config) {
        let conts = _parseCts(cts);
        if (_detector() && conts != null) {
            try {
                config = config || {};
                dfConfig = $.extend(true, {}, defaultConfig, config);
                this.container = _creatContainer(THREE.Math.generateUUID());
                this.parentCont = conts;
                this.parentCont.append(this.container);
                this.scene = new THREE.Scene();
                this.clock = new THREE.Clock();
                let wh = _getWH(this.container);
                let cm = dfConfig.camera, bg = dfConfig.background;

                this.camera = new THREE.PerspectiveCamera(45, wh.w / wh.h, cm.near, cm.far);
                this.camera.position.set(cm.position[0], cm.position[1], cm.position[2]);

                // renderer
                this.renderer = new THREE.WebGLRenderer({
                    antialias: true,
                    alpha: true
                });
                this.renderer.autoClear = false;
                this.renderer.setSize(wh.w, wh.h);
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setClearColor(bg.color, bg.opacity);
                this.container.append(this.renderer.domElement);
            } catch (e) {
                console.log(e);
            }
        }
    }

    render () {
        let self = this;
        let Animations = function () {
            self.renderer.render(self.scene, self.camera);
            requestAnimationFrame(Animations);
            if (self.scene.children.length > 0)self.scene.children[0].rotation.z += 0.01;
        };
        Animations();
    }

    addBox () {
        let cube = _create3DMesh();
        this.scene.add(cube);
    }
}

export default ThreeNode;

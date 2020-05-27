import * as THREE from 'three';
import $ from 'jquery';

const CANVASID = "test";// -画布ID
const GID = THREE.Math.generateUUID();
function createContainer ( id ) {
    var containers = $('<div></div>');
    containers.css("cssText", "height:100%;width:100%;position:relative !important");
    containers.attr('id', id);
    return containers;
}
function parseCts ( cts ) {
    var $dom = ( typeof cts == 'object' )? $(cts): $('#'+cts);
    if ( $dom.length <= 0 ) return null;
    return $dom;
}
function getWH (container) {
    return { w: container.width(), h: container.height() };
}

const conts = parseCts(CANVASID);
const threeId = conts.attr('id')+'_'+GID;
const container = createContainer(threeId);
conts.html(container);
const wh = getWH(container);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 445, wh.w/wh.h, 1,20000 );
camera.position.set(0,0,100);
const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
renderer.setSize( wh.w, wh.h );
renderer.setClearColor( "#ffffff",0.0 );
container.append( $(renderer.domElement) );
function create3DMesh() {
    var geometry = new THREE.BoxGeometry(10,10,10);
    var material = new THREE.MeshBasicMaterial({color:"#ff0000"});
    var mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);
}
create3DMesh();
function renderers () {
    var Animations = function() {
        renderer.render(scene,camera);
        if(scene.children[0])scene.children[0].rotation.y += 0.01;
        requestAnimationFrame(Animations);
    };
    Animations();
}
renderers();

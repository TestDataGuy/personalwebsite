import './style.css'
import * as THREE from 'three';

function main() {
    const canvas = document.querySelector('#bg');
    const renderer = new THREE.WebGLRenderer({canvas});
    
    
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
  
    const scene = new THREE.Scene();

    const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
    const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });
    const torusKnot  = new THREE.Mesh(geometry, material);

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});
    
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    
        cube.position.x = x;
    
        return cube;
      }


}
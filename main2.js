import './style.css'
import * as THREE from 'three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000 );

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),

});


renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
//camera.position.setX(-20);
camera.position.setY(10);

renderer.render(scene, camera);

const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });

const torusKnot  = new THREE.Mesh(geometry, material);

scene.add(torusKnot);


// renderer.render(scene, camera);

//const catBack = new THREE.TextureLoader().load('cat_background.png');
//scene.background = catBack;

function animate() {
  requestAnimationFrame( animate );

  torusKnot.rotation.x += 0.001;
  torusKnot.rotation.y += 0.001;
  torusKnot.rotation.z += 0.001;

  renderer.render(scene,camera);
}

animate()
import './style_2.css'
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

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  //standard box
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  
  /*standard Torus Know
  
  const radius = 1;  // ui: radius
  const tubeRadius = 1;  // ui: tubeRadius
  const radialSegments = 8;  // ui: radialSegments
  const tubularSegments = 64;  // ui: tubularSegments
  const p = 2;  // ui: p
  const q = 3;  // ui: q
  const geometryKnot = new THREE.TorusKnotGeometry(
      radius, tubeRadius, tubularSegments, radialSegments, p, q);


  const radiusTetrahedron = 7;  // ui: radius
  const detailTetrahedron = 2;  // ui: detail
  const geometryTetrahedron = new THREE.TetrahedronGeometry(radiusTetrahedron, detailTetrahedron);
  
   */


  // standard tetra

  const radiusTetra = 1;  // ui: radius
  const geometryTetra = new THREE.TetrahedronGeometry(radiusTetra);
  
  /*Wired Box
  
  const size = 1;
  const widthSegments = 1;  // ui: widthSegments
  const heightSegments = 1;  // ui: heightSegments
  const depthSegments = 1;  // ui: depthSegments
  const geometryWireBox = new THREE.WireframeGeometry(
      new THREE.BoxGeometry(
        size, size, size,
        widthSegments, heightSegments, depthSegments));

  */

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const cubes = [
    makeInstance(geometryTetra, 0xACBDBA,  0),
    makeInstance(geometry, 0xCDDDDD, -2),
    makeInstance(geometryTetra, 0xA599B5,  2),
  ];

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();

// Cube Demo
const scene1 = new THREE.Scene();
const camera1 = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);

const renderer1 = new THREE.WebGLRenderer();
renderer1.setSize(600, 400);
document.getElementById('cube-container').appendChild(renderer1.domElement);

// Create a cube
const geometry1 = new THREE.BoxGeometry();
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry1, material1);
scene1.add(cube);

camera1.position.z = 5;

function animate1() {
    requestAnimationFrame(animate1);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer1.render(scene1, camera1);
}

animate1();

// Torus Knot Demo
const scene2 = new THREE.Scene();
const camera2 = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);

const renderer2 = new THREE.WebGLRenderer();
renderer2.setSize(600, 400);
document.getElementById('torus-container').appendChild(renderer2.domElement);

// Create a torus knot
const geometry2 = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material2 = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });
const torusKnot = new THREE.Mesh(geometry2, material2);
scene2.add(torusKnot);

camera2.position.z = 30;

function animate2() {
    requestAnimationFrame(animate2);

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;

    renderer2.render(scene2, camera2);
}

animate2();

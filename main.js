function createRotatingScene(config) {
    const container = document.getElementById(config.containerId);
    if (!container) {
        return null;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = config.cameraZ;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mesh = new THREE.Mesh(config.geometry, config.material);
    scene.add(mesh);

    function resize() {
        const width = Math.max(container.clientWidth, 1);
        const height = Math.max(container.clientHeight, 1);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    }

    let observer = null;
    if (window.ResizeObserver) {
        observer = new ResizeObserver(resize);
        observer.observe(container);
    } else {
        window.addEventListener("resize", resize);
    }

    resize();

    function animate() {
        requestAnimationFrame(animate);

        mesh.rotation.x += config.rotationStep.x;
        mesh.rotation.y += config.rotationStep.y;

        renderer.render(scene, camera);
    }

    animate();

    return {
        dispose: function dispose() {
            if (observer) {
                observer.disconnect();
            } else {
                window.removeEventListener("resize", resize);
            }
            renderer.dispose();
        }
    };
}

createRotatingScene({
    containerId: "cube-container",
    geometry: new THREE.BoxGeometry(),
    material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    cameraZ: 5,
    rotationStep: { x: 0.01, y: 0.01 }
});

createRotatingScene({
    containerId: "torus-container",
    geometry: new THREE.TorusKnotGeometry(10, 3, 100, 16),
    material: new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true }),
    cameraZ: 30,
    rotationStep: { x: 0.01, y: 0.01 }
});

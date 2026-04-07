const canvas = document.getElementById("bg3d");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Lighting
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
scene.add(light);

// Load 3D Model
const loader = new THREE.GLTFLoader();
loader.load(
  "free_porsche_911_carrera_4s.glb",
  function (gltf) {
    const model = gltf.scene;

    model.scale.set(1.5, 1.5, 1.5);
    model.position.set(0, -1, 0);

    scene.add(model);

    function animate() {
      requestAnimationFrame(animate);

      model.rotation.y += 0.005;

      renderer.render(scene, camera);
    }

    animate();
  },
  undefined,
  function (error) {
    console.error("Error loading model:", error);
  }
);

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

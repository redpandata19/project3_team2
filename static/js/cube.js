// Define paths to the images for the cube faces
const imagePaths = [
    'https://cdn.pixabay.com/photo/2021/12/13/07/06/airplane-6867678_1280.jpg',     // Front face
    'https://cdn.pixabay.com/photo/2016/11/08/05/01/airplane-1807486_1280.jpg',     // Back face
    'https://cdn.pixabay.com/photo/2014/11/02/10/41/plane-513641_1280.jpg',        // Top face
    'https://cdn.pixabay.com/photo/2019/06/02/00/36/plane-4245416_1280.jpg',       // Bottom face
    'https://cdn.pixabay.com/photo/2024/03/15/21/24/ai-generated-8635794_1280.jpg', // Right face
    'https://cdn.pixabay.com/photo/2023/07/16/20/47/ai-generated-8131428_1280.png'  // Left face
  ];
  
  // Grab the cubeCanvas from the DOM
  const canvas = document.getElementById('cubeCanvas');
  
  // Initialize Three.js renderer using the specific canvas
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setClearColor(0xffffff); // Set clear color to white
  renderer.setSize(canvas.clientWidth, canvas.clientHeight); // Set size to match the canvas
  
  // Initialize Three.js scene
  const scene = new THREE.Scene();
  
  // Set up camera
  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 10); // Move the camera back along the z-axis

  // Handle window resizing to maintain aspect ratio and renderer size
window.addEventListener('resize', function () {
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});
  
  // Load textures and create materials for cube faces
  const cubeMaterials = imagePaths.map(path => new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(path), 
      side: THREE.DoubleSide
  }));
  
  // Create cube geometry with textured materials
  const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
  cube.rotation.set(Math.PI / 4, Math.PI / 4, 0); // Set initial rotation
  scene.add(cube); // Add cube to the scene
  
  // Handle mouse interactions for rotating the cube
  let mouseDown = false;
  let lastMouseX = null;
  let lastMouseY = null;
  
  function onMouseMove(event) {
      if (!mouseDown) return;
  
      const deltaX = event.clientX - lastMouseX;
      const deltaY = event.clientY - lastMouseY;
      rotateCube(deltaX, deltaY);
  
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
  }
  
  function onMouseDown(event) {
      mouseDown = true;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
  }
  
  function onMouseUp() {
      mouseDown = false;
  }
  
  function rotateCube(deltaX, deltaY) {
      cube.rotation.y += deltaX * 0.01;
      cube.rotation.x += deltaY * 0.01;
  }
  
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
  
  // Render loop
  function animate() {
      renderer.setClearColor(0xf5f5f5)
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle window resizing to maintain aspect ratio and renderer size
  window.addEventListener('resize', function () {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });
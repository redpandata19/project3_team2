const airports = [
  {iata_code: "ABC",
    name: "Airport ABC",
    lat: 123.456,
    log: -78.901,
    address: "123 Main Street, City, Country",
    size: "Large",
    year_built: 1990,
    fun_fact: "This airport was featured in a famous movie."},
  {iata_code: "DEF",
    name: "Airport DEF",
    lat: 987.654,
    log: -54.321,
    address: "456 Elm Street, Town, Country",
    size: "Medium",
    year_built: 1985,
    fun_fact: "This airport is known for its unique architecture."},
    {iata_code: "ZYX",
    name: "Airport ZYX",
    lat: 987.224,
    log: -54.821,
    address: "777 Airport Street, Town, Country",
    size: "Medium",
    year_built: 1972,
    fun_fact: "This airport is known for architecture."},
    {iata_code: "LLL",
    name: "Airport LLL",
    lat: 907.654,
    log: -52.321,
    address: "72 last Street, Town, Country",
    size: "Small",
    year_built: 1999,
    fun_fact: "This airport is."}
];

// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Set background color to white
renderer.setClearColor(0xffffff); // white color in hexadecimal format

document.body.appendChild(renderer.domElement);

// Create box geometries and materials
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Front
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Back
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Top
    new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Bottom
    new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Right
    new THREE.MeshBasicMaterial({ color: 0x00ffff })  // Left
];

// Create four boxes with text labels on each side
for (let i = 0; i < 4; i++) {
    const airport = airports[i % airports.length]; // Cycle through airports array
    const box = new THREE.Mesh(boxGeometry, boxMaterials);
    box.position.set(Math.cos(i * Math.PI / 2) * 3, 0, Math.sin(i * Math.PI / 2) * 3);
    scene.add(box);

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 100;
    context.font = '12px Arial';
    context.fillStyle = 'white';
    context.fillText(`IATA Code: ${airport.iata_code}`, 10, 20);
    context.fillText(`Name: ${airport.name}`, 10, 40);
    context.fillText(`Address: ${airport.address}`, 10, 60);
    context.fillText(`Size: ${airport.size}`, 10, 80);
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const label = new THREE.Mesh(new THREE.PlaneGeometry(2, 1), material);
    label.position.set(Math.cos(i * Math.PI / 2) * 3, 1.5, Math.sin(i * Math.PI / 2) * 3);
    scene.add(label);
}

// Add mouse interaction to rotate the scene
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

document.addEventListener('mousedown', e => {
    isDragging = true;
});

document.addEventListener('mouseup', e => {
    isDragging = false;
});

document.addEventListener('mousemove', e => {
    const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
    };

    if (isDragging) {
        const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));

        scene.quaternion.multiplyQuaternions(deltaRotationQuaternion, scene.quaternion);
    }

    previousMousePosition = {
        x: e.clientX,
        y: e.clientY
    };
});

// Utility function to convert degrees to radians
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

// Set camera position
camera.position.set(0, 2, 8);

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
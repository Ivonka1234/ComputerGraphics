import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 7;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 5, 5);
scene.add(light);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('textures/basecolor.png');

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(6, 6);
texture.generateMipmaps = false;
texture.minFilter = THREE.LinearFilter;

const material = new THREE.MeshStandardMaterial({ map: texture,  roughness: 0.7,
    metalness: 0 ,  side: THREE.DoubleSide});


function createHeartMesh() {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;

    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

 const extrudeSettings = {
    steps: 2,
    depth: 2,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 2,
    UVGenerator: {
        generateTopUV: function (geometry, vertices, indexA, indexB, indexC) {
            return [
                new THREE.Vector2(vertices[indexA * 3] / 10, vertices[indexA * 3 + 1] / 10),
                new THREE.Vector2(vertices[indexB * 3] / 10, vertices[indexB * 3 + 1] / 10),
                new THREE.Vector2(vertices[indexC * 3] / 10, vertices[indexC * 3 + 1] / 10),
            ];
        },
        generateSideWallUV: function () {
            return [
                new THREE.Vector2(0, 0),
                new THREE.Vector2(1, 0),
                new THREE.Vector2(1, 1),
                new THREE.Vector2(0, 1),
            ];
        }
    }
};


    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const mesh = new THREE.Mesh(geometry, material);


    mesh.scale.set(0.12, -0.12, 0.12);

    return mesh;
}

const heart = createHeartMesh();
scene.add(heart);

function animate() {
    requestAnimationFrame(animate);
    heart.rotation.x += 0.01;
    heart.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

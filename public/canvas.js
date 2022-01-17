import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

import { EffectComposer } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/AfterimagePass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/ShaderPass.js';

///////////////////////////////////////////////////////////////////////////////
//DEFINE VARIABLES
///////////////////////////////////////////////////////////////////////////////

let bloomComposer, finalComposer;
var amplitude;
var height;
var meshBlob1;
var meshBlob2;
var meshBlob3;
var dots;
var dotsCount = 0;
var incrementingangle = 0;
var cameraangle = 0;
const darkMaterial = new THREE.MeshBasicMaterial( { color: "black" } );
const materials = {};
const bloomParams = {
  exposure: 0.2,
  bloomStrength: 1.5,
  bloomThreshold: 0,
  bloomRadius: 1
};

// SCENE SETUP
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg'),
    antialias: true,
});

///////////////////////////////////////////////////////////////////////////////
//CAMERA CONTROLS
///////////////////////////////////////////////////////////////////////////////
const controls = new OrbitControls( camera, renderer.domElement );
controls.enabled = true;
controls.enablePan = true;
controls.enableZoom = false;
// controls.autoRotate = true;
controls.screenSpacePanning = true;
controls.keypanSpeed = 7;
controls.autoRotateSpeed = 0.7;
controls.keys = {
  LEFT: 'ArrowRight',
  RIGHT: 'ArrowLeft',
  UP: 'NumpadAdd',
  BOTTOM: 'NumpadSubtract'
};
controls.listenToKeyEvents(window);

//LAYERS SETUP
const ENTIRE_SCENE = 0, BLOOM_SCENE = 1, STAR_SCENE = 2, OCCLUSION_SCENE = 3, DOTS_SCENE = 4;
const bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );
const starLayer = new THREE.Layers();
starLayer.set( STAR_SCENE );
const occlusionLayer = new THREE.Layers();
occlusionLayer.set( OCCLUSION_SCENE );

//START SCENE
init();
requestAnimationFrame(animate);
console.log("Scene Started");


///////////////////////////////////////////////////////////////////////////////
//INITIALIZE SCENE
///////////////////////////////////////////////////////////////////////////////

function init() {

  //SETUP RENDERER
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.CineonToneMapping;

  //SETUP CAMERA
  camera.position.setZ(7);
  scene.add(camera);

  //SETUP LIGHTS
  scene.add(new THREE.AmbientLight(0xffffff, 1));
  camera.add(new THREE.PointLight(0xffffff, 1));

  //SET VARIABLES
  setAmplitude(2.0, 0.1);

  //SETUP RENDERER
  SetupRenderer();

  //Load texture
  const TextureLoader = new THREE.TextureLoader();
  const textureland = TextureLoader.load('/assets/land.png');
  textureland.mapping = THREE.EquirectangularRefractionMapping;
  textureland.encoding = THREE.sRGBEncoding;

  ///////////////////////////////////////////////////////////////////////////////
  //ADD SCENE OBJECTS

  ///////////////////////////////////////////////////////////////////////////////
  //BLOB 1
  var blob1 = createSphereEx();
  var material1 = new THREE.MeshPhysicalMaterial({
    envMap: new THREE.CubeTextureLoader().load(['/assets/px.png', '/assets/nx.png', '/assets/py.png', '/assets/ny.png', '/assets/pz.png', '/assets/nz.png']),
    color: 0x1cb2fd,
    metalness: 1,
    emissive: 0x007aa6,
    emissiveIntensity: 0.6,
    roughness: 0,
    opacity: 0.5,
    transparent: true,
    envMapIntensity: 10,
    premultipliedAlpha: true,
    // flatShading: true,
    side: THREE.DoubleSide
  });
  meshBlob1 = new THREE.Mesh(blob1, material1);
  scene.add(meshBlob1);
  meshBlob1.layers.enable( BLOOM_SCENE );

  ///////////////////////////////////////////////////////////////////////////////
  //BLOB 2
  var blob2 = createSphereExTriangulated(18);
  var material2 = new THREE.MeshStandardMaterial({
    color: 0x7c21d7,
    emissiveIntensity: 0,
    emissive: 0x5829f2,
    wireframe: true,
    wireframeLinewidth: 3
  });  
  meshBlob2 = new THREE.Mesh(blob2, material2);
  scene.add(meshBlob2);

  ///////////////////////////////////////////////////////////////////////////////
  //GLOBE BLOB
  var globesphere = createSphereExTriangulated(24);
  var materialglobe = new THREE.MeshStandardMaterial({
    color: 0x7c21d7,
    emissiveIntensity: 0,
    emissive: 0x5829f2,
    displacementMap: textureland,
    displacementScale: 0.15,
    wireframe: true,
    wireframeLinewidth: 3
  });
  var meshglobe = new THREE.Mesh(globesphere, materialglobe);
  // scene.add(meshglobe);

  ///////////////////////////////////////////////////////////////////////////////
  //BLOB 3 (For Dots)
  var blob3 = createSphereExTriangulated(1);
  var material3 = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissiveIntensity: 1,
    emissive: 0xffffff,
    wireframe: true,
    wireframeLinewidth: 3
  });
  meshBlob3 = new THREE.Mesh(blob3, material3);
  // scene.add(meshBlob3);

  ///////////////////////////////////////////////////////////////////////////////
  //HELPERS For Dots
  dots = new THREE.Group();
  dots.name = "dotsgroup";

  ///////////////////////////////////////////////////////////////////////////////
  //STARS AND PANORAMA
  addPano();
  Array(500).fill().forEach(addStar);

  ///////////////////////////////////////////////////////////////////////////////
  window.addEventListener( 'resize', onWindowResize );
  console.log( renderer.info );
}

//Setup Renderer Function
function SetupRenderer() {
  ///////////////////////////////////////////////////////////////////////////////
  //SETUP SCENE RENDER PASSES

  const renderScene = new RenderPass( scene, camera );

  //Bloom Pass
  const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
  bloomPass.threshold = bloomParams.bloomThreshold;
  bloomPass.strength = bloomParams.bloomStrength * 2;
  bloomPass.radius = bloomParams.bloomRadius * 2;

  //Bloom Composer
  bloomComposer = new EffectComposer( renderer );
  bloomComposer.renderToScreen = false;
  bloomComposer.addPass( renderScene );
  bloomComposer.addPass( bloomPass );

  //After Image Pass
  const afterimagePass = new AfterimagePass();
  afterimagePass.uniforms[ 'damp' ].value = 0.95;

  //Bloom Pass 2
  const bloomPass2 = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
  bloomPass2.threshold = bloomParams.bloomThreshold;
  bloomPass2.strength = 0.3;
  bloomPass2.radius = bloomParams.bloomRadius * 2;

  //Final Pass
  const finalPass = new ShaderPass(
    new THREE.ShaderMaterial( {
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: bloomComposer.renderTarget2.texture }
      },
      vertexShader: document.getElementById( 'vertexshader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
      defines: {}
    } ), "baseTexture"
  );
  finalPass.needsSwap = true;

  //Final Composer
  finalComposer = new EffectComposer( renderer );
  finalComposer.addPass( renderScene );
  finalComposer.addPass( afterimagePass );
  finalComposer.addPass( bloomPass2 );
  finalComposer.addPass( finalPass );

  ///////////////////////////////////////////////////////////////////////////////
}

//Add Panorama Function
function addPano() {
  const geometry = new THREE.SphereGeometry(750, 60, 40);
  const texture = new THREE.TextureLoader().load('/assets/pano.jpg');
  const material = new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide});
  const panomesh = new THREE.Mesh(geometry, material);
  scene.add(panomesh);
  panomesh.layers.enable( STAR_SCENE );
}

//Add Star Function
function addStar() {
  var geometry = new THREE.IcosahedronGeometry(0.05, 1);
  var material = new THREE.MeshStandardMaterial({color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 10});
  var star = new THREE.Mesh(geometry, material);
  var [x,y,z] = Array(3).fill().map(() => (THREE.MathUtils.randFloatSpread(100)));
  star.position.set(x,y,z);
  scene.add(star);
  star.layers.enable( STAR_SCENE );
}

//Animate Function
function animate(a) {
  //Camera Rotation
  camera.position.x = Math.sin(cameraangle) * 8;
  camera.position.z = Math.cos(cameraangle) * 8;
  camera.lookAt(scene.position);
  cameraangle += 0.001;

  //Animate Blobs
  AnimateBlobs(a);

  requestAnimationFrame(animate);
  render();
}

//Render Scene Function
function render() {
  controls.update();
  // scene.traverse( starTrail );
  // starComposer.render();
  // scene.traverse( restoreMaterial );
  scene.traverse( darkenNonBloomed );
  bloomComposer.render();
  scene.traverse( restoreMaterial );
  finalComposer.render();
  // renderer.render(scene, camera);
}

//Create Quad Sphere Function
function createSphereEx() {
  const geometry = new THREE.BoxGeometry( 2, 2, 2, 32, 32, 32 );
  const positionAttribute = geometry.attributes.position;
  const spherePositions = [];
  for ( let i = 0; i < positionAttribute.count; i ++ ) {
    const x = positionAttribute.getX( i );
    const y = positionAttribute.getY( i );
    const z = positionAttribute.getZ( i );
    spherePositions.push(
      x * Math.sqrt( 1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ) ),
      y * Math.sqrt( 1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ) ),
      z * Math.sqrt( 1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 ) )
    );
  }
  geometry.attributes.position.set( spherePositions );
  geometry.setAttribute("basePosition", new THREE.BufferAttribute().copy(geometry.attributes.position));
  console.log(geometry.attributes.position.count);
  return geometry;
}

//Create Triangulated Sphere Function
function createSphereExTriangulated(r) {
  const geometry = new THREE.IcosahedronGeometry(1, r);
  geometry.setAttribute("basePosition", new THREE.BufferAttribute().copy(geometry.attributes.position));
  return geometry;
}

//Set Amplitude Function
function setAmplitude(a,h) {
  amplitude = a;
  height = h;
}

//Animate Blobs Function
function AnimateBlobs(a) {
  
  PerlinNoiseScatter(meshBlob1, a, amplitude, height);
  PerlinNoiseScatter(meshBlob2, a, (amplitude / 2), 0.1);

  //Orbiting Dots
  const basePositionAttribute3 = meshBlob3.geometry.getAttribute("basePosition");
  const positionAttribute3 = meshBlob3.geometry.getAttribute( 'position' );
  const vertex3 = new THREE.Vector3();
  incrementingangle += Math.PI / 360;
  dots.rotation.x = incrementingangle;
  dots.rotation.z = incrementingangle * 2;
  for ( let vertexIndex = 0; vertexIndex < positionAttribute3.count; vertexIndex++ ) {
      vertex3.fromBufferAttribute( basePositionAttribute3, vertexIndex );
      var perlin = noise.simplex3(
          vertex3.x * (amplitude / 5) + a * 0.0002,
          vertex3.y * (amplitude / 10) + a * 0.0005,
          vertex3.z * (amplitude / 5) );
      var ratio = perlin * 1 + 1;
      vertex3.multiplyScalar(ratio);
      positionAttribute3.setXYZ(vertexIndex, vertex3.x, vertex3.y, vertex3.z);

      if (dotsCount < positionAttribute3.count) {
        var g = new THREE.IcosahedronGeometry(0.015, 1);
        var m = new THREE.MeshStandardMaterial({color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 10});
        var dot = new THREE.Mesh(g, m);
        dot.name = "dot" + vertexIndex;
        dot.position.set(vertex3.x, vertex3.y, vertex3.z);
        dots.add(dot);
        dotsCount++;
        dot.layers.enable(DOTS_SCENE);
      } else {
        dots.getObjectByName("dot" + vertexIndex).position.set(vertex3.x, vertex3.y, vertex3.z);
      }
  }
  if (!scene.getObjectByName("dotsgroup")) {
    scene.add(dots);
  }
  meshBlob3.geometry.computeVertexNormals();
  meshBlob3.geometry.attributes.position.needsUpdate = true; // required after the first render
  meshBlob3.geometry.computeBoundingSphere();
}

//Perlin Noise Mesh Vertex Scatter Function
function PerlinNoiseScatter(mesh, a, amp , h) {
  const basePositionAttribute = mesh.geometry.getAttribute("basePosition");
  const positionAttribute = mesh.geometry.getAttribute( 'position' );
  const vertex = new THREE.Vector3();
  for ( let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++ ) {
      vertex.fromBufferAttribute( basePositionAttribute, vertexIndex );
      var perlin = noise.simplex3(
          vertex.x * amp + a * 0.0002,
          vertex.y * amp + a * 0.0005,
          vertex.z * amp );
      var ratio = perlin * h + 1;
      vertex.multiplyScalar(ratio);
      positionAttribute.setXYZ(vertexIndex, vertex.x, vertex.y, vertex.z);
  }
  mesh.geometry.computeVertexNormals();
  mesh.geometry.attributes.position.needsUpdate = true;
  mesh.geometry.computeBoundingSphere();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  bloomComposer.setSize( window.innerWidth, window.innerHeight );
  starComposer.setSize( window.innerWidth, window.innerHeight );
  finalComposer.setSize( window.innerWidth, window.innerHeight );
}

function darkenNonBloomed( obj ) {
  if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {
    materials[ obj.uuid ] = obj.material;
    obj.material = darkMaterial;
  }
}

function starTrail( obj ) {
  if ( obj.isMesh && starLayer.test( obj.layers ) === false ) {
    materials[ obj.uuid ] = obj.material;
    obj.material = darkMaterial;
  }
}

function restoreMaterial( obj ) {
  if ( materials[ obj.uuid ] ) {
    obj.material = materials[ obj.uuid ];
    delete materials[ obj.uuid ];
  }
}
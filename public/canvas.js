import * as THREE from "https://cdn.skypack.dev/three@0.136.0";

import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

import { EffectComposer } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { AfterimagePass } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/AfterimagePass.js";
import { ShaderPass } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "https://cdn.skypack.dev/three@0.136.0/examples//jsm/shaders/RGBShiftShader.js";

///////////////////////////////////////////////////////////////////////////////
//Global Functions : Section Trigers
///////////////////////////////////////////////////////////////////////////////
const numberOfSections = 9;

window.getTop = (el) => {
  var element = document.getElementById(el);
  if (!element) return null;
  return (
    element.offsetTop + (element.offsetParent && getTop(element.offsetParent))
  );
};
window.activeSection = () => {
  const pos = getScrollPos();
  for (let i = numberOfSections; i >= 1; i--) {
    if (pos > getTop(`section${i}`)) {
      // console.log(`section${i}`);
      return `section${i}`;
      break;
    }
  }
};
window.activeSectionIndex = () => {
  const pos = getScrollPos();
  for (let i = numberOfSections; i >= 1; i--) {
    if (pos > getTop(`section${i}`)) {
      if (i != null) {
        return i - 1;
      } else {
        return 0;
      }
    }
  }
};
///////////////////////////////////////////////////////////////////////////////
//DEFINE VARIABLES
///////////////////////////////////////////////////////////////////////////////
let bloomComposer, finalComposer;
var amplitude, height, heightdots, displacement, emission;
var audioheight = 0;
let clickcapacitor = 0;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var meshBlob1;
var meshBlob2;
var meshBlob3;
var meshCoin;
let dots, starsGroup, AIGroup;
var dotsCount = 0;
var incrementingangle = 0;
let sectionInfo;
let material1, material2, starmaterial, coinMaterial;
var orbClicked = false;
const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
const dotsMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0xffffff,
  emissiveIntensity: 10,
});
const materials = {};
const bloomParams = {
  exposure: 0.2,
  bloomStrength: 1.5,
  bloomThreshold: 0,
  bloomRadius: 1,
};

// SCENE SETUP
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  antialias: true,
});

///////////////////////////////////////////////////////////////////////////////
//CAMERA CONTROLS
///////////////////////////////////////////////////////////////////////////////
// const controls = new OrbitControls( camera, renderer.domElement );
// controls.enabled = true;
// controls.enablePan = true;
// controls.enableZoom = false;
// // controls.autoRotate = true;
// controls.screenSpacePanning = true;
// controls.keypanSpeed = 7;
// controls.autoRotateSpeed = 0.7;
// controls.keys = {
//   LEFT: 'ArrowRight',
//   RIGHT: 'ArrowLeft',
//   UP: 'NumpadAdd',
//   BOTTOM: 'NumpadSubtract'
// };
// controls.listenToKeyEvents(window);

//LAYERS SETUP
const ENTIRE_SCENE = 0,
  BLOOM_SCENE = 1,
  STAR_SCENE = 2,
  OCCLUSION_SCENE = 3,
  DOTS_SCENE = 4;
const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE);
const starLayer = new THREE.Layers();
starLayer.set(STAR_SCENE);
const occlusionLayer = new THREE.Layers();
occlusionLayer.set(OCCLUSION_SCENE);

const keyframes = {
  sectionKeyframes: [
    {
      x: 4.0,
      y: 0.0,
      z: 0.0,
      displacement: 0.0,
      emission: 0.7,
      morph: 0.5,
      coin: 0.0,
    },
    {
      x: 0.0,
      y: 0.0,
      z: 0.0,
      displacement: 0.0,
      emission: 0.6,
      morph: 0.5,
      coin: 0.0,
    },
    {
      x: -3.0,
      y: 0.0,
      z: 3.0,
      displacement: 0.0,
      emission: 0.6,
      morph: 0.5,
      coin: 0.0,
    },
    {
      x: 0.0,
      y: 0.0,
      z: 3.0,
      displacement: 0.0,
      emission: 0.8,
      morph: 0.2,
      coin: 0.0,
    },
    {
      x: 4.0,
      y: 0.0,
      z: 0.0,
      displacement: 1.0,
      emission: 0.2,
      morph: 0,
      coin: 0.0,
    },
    {
      x: 0.0,
      y: 0.0,
      z: 0.0,
      displacement: 1.0,
      emission: 0.2,
      morph: 0.0,
      coin: 0.5,
    },
    {
      x: 0.0,
      y: 0.0,
      z: 0.0,
      displacement: 1.0,
      emission: 0.3,
      morph: 0.5,
      coin: 1.0,
    },
    {
      x: 0.0,
      y: 0.0,
      z: 0.0,
      displacement: 1.0,
      emission: 0.15,
      morph: 0.5,
      coin: 1.0,
    },
    {
      x: 0.0,
      y: 0.0,
      z: 0.0,
      displacement: 0.0,
      emission: 0.0,
      morph: 0.0,
      coin: 1.0,
    },
  ],
};

//Audio Variables
let audio, context, src, analyser, bufferLength, dataArray;
let audioCues = {
  sectionAudio: [
    {
      __filename: "/assets/audio/001.mp3",
      played: false,
      src: null
    },
    {
      __filename: "/assets/audio/002.mp3",
      played: false,
      src: null
    },
    {
      __filename: "",
      played: false,
      src: null
    },
    {
      __filename: "/assets/audio/003.mp3",
      played: false,
      src: null
    },
    {
      __filename: "/assets/audio/004.mp3",
      played: false,
      src: null
    },
    {
      __filename: "",
      played: false,
      src: null
    },
    {
      __filename: "",
      played: false,
      src: null
    },
    {
      __filename: "",
      played: false,
      src: null
    },
    {
      __filename: "",
      played: false,
      src: null
    },
  ]
}

//Get Section Start and End Positions
initSectionInfo();

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
  amplitude = 2.0;
  height = 0.1;
  heightdots = 1.0;

  //SETUP RENDERER
  SetupRenderer();

  //Load Audio
  if (!isMobile())
  {
    initAudio();
  }

  //Load texture
  const TextureLoader = new THREE.TextureLoader();
  const textureland = TextureLoader.load("/assets/land.png");
  textureland.mapping = THREE.EquirectangularRefractionMapping;
  textureland.encoding = THREE.sRGBEncoding;

  ///////////////////////////////////////////////////////////////////////////////
  //ADD SCENE OBJECTS

  AIGroup = new THREE.Group();
  AIGroup.name = "AIGroup";
  ///////////////////////////////////////////////////////////////////////////////
  //BLOB 1
  var blob1;
  if (isMobile()) {
    console.log("Reduced Resolution");
    blob1 = createSphereEx(8);
  } else {
    blob1 = createSphereEx(32);
  }
  material1 = new THREE.MeshPhysicalMaterial({
    envMap: new THREE.CubeTextureLoader().load([
      "/assets/px.png",
      "/assets/nx.png",
      "/assets/py.png",
      "/assets/ny.png",
      "/assets/pz.png",
      "/assets/nz.png",
    ]),
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
    side: THREE.DoubleSide,
  });
  meshBlob1 = new THREE.Mesh(blob1, material1);
  // scene.add(meshBlob1);
  meshBlob1.name = "AImeshBlob1";
  AIGroup.add(meshBlob1);
  meshBlob1.layers.enable(BLOOM_SCENE);

  ///////////////////////////////////////////////////////////////////////////////
  //BLOB 2
  var blob2;
  if (isMobile()) {
    console.log("Reduced Resolution");
    blob2 = createSphereExTriangulated(12);
  } else {
    blob2 = createSphereExTriangulated(16);
  }
  material2 = new THREE.MeshStandardMaterial({
    color: 0x7c21d7,
    emissiveIntensity: 0,
    emissive: 0x5829f2,
    displacementMap: textureland,
    displacementScale: 0,
    transparent: true,
    wireframe: true,
    wireframeLinewidth: 3,
  });
  meshBlob2 = new THREE.Mesh(blob2, material2);
  meshBlob2.name = "AImeshBlob2";
  // scene.add(meshBlob2);
  AIGroup.add(meshBlob2);

  ///////////////////////////////////////////////////////////////////////////////
  //COIN
  //coinGeometry is a plane
  var coinGeometry = new THREE.CircleGeometry(0.5, 32);
  var coinTexture = new THREE.TextureLoader().load("/assets/coin.png");
  coinMaterial = new THREE.MeshStandardMaterial({
    map: coinTexture,
    color: 0x1cb2fd,
    emissive: 0x007aa6,
    emissiveIntensity: 10,
    emissiveMap: coinTexture,
    side: THREE.DoubleSide
  });
  meshCoin = new THREE.Mesh(coinGeometry, coinMaterial);
  meshCoin.rotation.set(-0.5, 0, 0);
  meshCoin.name = "AImeshCoin";
  AIGroup.add(meshCoin);

  scene.add(AIGroup);

  ///////////////////////////////////////////////////////////////////////////////
  //BLOB 3 (For Dots)
  var blob3;
  if (isMobile()) {
    console.log("Reduced Resolution");
    blob3 = createSphereExTriangulated(0);
  } else {
    blob3 = createSphereExTriangulated(1);
  }
  var material3 = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissiveIntensity: 1,
    emissive: 0xffffff,
    wireframe: true,
    wireframeLinewidth: 3,
  });
  meshBlob3 = new THREE.Mesh(blob3, material3);

  ///////////////////////////////////////////////////////////////////////////////
  //HELPERS For Dots
  dots = new THREE.Group();
  dots.name = "dotsgroup";

  ///////////////////////////////////////////////////////////////////////////////
  //STARS AND PANORAMA
  starmaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: 0xffffff,
    emissiveIntensity: 10,
  });
  starsGroup = new THREE.Group();
  starsGroup.name = "starsgroup";
  addPano();
  if (!isMobile()) {
    console.log("Adding Stars");
    Array(1000).fill().forEach(addStar);
  }
  scene.add(starsGroup);


  ///////////////////////////////////////////////////////////////////////////////
  window.addEventListener("resize", onWindowResize);
  // window.addEventListener("keydown", onKeyDown);
  window.addEventListener("scroll", onScroll, { passive: false });
  //on mouse down event capture
  // if (!isMobile()) {
    window.addEventListener("mousedown", onMouseDown, false);
  // }
  console.log(renderer.info);

  animate();
  AIGroup.add(dots);
  if (!isMobile()) AIGroup.position.x = 4;
}

function initAudio() {
  audio = [];
  context = new AudioContext();
  analyser = context.createAnalyser();
  analyser.connect(context.destination);
  analyser.fftSize = 256;
  for (let i = 0; i < audioCues.sectionAudio.length; i++) {
    console.log("Loading audio for section " + i);
    var f = audioCues.sectionAudio[i].__filename;
    if (f != "") {
      var a = new Audio(f);
      a.load();
      audioCues.sectionAudio[i].src = context.createMediaElementSource(a);
      audioCues.sectionAudio[i].src.connect(analyser);
      audio.push(a);
    } else {
      audio.push(null);
    }
  }
  console.log(audio);
  console.log(audioCues);
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  console.log(bufferLength);
}

//Setup Renderer Function
function SetupRenderer() {
  ///////////////////////////////////////////////////////////////////////////////
  //SETUP SCENE RENDER PASSES

  const renderScene = new RenderPass(scene, camera);

  //Bloom Pass
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  bloomPass.threshold = bloomParams.bloomThreshold;
  bloomPass.strength = bloomParams.bloomStrength * 2;
  bloomPass.radius = bloomParams.bloomRadius * 2;

  //Bloom Composer
  bloomComposer = new EffectComposer(renderer);
  bloomComposer.renderToScreen = false;
  bloomComposer.addPass(renderScene);
  bloomComposer.addPass(bloomPass);

  //After Image Pass
  const afterimagePass = new AfterimagePass();
  afterimagePass.uniforms["damp"].value = 0.95;

  //Bloom Pass 2
  const bloomPass2 = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  bloomPass2.threshold = bloomParams.bloomThreshold;
  bloomPass2.strength = 0.3;
  bloomPass2.radius = bloomParams.bloomRadius * 2;

  const aberrationPass = new ShaderPass(RGBShiftShader);
  aberrationPass.uniforms["amount"].value = 0.001;
  if (isMobile()) {
    console.log("Increasing Aberration");
    aberrationPass.uniforms["amount"].value = 0.008;
  }

  //Final Pass
  const finalPass = new ShaderPass(
    new THREE.ShaderMaterial({
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: bloomComposer.renderTarget2.texture },
      },
      vertexShader: document.getElementById("vertexshader").textContent,
      fragmentShader: document.getElementById("fragmentshader").textContent,
      defines: {},
    }),
    "baseTexture"
  );
  finalPass.needsSwap = true;

  //Final Composer
  finalComposer = new EffectComposer(renderer);
  finalComposer.addPass(renderScene);
  finalComposer.addPass(afterimagePass);
  finalComposer.addPass(bloomPass2);
  finalComposer.addPass(aberrationPass);
  finalComposer.addPass(finalPass);

  ///////////////////////////////////////////////////////////////////////////////
}

//detect whether page is open in mobile or desktop
function isMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    console.log(
      "Running on Mobile! Will reduce quality! Switch to a desktop browser for best results!"
    );
    return true;
  } else {
    return false;
  }
}

//Add Panorama Function
function addPano() {
  const geometry = new THREE.SphereGeometry(750, 30, 20);
  const texture = new THREE.TextureLoader().load("/assets/pano.jpg");
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
  });
  const panomesh = new THREE.Mesh(geometry, material);
  panomesh.name = "panomesh";
  // scene.add(panomesh);
  starsGroup.add(panomesh);
  panomesh.layers.enable(STAR_SCENE);
}

//Add Star Function
function addStar() {
  var geometry = new THREE.IcosahedronGeometry(0.05, 0);
  var star = new THREE.Mesh(geometry, starmaterial);
  var [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  //get magnitude of vector of x y z
  if (Math.sqrt(x * x + y * y + z * z) < 20) {
    x = x * 20;
    y = y * 20;
    z = z * 20;
  }
  star.position.set(x, y, z);
  // scene.add(star);
  starsGroup.add(star);
  star.layers.enable(STAR_SCENE);
}

//Animate Function
function animate(a) {
  //AI Rotation
  AIGroup.rotation.y += 0.002;
  meshCoin.rotation.y -= 0.004;
  meshCoin.rotation.x -= 0.002;

  //AI Click Interaction
  if (clickcapacitor > 0) {
    clickcapacitor -= 0.01;
    height = (Math.sin(clickcapacitor) * 0.2) + 0.1;
    heightdots = (Math.sin(clickcapacitor) * 2) + 1;
  }
  if (audioheight > 0) {
    height = audioheight;
  }

  //Twinkle Stars
  // var starind = 0;
  // starsGroup.children.forEach((star) => {
  //   // console.log(THREE.MathUtils.seededRandom(starind));
  //   var rnd = new Math.seedrandom();
  //   if (rnd.quick() > 0.8) {
  //     star.material.emission = 0xffffff;
  //     star.material.emissiveIntensity = 10 * rnd.quick();
  //   } else {
  //     star.material.emission = 0x000000;
  //     star.material.emissiveIntensity = 0;
  //   }
  //   starind++;
  // });
  // starsGroup.children.forEach((star) => {
  //   //oscillate star.material.emissiveIntensity
  //   Math.seedrandom();
  //   var m = Math.random() - 0.8;
  //   if (m < 0) { star.material.emission = 0x000000; }
  //   else { star.material.emission = 0xffffff; }
  //   star.material.emissiveIntensity = m * 10;
  // });

  //Camera Rotation
  // camera.position.x = Math.sin(cameraangle) * 8;
  // camera.position.z = Math.cos(cameraangle) * 8;
  // camera.lookAt(scene.position);
  // cameraangle += 0.001;

  //Animate Blobs
  AnimateBlobs(a);

  requestAnimationFrame(animate);
  render();
}

//Render Scene Function
function render() {
  // controls.update();
  scene.traverse(darkenNonBloomed);
  bloomComposer.render();
  scene.traverse(restoreMaterial);
  finalComposer.render();
  // renderer.render(scene, camera);
}

//Create Quad Sphere Function
function createSphereEx(resolution) {
  const geometry = new THREE.BoxGeometry(
    2,
    2,
    2,
    resolution,
    resolution,
    resolution
  );
  const positionAttribute = geometry.attributes.position;
  const spherePositions = [];
  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    const z = positionAttribute.getZ(i);
    spherePositions.push(
      x * Math.sqrt(1 - (y * y) / 2 - (z * z) / 2 + (y * y * z * z) / 3),
      y * Math.sqrt(1 - (z * z) / 2 - (x * x) / 2 + (z * z * x * x) / 3),
      z * Math.sqrt(1 - (x * x) / 2 - (y * y) / 2 + (x * x * y * y) / 3)
    );
  }
  geometry.attributes.position.set(spherePositions);
  geometry.setAttribute(
    "basePosition",
    new THREE.BufferAttribute().copy(geometry.attributes.position)
  );
  // console.log(geometry.attributes.position.count);
  return geometry;
}

//Create Triangulated Sphere Function
function createSphereExTriangulated(r) {
  const geometry = new THREE.IcosahedronGeometry(1, r);
  geometry.setAttribute(
    "basePosition",
    new THREE.BufferAttribute().copy(geometry.attributes.position)
  );
  return geometry;
}

//Animate Blobs Function
function AnimateBlobs(a) {
  if (!isMobile() && (audio != null)) {
    analyser.getByteFrequencyData(dataArray);
    var sum = 0;
    for (var i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    audioheight = (sum / bufferLength) / 100;
  }

  //Orbiting Dots
  const basePositionAttribute3 =
    meshBlob3.geometry.getAttribute("basePosition");
  const positionAttribute3 = meshBlob3.geometry.getAttribute("position");
  const vertex3 = new THREE.Vector3();
  incrementingangle += Math.PI / 360;
  dots.rotation.x = incrementingangle;
  dots.rotation.z = incrementingangle * 2;
  for (
    let vertexIndex = 0;
    vertexIndex < positionAttribute3.count;
    vertexIndex++
  ) {
    vertex3.fromBufferAttribute(basePositionAttribute3, vertexIndex);
    var perlin = noise.simplex3(
      vertex3.x * (amplitude / 5) + a * 0.0002,
      vertex3.y * (amplitude / 10) + a * 0.0005,
      vertex3.z * (amplitude / 5)
    );
    var ratio = perlin * (heightdots) + 1;
    vertex3.multiplyScalar(ratio);
    positionAttribute3.setXYZ(vertexIndex, vertex3.x, vertex3.y, vertex3.z);

    if (dotsCount < positionAttribute3.count) {
      var dot = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.015, 0),
        dotsMaterial
      );
      dot.name = "dot" + vertexIndex;
      dot.position.set(vertex3.x, vertex3.y, vertex3.z);
      dots.add(dot);
      dotsCount++;
    } else {
      dots
        .getObjectByName("dot" + vertexIndex)
        .position.set(vertex3.x, vertex3.y, vertex3.z);
    }
  }

  PerlinNoiseScatter(meshBlob1, a, amplitude, height, true);
  PerlinNoiseScatter(meshBlob2, a, amplitude / 2, 0.1);
}

//Perlin Noise Mesh Vertex Scatter Function
function PerlinNoiseScatter(mesh, a, amp, h, computeNormals = false) {
  const basePositionAttribute = mesh.geometry.getAttribute("basePosition");
  const positionAttribute = mesh.geometry.getAttribute("position");
  const vertex = new THREE.Vector3();
  for (
    let vertexIndex = 0;
    vertexIndex < positionAttribute.count;
    vertexIndex++
  ) {
    vertex.fromBufferAttribute(basePositionAttribute, vertexIndex);
    var perlin = noise.simplex3(
      vertex.x * amp + a * 0.0002,
      vertex.y * amp + a * 0.0005,
      vertex.z * amp
    );
    var ratio = perlin * h + 1;
    vertex.multiplyScalar(ratio);
    positionAttribute.setXYZ(vertexIndex, vertex.x, vertex.y, vertex.z);
  }
  if (computeNormals) {
    mesh.geometry.computeVertexNormals();
  }
  mesh.geometry.attributes.position.needsUpdate = true;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  bloomComposer.setSize(window.innerWidth, window.innerHeight);
  finalComposer.setSize(window.innerWidth, window.innerHeight);
}

function darkenNonBloomed(obj) {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
}

function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

//get the scroll position
function getScrollPos() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

var scrollpos;

function onScroll() {
  if (!isMobile()) {
    //Star trails on scroll
    if (scrollpos == null) {
      scrollpos = getScrollPos();
    } else {
      if (getScrollPos() > scrollpos) {
        starsGroup.rotation.x -= 0.002;
      } else {
        starsGroup.rotation.x += 0.002;
      }
      scrollpos = getScrollPos();
    }
    // if(document.getElementById("orbClickInfo")){
    //   setTimeout(()=>{
    //     document.getElementById("orbClickInfo").outerHTML="";
    //   },4000)
    // }
  }
  // console.log(getScrollPos());
  // console.log(audioCues);
  setAIState();
}

function setAIState() {
  var scrollPos = getScrollPos();
  var sectionIndex = window.activeSectionIndex();
  if (!isMobile()) {
    if (sectionIndex == undefined) sectionIndex = 0;
    // console.log(sectionIndex);
    playAIAudio(sectionIndex);
  }
  if (!sectionInfo[sectionIndex]) return;
  var relScrollPos = scrollPos - sectionInfo[sectionIndex].start; // position relative to the current section
  var secheight =
    sectionInfo[sectionIndex + 1].start - sectionInfo[sectionIndex].start;
  var multiplier = relScrollPos / secheight;
  applyKeyframe(sectionIndex, multiplier);
}

function playAIAudio(index) {
  if (context.state == "suspended") { initAudio();}

  if (audio != null && orbClicked) {
    if (!audioCues.sectionAudio[index]) {
      console.log(audioCues);
      return;
    }
    if (!audioCues.sectionAudio[index].played) {
      if (audio[index] != null) {
        // console.log(audio[index]);
        audio[index].play();
        console.log("playing audio " + index);
      } else {
        console.log("audio " + index + " is null");
      }
      audioCues.sectionAudio[index].played = true;
    }
  }
}

function applyKeyframe(index, position) {
  // console.log(index);
  // console.log(keyframes.sectionKeyframes[index]);
  if (!isMobile()) {
    AIGroup.position.x = lerp(
      keyframes.sectionKeyframes[index].x,
      keyframes.sectionKeyframes[index + 1].x,
      position
    );
    AIGroup.position.y = lerp(
      keyframes.sectionKeyframes[index].y,
      keyframes.sectionKeyframes[index + 1].y,
      position
    );
    AIGroup.position.z = lerp(
      keyframes.sectionKeyframes[index].z,
      keyframes.sectionKeyframes[index + 1].z,
      position
    );
  }
  amplitude = 4.0 * lerp(
    keyframes.sectionKeyframes[index].morph,
    keyframes.sectionKeyframes[index + 1].morph,
    position
  );
  displacement = 0.2 * lerp(
    keyframes.sectionKeyframes[index].displacement,
    keyframes.sectionKeyframes[index + 1].displacement,
    position
  );
  material2.displacementScale = displacement;
  var scale = (displacement + 1) / 2 * 1.95;
  meshBlob1.scale.set(scale, scale, scale);
  emission = lerp(
    keyframes.sectionKeyframes[index].emission,
    keyframes.sectionKeyframes[index + 1].emission,
    position
  );
  material1.emissiveIntensity = emission;
  material2.emissiveIntensity = emission;
  var opacity = lerp(
    keyframes.sectionKeyframes[index].coin,
    keyframes.sectionKeyframes[index + 1].coin,
    position
  );
  material1.opacity = 0.5 * (1 - opacity);
  var scale2 = (1 / (1 - opacity));
  if (scale2 > 1.7) { scale2 = 1.7; }
  if (scale2 < 1) { scale2 = 1; }
  meshBlob2.material.opacity = (1 - opacity);
  meshCoin.scale.set(scale2, scale2, scale2);
}

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

function initSectionInfo() {
  sectionInfo = [];
  for (let i = 1; i <= numberOfSections; i++) {
    var s = {
      start: getTop(`section${i}`),
      end: getTop(`section${i + 1}`),
    };
    if (s.end == null) {
      s.end = window.scrollHeight;
    }
    sectionInfo.push(s);
  }
  // console.log(sectionInfo);
}

function onMouseDown(event) {
  mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( AIGroup.children ); 
  if (intersects.length > 0) {
    // console.log(intersects);
    clickcapacitor = 1;
    orbClicked = true;
    if (!isMobile()) {
      setAIState();
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
//HELPER FUNCTION !!!!!!!!!!!! COMMENT THIS OUT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// function onKeyDown(event) {
//   switch (event.keyCode) {
//     case 87: {
//       // w
//       console.log("y=" + AIGroup.position.y);
//       AIGroup.position.y += 0.1;
//       break;
//     }
//     case 65: {
//       // a
//       console.log("x=" + AIGroup.position.x);
//       AIGroup.position.x -= 0.1;
//       break;
//     }
//     case 83: {
//       // s
//       console.log("y=" + AIGroup.position.y);
//       AIGroup.position.y -= 0.1;
//       break;
//     }
//     case 68: {
//       // d
//       console.log("x=" + AIGroup.position.x);
//       AIGroup.position.x += 0.1;
//       break;
//     }
//     case 81: {
//       // q
//       console.log("z=" + AIGroup.position.z);
//       AIGroup.position.z -= 0.1;
//       break;
//     }
//     case 69: {
//       // e
//       console.log("z=" + AIGroup.position.z);
//       AIGroup.position.z += 0.1;
//       break;
//     }
//     // case 90: // z
//     // {
//     //   console.log(AIGroup.rotation.x);
//     //   AIGroup.rotation.x += 0.01;
//     //   break;
//     // }
//     // case 67: // c
//     // {
//     //   console.log(AIGroup.rotation.x);
//     //   AIGroup.rotation.x -= 0.01;
//     //   break;
//     // }
//   }
// }
///////////////////////////////////////////////////////////////////////////////

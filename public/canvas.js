import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

import { EffectComposer } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/AfterimagePass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/ShaderPass.js';

let bloomComposer, finalComposer;
const ENTIRE_SCENE = 0, BLOOM_SCENE = 1, STAR_SCENE = 2, OCCLUSION_SCENE = 3, DOTS_SCENE = 4;
const darkMaterial = new THREE.MeshBasicMaterial( { color: "black" } );
const materials = {};
const bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );
const starLayer = new THREE.Layers();
starLayer.set( STAR_SCENE );
const occlusionLayer = new THREE.Layers();
occlusionLayer.set( OCCLUSION_SCENE );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg'),
    antialias: true,
});
const controls = new OrbitControls( camera, renderer.domElement );
controls.enabled = true;
controls.enablePan = true;
controls.enableZoom = true;
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
var amplitude;
var height;
var meshBlob1;
var meshBlob2;
var meshBlob3;
var dots;
var dotsCount = 0;
var rotatingVector;
var incrementingangle = 0;
var cameraangle = 0;

const params = {
  exposure: 0.1,
  bloomStrength: 1.2,
  bloomThreshold: 0,
  bloomRadius: 0.5
};

init();
requestAnimationFrame(animate);
console.log("Working");

function init() {

  // document.onscroll += function() {
  //   for (let i = 0; i < document.getElementsByClassName("section").length; i++) {
  //     var element = document.getElementsByClassName("section")[i];
  //     if (this.scrollY >= element.offsetTop - window.innerHeight / 2 && this.scrollY < element.offsetTop + element.offsetHeight - window.innerHeight / 2) {
  //       console.log(element);
  //     }
  //   }
  // };

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.CineonToneMapping;
  camera.position.setZ(7);
  scene.add(camera);
  scene.add(new THREE.AmbientLight(0xffffff, 1));
  camera.add(new THREE.PointLight(0xffffff, 1));
  // renderer.render(scene, camera);
  setAmplitude(2.0, 0.1);

  const renderScene = new RenderPass( scene, camera );

  const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
  bloomPass.threshold = params.bloomThreshold;
  bloomPass.strength = params.bloomStrength;
  bloomPass.radius = params.bloomRadius;

  bloomComposer = new EffectComposer( renderer );
  bloomComposer.renderToScreen = false;
  bloomComposer.addPass( renderScene );
  bloomComposer.addPass( bloomPass );

  const afterimagePass = new AfterimagePass();
  afterimagePass.uniforms[ 'damp' ].value = 0.95;

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

  finalComposer = new EffectComposer( renderer );
  finalComposer.addPass( renderScene );
  // finalComposer.addPass( bloomPass );
  finalComposer.addPass( afterimagePass );
  finalComposer.addPass( finalPass );

  addPano();

  var blob1 = createSphereEx();
  
  const TextureLoader = new THREE.TextureLoader();
  const textureland = TextureLoader.load('/assets/land.png');
  textureland.mapping = THREE.EquirectangularRefractionMapping;
  textureland.encoding = THREE.sRGBEncoding;
  
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
  var blob2 = createSphereExTriangulated(24);
  var material2 = new THREE.MeshStandardMaterial({
    color: 0x7c21d7,
    emissiveIntensity: 0,
    emissive: 0x5829f2,
    wireframe: true,
    wireframeLinewidth: 3
  });  
  meshBlob2 = new THREE.Mesh(blob2, material2);

  scene.add(meshBlob1);
  meshBlob1.layers.enable( BLOOM_SCENE );


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
  // meshBlob2 = new THREE.Mesh(blob2, materialglobe);
  scene.add(meshBlob2);

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

  rotatingVector = new THREE.Vector3(0,1,0);
  dots = new THREE.Group();
  dots.name = "dotsgroup";

  Array(1000).fill().forEach(addStar);
  window.addEventListener( 'resize', onWindowResize );
  console.log( renderer.info );
}

function addPano() {
  const geometry = new THREE.SphereGeometry(750, 60, 40);
  const texture = new THREE.TextureLoader().load('/assets/pano.jpg');
  const material = new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide});
  const starmesh = new THREE.Mesh(geometry, material);
  scene.add(starmesh);
  starmesh.layers.enable( STAR_SCENE );
}

function addStar() {
  var geometry = new THREE.IcosahedronGeometry(0.05, 1);
  var material = new THREE.MeshStandardMaterial({color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 10});
  var star = new THREE.Mesh(geometry, material);
  var [x,y,z] = Array(3).fill().map(() => (THREE.MathUtils.randFloatSpread(100) + 10));
  star.position.set(x,y,z);
  scene.add(star);
  star.layers.enable( STAR_SCENE );
}

function animate(a) {
  camera.position.x = Math.sin(cameraangle) * 8;
  camera.position.z = Math.cos(cameraangle) * 8;
  camera.lookAt(scene.position);
  cameraangle += 0.001;
  setNewPoints(a);
  requestAnimationFrame(animate);
  render();
}

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
  // mergeVertices(geometry);
  console.log(geometry.attributes.position.count);
  return geometry;
}
function createSphereExTriangulated(r) {
  const geometry = new THREE.IcosahedronGeometry(1, r);
  geometry.setAttribute("basePosition", new THREE.BufferAttribute().copy(geometry.attributes.position));
  return geometry;
}

function setAmplitude(a,h) {
  amplitude = a;
  height = h;
}


function setNewPoints(a) {
  const basePositionAttribute = meshBlob1.geometry.getAttribute("basePosition");
  const positionAttribute = meshBlob1.geometry.getAttribute( 'position' );
  const vertex = new THREE.Vector3();
  for ( let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++ ) {
      vertex.fromBufferAttribute( basePositionAttribute, vertexIndex );
      var perlin = noise.simplex3(
          vertex.x * amplitude + a * 0.0002,
          vertex.y * amplitude + a * 0.0005,
          vertex.z * amplitude );
      var ratio = perlin * height + 1;
      vertex.multiplyScalar(ratio);
      positionAttribute.setXYZ(vertexIndex, vertex.x, vertex.y, vertex.z);
  }

  const basePositionAttribute1 = meshBlob2.geometry.getAttribute("basePosition");
  const positionAttribute1 = meshBlob2.geometry.getAttribute( 'position' );
  const vertex1 = new THREE.Vector3();
  for ( let vertexIndex = 0; vertexIndex < positionAttribute1.count; vertexIndex++ ) {
      vertex1.fromBufferAttribute( basePositionAttribute1, vertexIndex );
      var perlin = noise.simplex3(
          vertex1.x * (amplitude / 2) + a * 0.0002,
          vertex1.y * (amplitude / 2) + a * 0.0005,
          vertex1.z * (amplitude / 2) );
      var ratio = perlin * 0.1 + 1;
      vertex1.multiplyScalar(ratio);
      positionAttribute1.setXYZ(vertexIndex, vertex1.x, vertex1.y, vertex1.z);
  }

  // meshBlob3.rotateOnAxis(new THREE.Vector3(0,1,0), 0.1);
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
        var g = new THREE.IcosahedronGeometry(0.01, 1);
        var m = new THREE.MeshStandardMaterial({color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 10});
        var dot = new THREE.Mesh(g, m);
        dot.name = "dot" + vertexIndex;
        dot.position.set(vertex3.x, vertex3.y, vertex3.z);
        dots.add(dot);
        dotsCount++;
        dot.layers.enable(DOTS_SCENE);
      } else {
        // console.log(dots);
        dots.getObjectByName("dot" + vertexIndex).position.set(vertex3.x, vertex3.y, vertex3.z);
      }
  }

  if (!scene.getObjectByName("dotsgroup")) {
    scene.add(dots);
  }

  meshBlob2.geometry.computeVertexNormals();
  meshBlob1.geometry.computeVertexNormals();
  meshBlob3.geometry.computeVertexNormals();

  meshBlob2.geometry.attributes.position.needsUpdate = true; // required after the first render
  meshBlob2.geometry.computeBoundingSphere();
  meshBlob1.geometry.attributes.position.needsUpdate = true; // required after the first render
  meshBlob1.geometry.computeBoundingSphere();
  meshBlob3.geometry.attributes.position.needsUpdate = true; // required after the first render
  meshBlob3.geometry.computeBoundingSphere();
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

function mergeVertices(geo) {

  var verticesMap = {}; // Hashmap for looking up vertices by position coordinates (and making sure they are unique)
  var unique = [], changes = [];

  var v, key;
  var precisionPoints = 4; // number of decimal points, e.g. 4 for epsilon of 0.0001
  var precision = Math.pow( 10, precisionPoints );
  var i, il, face;
  var indices, j, jl;

  for ( i = 0, il = geo.attributes.position.count; i < il; i ++ ) {

    v = geo.attributes.position[ i ];
    key = Math.round( geo.attributes.position.getX(i) * precision ) + '_' + Math.round( geo.attributes.position.getY(i) * precision ) + '_' + Math.round( geo.attributes.position.getZ(i) * precision );

    if ( verticesMap[ key ] === undefined ) {

      verticesMap[ key ] = i;
      unique.push( geo.attributes.position[ i ] );
      changes[ i ] = unique.length - 1;

    } else {

      //console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
      changes[ i ] = changes[ verticesMap[ key ] ];

    }

  }


  // if faces are completely degenerate after merging vertices, we
  // have to remove them from the geometry.
  var faceIndicesToRemove = [];

  for ( i = 0, il = geo.attributes.position; i < il; i ++ ) {

    face = geo.faces[ i ];

    face.a = changes[ face.a ];
    face.b = changes[ face.b ];
    face.c = changes[ face.c ];

    indices = [ face.a, face.b, face.c ];

    // if any duplicate vertices are found in a Face3
    // we have to remove the face as nothing can be saved
    for ( var n = 0; n < 3; n ++ ) {

      if ( indices[ n ] === indices[ ( n + 1 ) % 3 ] ) {

        faceIndicesToRemove.push( i );
        break;

      }

    }

  }

  for ( i = faceIndicesToRemove.length - 1; i >= 0; i -- ) {

    var idx = faceIndicesToRemove[ i ];

    geo.faces.splice( idx, 1 );

    for ( j = 0, jl = geo.faceVertexUvs.length; j < jl; j ++ ) {

      geo.faceVertexUvs[ j ].splice( idx, 1 );

    }

  }

  // Use unique set of vertices

  var diff = geo.vertices.length - unique.length;
  geo.vertices = unique;
  return diff;

}
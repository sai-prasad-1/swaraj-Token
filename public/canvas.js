import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg'),
    antialias: true
});
const controls = new OrbitControls( camera, renderer.domElement );
// controls.enabled = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.6;
var amplitude;
var height;
var meshBlob1;
var meshBlob2;

init();
requestAnimationFrame(animate);
console.log("Working");
function init() {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(7);
  scene.add(camera);
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  camera.add(new THREE.PointLight(0xffffff, 1));
  renderer.render(scene, camera);
  setAmplitude(2.0, 0.1);

  addPano();

  var blob1 = createSphereEx(); 
  
  const TextureLoader = new THREE.TextureLoader();
  const textureland = TextureLoader.load('/assets/land.png');
  textureland.mapping = THREE.EquirectangularRefractionMapping;
  textureland.encoding = THREE.sRGBEncoding;
  
  var material1 = new THREE.MeshPhysicalMaterial({
    envMap: new THREE.CubeTextureLoader().load(['/assets/px.png', '/assets/nx.png', '/assets/py.png', '/assets/ny.png', '/assets/pz.png', '/assets/nz.png']),
    color: 0x57ddff,
    metalness: 1,
    emissive: 0x57ddff,
    emissiveIntensity: 1,
    roughness: 0,
    opacity: 0.5,
    transparent: true,
    envMapIntensity: 10,
    premultipliedAlpha: true,
    side: THREE.DoubleSide
  });  
  meshBlob1 = new THREE.Mesh(blob1, material1);
  var blob2 = createSphereEx();
  var material2 = new THREE.MeshBasicMaterial({color: 0x7c57f7, wireframe: true, wireframeLinewidth: 1});  
  meshBlob2 = new THREE.Mesh(blob2, material2);

  // blob1.morphAttributes.position[0] = new THREE.Float32BufferAttribute(landmass, 3);

  scene.add(meshBlob1);


  var globesphere = new THREE.SphereGeometry(0.95, 128, 128);
  var materialglobe = new THREE.MeshStandardMaterial({
    // envMap: new THREE.CubeTextureLoader().load(['/assets/px.png', '/assets/nx.png', '/assets/py.png', '/assets/ny.png', '/assets/pz.png', '/assets/nz.png']),
    color: 0x7c57f7,
    displacementMap: textureland,
    displacementScale: 0.15,
    wireframe: true,
    wireframeLinewidth: 3
  });
  var meshglobe = new THREE.Mesh(globesphere, materialglobe);
  // scene.add(meshglobe);
  // meshBlob2 = new THREE.Mesh(blob2, materialglobe);
  scene.add(meshBlob2);

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
}

function addStar() {
  var geometry = new THREE.SphereGeometry(0.05, 16, 16);
  var material = new THREE.MeshPhongMaterial({color: 0xffffff, opacity: 0.5, transparent: true, blending: THREE.AdditiveBlending});
  var star = new THREE.Mesh(geometry, material);
  var [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

function animate(a) {
  setNewPoints(a);
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
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

  // const basePositionAttribute1 = meshBlob2.geometry.getAttribute("basePosition");
  // const positionAttribute1 = meshBlob2.geometry.getAttribute( 'position' );
  // const vertex1 = new THREE.Vector3();
  // for ( let vertexIndex = 0; vertexIndex < positionAttribute1.count; vertexIndex++ ) {
  //     vertex1.fromBufferAttribute( basePositionAttribute1, vertexIndex );
  //     var perlin = noise.simplex3(
  //         vertex1.x * (amplitude / 2) + a * 0.0002,
  //         vertex1.y * (amplitude / 2) + a * 0.0005,
  //         vertex1.z * (amplitude / 2) );
  //     var ratio = perlin * 0.1 + 1;
  //     vertex1.multiplyScalar(ratio);
  //     positionAttribute1.setXYZ(vertexIndex, vertex1.x, vertex1.y, vertex1.z);
  // }

  meshBlob2.geometry.computeVertexNormals();
  meshBlob1.geometry.computeVertexNormals();

  meshBlob2.geometry.attributes.position.needsUpdate = true; // required after the first render
  meshBlob2.geometry.computeBoundingSphere();
  meshBlob1.geometry.attributes.position.needsUpdate = true; // required after the first render
  meshBlob1.geometry.computeBoundingSphere();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
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
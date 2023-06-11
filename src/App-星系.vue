<template>
  <div id="box"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'

/***
 * 一个圆，三条边。如何正确分割角度？
 * Math.cos与Math.sin将点均匀分布在一个圆上，再 * radius实现画边
 * 
 * var branches = 3, angles = [];
    for(let i = 0; i < branches; i++) {
        let angle = (i % branches) / branches * Math.PI * 2
        console.log(Math.cos(angle) , i, Math.sin(angle))
    }
 */
let renderer
let scene
let camera
let wrapper

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  wrapper = document.querySelector('#box')
  wrapper.appendChild(renderer.domElement)

  const gui = new GUI()
  scene = new THREE.Scene()
  // scene.background = new THREE.Color(0xe0e0e0)
  // scene.up.z = 1
  // scene.up.x = 0
  // scene.up.y = 0

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 1, 5)
  
  
  // mesh
  // 平面
  const geometry = new THREE.PlaneGeometry( 30, 30 );
  const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  const plane = new THREE.Mesh( geometry, material );
  // scene.add( plane );


  const sphereGeometry = new THREE.SphereGeometry( 0.2, 32, 16 )
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  // scene.add(sphere)

  // box
  const boxGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 )
  const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const box = new THREE.Mesh(boxGeometry, boxMaterial)
  box.position.set(0.2, 0.2, 0.5)
  // scene.add(box)

  // 网格
  const size = 10;
  const divisions = 10;

  const gridHelper = new THREE.GridHelper( size, divisions);
  // scene.add( gridHelper );

  // console.log('camera.up', renderer.up)

  // 雾
  let fog = new THREE.Fog(0xe0e0e0, 0.01, 100)
  // scene.fog = fog

  // 坐标系
  let axesHelper = new THREE.AxesHelper(10)
  // scene.add(axesHelper)

  // 控制器
  const orbitControl = new OrbitControls(camera, renderer.domElement)

  // light
  
  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
  scene.add(ambientLight)
  // 直行光
//   const light = new THREE.AmbientLight( 0xffffff ); // soft white light
// scene.add( light );

  const directionalLight = new THREE.DirectionalLight( 0xffffff );
  directionalLight.position.y = 5
  directionalLight.position.z = 5
  directionalLight.position.x = 1
  const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
  // scene.add( directionalLight );
  // scene.add( helper );

  const light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 5, 5, 1 );
// scene.add( light );

  // 平面
  const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 10, 10 ), new THREE.MeshStandardMaterial( { color: 0xffffff, depthWrite: false } ) );
  mesh.rotation.x = - Math.PI / 2;
  // scene.add( mesh );


  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
  hemiLight.position.set( 0, 0, 20 );
  // scene.add( hemiLight );
  const Hemihelper = new THREE.HemisphereLightHelper( hemiLight, 5 );

  /**
   * 星系 galaxy
   * */

  // params
  const params = {
    count: 200000,
    branches: 3,
    radius: 2,
    spin: 2,
    rotation: false,
    randomness: 0.2,
    randomnessPow: 2,
    insideColor: '#ff3c30',
    outsideColor: '#1b7184'
  }
  let bufferGeometry = null,
      positions = null,
      colors = null,
      points = null,
      pointsMaterial = null;
  
  const galaxyGenerator = () => {
    // console.log(!!points, '清空', points, bufferGeometry, pointsMaterial)
    if(!!points) {
      
      bufferGeometry.dispose()
      pointsMaterial.dispose()
      scene.remove(points)
    }
    bufferGeometry = new THREE.BufferGeometry()
    positions = new Float32Array(params.count * 3)
    colors = new Float32Array(params.count * 3)

    const colorInside = new THREE.Color(params.insideColor)
    const colorOutside = new THREE.Color(params.outsideColor)

    for(let i = 0; i < params.count *  3; i++) {
      const i3 = i * 3
      const radius = Math.random() * params.radius

      const spinAngle = radius * params.spin
      const angle = (i % params.branches) / params.branches * Math.PI * 2

      // positions[i3] = Math.random()
      // console.log(Math.cos(angle))
      // 粒子分散
      // const randomX = (Math.random() - 0.5) * params.randomness
      // const randomY = (Math.random() - 0.5) * params.randomness
      // const randomZ = (Math.random() - 0.5) * params.randomness

      // 粒子从原点向四周扩散时，逐渐减少（集中在中间区域）
      const randomX = Math.pow(Math.random(), params.randomnessPow) * (Math.random() < 0.5 ? 1 : -1)
      const randomY = Math.pow(Math.random(), params.randomnessPow) * (Math.random() < 0.5 ? 1 : -1)
      const randomZ = Math.pow(Math.random(), params.randomnessPow) * (Math.random() < 0.5 ? 1 : -1)

      positions[i3] = Math.cos(angle + spinAngle) * radius + randomX
      positions[i3 + 1] = randomY
      positions[i3 + 2] = Math.sin(angle + spinAngle) * radius + randomZ

      const mixedColor = colorInside.clone()

      // radius = Math.random() * params.radius；所以最终结果是 Math.random()
      mixedColor.lerp(colorOutside, radius / params.radius)

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    bufferGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    pointsMaterial = new THREE.PointsMaterial({
      size: 0.02,
      // sizeAttenuation: true,
      // depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    })
    points = new THREE.Points(bufferGeometry, pointsMaterial)
    // points.position.x = -2
    scene.add(points)
  }
  

  gui.add(params, 'radius').min(1).max(5).step(0.01).onFinishChange(galaxyGenerator)
  gui.add(params, 'spin').min(-5).max(5).step(0.01).onFinishChange(galaxyGenerator)
  gui.add(params, 'rotation')
  gui.add(params, 'randomness').min(0).max(2).step(0.01).onFinishChange(galaxyGenerator)
  gui.add(params, 'randomnessPow').min(0).max(5).step(0.01).onFinishChange(galaxyGenerator)
  gui.add(params, 'insideColor').onFinishChange(galaxyGenerator)
  gui.add(params, 'outsideColor').onFinishChange(galaxyGenerator)
  galaxyGenerator()
  

  // scene.add( Hemihelper );

  const clock = new THREE.Clock()
  let prevRotate = null
  function render(){
    const time = clock.getElapsedTime()

    requestAnimationFrame(render)

    // animate
    // points.rotation.y = time

    // wave
    // for(let i = 0; i < count; i++ ) {
    //   const i3 = i * 3

    //   const x = bufferGeometry.attributes.position.array[i3]
    //   // bufferGeometry.attributes.position.array[i3 + 1] = Math.sin(time)
    //   bufferGeometry.attributes.position.array[i3 + 1] = Math.sin(time + x)
    // }
    // bufferGeometry.attributes.position.needsUpdate = true
    if(params.rotation) {
      prevRotate = time
      points.rotation.y = prevRotate
    }
    
    orbitControl.update()
    renderer.render(scene, camera)
  }
  render()
}
window.onload = init
</script>


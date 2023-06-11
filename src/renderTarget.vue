<template>
  <div id="box"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

// onMounted(() => {
//   // 场景
//   const scene = new THREE.Scene()

//   // 相机
//   let aspect = window.devicePixelRatio
//   const camera = new THREE.PerspectiveCamera(45,aspect,0.1, 1000);
  
//   camera.position.x = 0;
//   camera.position.y = 0;
//   camera.position.z = 100
//   // 将该向量与所传入的标量s进行相乘
//   camera.position.multiplyScalar( 2 );
//   camera.lookAt( 0, 0, 0 );
//   camera.updateMatrixWorld();


//   // 渲染器
//   const renderer = new THREE.WebGLRenderer()
//   renderer.setClearColor(0xEEEEEE)
//   renderer.setSize(window.innerWidth, window.innerHeight)
//   renderer.setPixelRatio(window.devicePixelRatio)
//   renderer.shadowMap.enabled = true
//   const root = document.querySelector('#box') as HTMLElement;
//   root.appendChild(renderer.domElement)
  
//   // 
//   const labeldata = [
//     { size: .01, scale: 0.0001, label: 'microscopic (1µm)' }, // FIXME - triangulating text fails at this size, so we scale instead
//     { size: .01, scale: 0.1, label: 'minuscule (1mm)' },
//     { size: .01, scale: 1.0, label: 'tiny (1cm)' },
//     { size: 1, scale: 1.0, label: 'child-sized (1m)' },
//     { size: 10, scale: 1.0, label: 'tree-sized (10m)' },
//     { size: 100, scale: 1.0, label: 'building-sized (100m)' },
//     { size: 1000, scale: 1.0, label: 'medium (1km)' },
//     { size: 10000, scale: 1.0, label: 'city-sized (10km)' },
//     { size: 3400000, scale: 1.0, label: 'moon-sized (3,400 Km)' },
//     { size: 12000000, scale: 1.0, label: 'planet-sized (12,000 km)' },
//     { size: 1400000000, scale: 1.0, label: 'sun-sized (1,400,000 km)' },
//     { size: 7.47e12, scale: 1.0, label: 'solar system-sized (50Au)' },
//     { size: 9.4605284e15, scale: 1.0, label: 'gargantuan (1 light year)' },
//     { size: 3.08567758e16, scale: 1.0, label: 'ludicrous (1 parsec)' },
//     { size: 1e19, scale: 1.0, label: 'mind boggling (1000 light years)' }
//   ];

//   // FontLoader
//   // const loader = new FontLoader()
//   // loader.load('fonts/helvetiker_regular.typeface.json', font => {
//   //   // 加载字体
//   //   for(let i = 0; i < labeldata.length; i++) {
//   //     const textgeometry = new TextGeometry(labeldata[i].label, {
//   //       font,
//   //       size: labeldata[i].size,
//   //       height: labeldata[i].size
//   //     })

//   //     const textMaterial = new THREE.MeshPhongMaterial({
//   //       color: 0xffffff,
//   //       specular: 0x050505,
//   //       shininess: 50,
//   //       emissive: 0x000000
//   //     })

//   //     const textMesh = new THREE.Mesh(textgeometry, textMaterial)
//   //     // group
//   //     const group = new THREE.Group()
//   //     group.add(textMesh)

//   //     // 球体
//   //     const sphereGeometry = new THREE.SphereGeometry(0.5, 24, 12)
//   //     const sphereMaterial = new THREE.MeshPhongMaterial({
//   //       color: new THREE.Color().setHSL( Math.random(), 0.5, 0.5 ),
//   //       specular: 0x050505,
//   //       shininess: 50,
//   //       emissive: 0x000000
//   //     })
//   //     const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
//   //     group.add(sphere)
      
//   //     scene.add(group)
//   //   }
//   // })



//   // planeHelper
//   // const plane = new THREE.Plane( new THREE.Vector3( 0, -1, 0 ), 0 ); 
//   // const helper = new THREE.PlaneHelper( plane, 1, 0xffff00 ); 
//   // scene.add( helper );

//   const axesHelper = new THREE.AxesHelper( 5 );
//   // scene.add( axesHelper );
  

//   // 控制器
//   const orbitControls = new OrbitControls(camera, renderer.domElement)


//   // 平面
//   const planeGeometry = new THREE.PlaneGeometry(40, 20)
//   const planeMaterial = new THREE.MeshLambertMaterial({color: 0x000000, side: THREE.DoubleSide});
//   const plane = new THREE.Mesh(planeGeometry, planeMaterial)
//   plane.receiveShadow = true
//   plane.rotation.x = 0//-0.5 * Math.PI
//   // plane.position.set(-10, -10, 20)
//   plane.position.x = 0;
//   plane.position.y = 0;
//   plane.position.z = 0;

//   scene.add(plane)


//   let pointer = new THREE.Vector2();
//   let raycaster = new THREE.Raycaster()
//   // 鼠标移动
//   function onMousemove() {
//     document.addEventListener('mousemove', e=> {
//       let x = (e.clientX / window.innerWidth) * 2 - 1;
//       let y = -(e.clientY / window.innerHeight) * 2 + 1;
//       pointer.x = x
//       pointer.y = y
      
//       raycaster.setFromCamera(pointer, camera)
//       let intersects = raycaster.intersectObjects(scene.children, false)
//       if (intersects.length) {
//         console.log('intersects', intersects)
//       }

//     })
//   }
//   onMousemove()


//   render()
//   function render() {
//     requestAnimationFrame(render)
//     animate()
//   }

//   let delta = 0, radius = 100;
//   let INTERSECTED
  
//   function animate() {
//     delta += 0.1
//     // 旋转相机，rotation不起作用
//     // camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(delta))
//     // camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(delta))
//     // camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(delta))


//     orbitControls.update()
//     renderer.render(scene, camera)
//   }
// })




onMounted(() => {
  let wrap = document.querySelector('#box')
  let renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  wrap?.appendChild(renderer.domElement)

  // rendererTarget
  let renderTarget = new THREE.WebGLRenderTarget(512, 512)
  let rtScene = new THREE.Scene()
  rtScene.background = new THREE.Color('red')

  console.log('renderTarget', renderTarget)

  let rtCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 5)
  rtCamera.position.z = 2

  let boxGeometry = new THREE.BoxGeometry(1,1,1)
  let rtCube = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial({ color: 0xEEEEEE}))
  rtScene.add(rtCube)
  let rtLight = new THREE.DirectionalLight(0xFFFFFF, 1)
  rtLight.position.set(-1, 2,4)
  rtScene.add(rtLight)


  let scene = new THREE.Scene()
  let camera= new THREE.PerspectiveCamera(75,3,0.1,5)
  camera.position.z = 2

  let meterial = new THREE.MeshPhongMaterial({
    map: renderTarget.texture
  })
  let cube = new THREE.Mesh(boxGeometry, meterial)
  scene.add(cube)
  let light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(-1, 2,4)
  scene.add(light)


  function render(time) {
    time *= 0.001
    
    rtCube.rotation.x = time
    rtCube.rotation.y = time

    renderer.setRenderTarget(renderTarget)
    renderer.render(rtScene, rtCamera)
    renderer.setRenderTarget(null)

    cube.rotation.x = time
    cube.rotation.y = time

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)


})

</script>

<template>
  <div id="box"></div>
  <div class="control-list">
    <button @click="changeScene">切换场景</button>&nbsp;&nbsp;
    <button @click="play">播放</button>&nbsp;&nbsp;
    <button @click="birdView">鸟瞰</button>&nbsp;&nbsp;
  </div>
  
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'

let orbitControl = null;
let camera = null;
let prevCameraPos = {};
let renderer = null;
let scene2 = null
let scene1 = null
let scene = null
let isToggled = ref(true)
const played = ref(false)
function play() {
  played.value = !played.value
  // orbitControl && orbitControl.reset()
}

// 补间动画

// let changeScene = () => {}

function changeScene() {
  renderer.clear()
  if(isToggled.value) {
    
    scene = scene2
    console.log('场景2', scene2)
  } else {
    scene = scene1
    console.log('场景111111', scene)
  }
  isToggled.value = !isToggled.value
}



function birdView(){
  // prevCameraPos.x = camera.position.x
  // prevCameraPos.y = camera.position.y
  // prevCameraPos.z = camera.position.z

  // const tween = new TWEEN.Tween(camera!.position) // Create a new tween that modifies 'coords'.
	// .to(new THREE.Vector(0,0, 20), 1000) // Move to (300, 200) in 1 second.
	// .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
	// .onUpdate(() => {
	// 	// Called after tween.js updates 'coords'.
	// 	// Move 'box' to the position described by 'coords' with a CSS translation.
	// 	// box.style.setProperty('transform', `translate(${coords.x}px, ${coords.y}px)`)
	// })
	// .start() // Start the tween immediately.
  // if(orbitControl?.enableRotate) {
    camera && camera.position.set(0,0, 30)
    orbitControl.enableRotate = false
    orbitControl.enablePan = true
  // } else {
  //   camera && camera.position.set(prevCameraPos.x, prevCameraPos.y, prevCameraPos.z)
  //   orbitControl.enableRotate = true
  //   orbitControl.enablePan = true
  // }
}




onMounted(() => {
  let wrap = document.querySelector('#box')
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0xEEEEEE)
  renderer.outputEncoding = THREE.sRGBEncoding
  wrap?.appendChild(renderer.domElement)

  // 材质
  // matcapMaterial
  const matcapMaterial = new THREE.MeshMatcapMaterial()

  // 贴图
  const textureLoader = new THREE.TextureLoader()
  const matcapTexture = textureLoader.load('/img/logo.png')
  matcapMaterial.matcap = matcapTexture

  // box
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    matcapMaterial
  )
  box.position.set(-5,0,0)
  


  scene = scene1 = new THREE.Scene()
  scene2 = new THREE.Scene()
  scene2.background = new THREE.Color('black')


  scene.add(box)

  let pmremGenerator = new THREE.PMREMGenerator( renderer )
  // scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

  const cubeTextureLoader = new THREE.CubeTextureLoader().setPath('/textures/pisa/')
  scene.background = cubeTextureLoader.load([
    'px.png',
    'py.png',
    'pz.png',
    'nx.png',
    'ny.png',
    'nz.png'
  ])


  camera= new THREE.PerspectiveCamera(75,1,0.1,100)
  camera.position.set(20,3, 0)
  console.log('camera', camera)
  // camera.up.z = 1
  // camera.up.x= 0
  // camera.up.y = 0

  // 坐标系
  const axesHelper = new THREE.AxesHelper( 50 );
  scene.add( axesHelper );
  scene2.add( axesHelper.clone() )

  let boxGeometry = new THREE.BoxGeometry(1,1,1)
  let meterial = new THREE.MeshPhongMaterial()
  let cube = new THREE.Mesh(boxGeometry, meterial)
  // scene.add(cube)
  let light = new THREE.DirectionalLight(0xffffff, 3)
  light.position.set(5, 5, 5)
  // scene.add(light)

  function loadHouse() {
    let loader = new GLTFLoader()
    // loader.load('models/house/scene.gltf', gltf => {
    loader.load('models/dae_house/scene.gltf', gltf => {
      console.log('加载成功', gltf)
      scene.add(gltf.scene)
    }, () => {
      console.log('加载进程')
    }, (...args) => {
      console.log('加载失败', args)
    })
  }
  // loadHouse()

  function loadZhanting() {
    // let loader = new THREE.ObjectLoader();
    let loader = new THREE.FileLoader()
    loader.load('models/zhanting/Z21-0514.max',  obj => {
      console.log('加载成功', obj)
      scene.add(obj)
    }, () => {
      console.log('加载进程')
    }, (...args) => {
      console.log('加载失败', args)
    })
  }
  // loadZhanting()

  // 阿凡达
  function loadSceniverse() {
    let loader = new GLTFLoader()
    loader.load('models/water/scene.gltf', gltf => {
      console.log('加载成功', gltf)
      scene.add(gltf.scene)
    }, () => {
      console.log('加载进程')
    }, (...args) => {
      console.log('加载失败', args)
    })
  }
  // loadSceniverse()

  function upZ(obj) {
    obj.up.x = 1;
    obj.up.y = 0;
    obj.up.z = 0
    if(obj.children?.length) {
      obj.children.forEach(o => upZ(o))
    }
  }
  // 小桥流水
  function loadFBX() {
    let loader = new GLTFLoader()
    loader.load('models/assignment/scene.gltf', gltf => {
      console.log('加载成功fbx', gltf)
      // upZ(gltf.scene)
      gltf.scene.rotation.x = 0.5*Math.PI
      scene.add(gltf.scene)
    }, () => {
      console.log('加载进程')
    }, (...args) => {
      console.log('加载失败', args)
    })
  }
  // loadFBX()

  // 加载头盔
  function loadHelmet() {
    let loader = new GLTFLoader().setPath('/models/helmet/')
    loader.load('DamagedHelmet.gltf', gltf => {
      console.log('gltf成功', gltf)
      gltf.scene.rotation.y = 0.5 * Math.PI
      gltf.scene.rotation.x = 0.5 * Math.PI
      scene.add(gltf.scene)
    }, gltf => {
      console.log('gltf进程', gltf)
    }, err => {
      console.log('gltf失败', err)
    })
  }
  // loadHelmet()

  // 房子
  function loadSmallCity() {
    const loader = new GLTFLoader().setPath('/models/cartoon_lowpoly_small_city_free_pack/');
    loader.load('scene.gltf', gltf => {
      console.log('加载成功', gltf)
      gltf.scene.position.set()
      scene.add(gltf.scene)
    }, progress => {
      console.log('加载进度', progress)
    },
    err => {
      console.log('加载失败', err)
    })
  }
  loadSmallCity()

  // 平面
  let planeBoxgeometry = new THREE.PlaneGeometry(50, 50)
  let plane = new THREE.Mesh(planeBoxgeometry, new THREE.MeshBasicMaterial({ color: 0x000000 }))
  plane.position.x = -20
  // scene.add(plane)

  let raycaster = new THREE.Raycaster()
  let pos = new THREE.Vector2()

  function mousedown() {
    let prev = {x:0,y:0}
    window.addEventListener('mousedown', e => {
      let x = (e.clientX / window.innerWidth) * 2 - 1;
      let y = -(e.clientY / window.innerHeight) * 2 + 1;
      pos.x = x
      pos.y = y
      prev.x = x
      prev.y = y
      console.log('鼠标点击', pos)
      // window.addEventListener('mousemove', e => {
      //   let x = (e.clientX / window.innerWidth) * 2 - 1;
      //   let y = -(e.clientY / window.innerHeight) * 2 + 1;

      //   let sx = scene.children[3].position.x
      //   let sy = scene.children[3].position.y
      //   let sz = scene.children[3].position.z
      //   scene.children[3].position.set(sx + x - prev.x, sy, sz)
      //   // pos.x = x
      //   // pos.y = y
      //   console.log('move', sx,x,prev.x,sx + x - prev.x, sy + y - prev.y)
      // })
    })
    
  }
  // mousedown()

  function animate(){
    raycaster.setFromCamera(pos, camera)

    let intersects = raycaster.intersectObjects(scene.children, false)
    if(intersects.length) {
      // console.log('intersects', intersects)
    }
  }

  orbitControl = new OrbitControls(camera, renderer.domElement)

  orbitControl.maxPolarAngle = 0.5 * Math.PI
  orbitControl.minPolarAngle = 0
  
  // 将相机向内外移动多少
  // orbitControl.maxDistance = 20
  // orbitControl.minDistance = 10

  // orbitControl.maxZoom = 1.01
  // orbitControl.zoom = 1

  // orbitControl.addEventListener('change', function(...args) {
  //   // let pos = args[0].target.position0
  //   // console.log(pos.x, pos.y, pos.z, 'change---', camera.position.x, camera.position.y, camera.position.z)
  //   // played.value = false
  // })
  orbitControl.addEventListener('start', function(arg) {
    // console.log(camera, 'start---', arg.target)
    // orbitControl.saveState()
    played.value = false
  })
  orbitControl.addEventListener('end', function(arg) {
    // console.log('end---',arg)
    played.value = false
  })

  

  // 球体
  const sphereGeometry = new THREE.SphereGeometry(1)
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('red') })
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  scene.add(sphere)
  scene2.add(sphere.clone())


  console.log('scene', scene)
  const radius = 5;
  let theta = 0
  let clock = new THREE.Clock()
  function render(time) {
    time *= 0.001
    orbitControl.update()
    TWEEN.update(time)

    theta += 0.1;

    if(played.value) {
      camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
      camera.position.y = Math.abs(radius * Math.sin( THREE.MathUtils.degToRad( theta ) )) + 5
      camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
      camera.lookAt( scene.position );
    }

    let elapsed = clock.getElapsedTime()
    sphere.position.set(Math.sin(elapsed) * 5,  Math.cos(elapsed) * 5, 2)
    
    
    // cube.rotation.x = time
    // cube.rotation.y = time
    

    // 
    // raycaster.setFromCamera(pos, camera)

    // let intersects = raycaster.intersectObjects(scene.children, false)
    // if(intersects?.length) {
    //   console.log('intersects', intersects)
    // }

    renderer.render(scene, camera)
    // console.log('renderrrrrrrrrrr', scene)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)


})

</script>

<style lang="scss">
.control-list{
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%)
}

</style>

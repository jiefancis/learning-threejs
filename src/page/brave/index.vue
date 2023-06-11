<template>
    <div id="container"></div>
  </template>
  
  <script setup>
  import { onMounted, ref, nextTick } from 'vue'
  import TWEEN from '@tweenjs/tween.js'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

  
  let renderer
  let scene
  let camera
  let wrapper
  
  function init() {
    
    renderer = new THREE.WebGLRenderer()
    wrapper = document.querySelector('#container')
    const clientW = wrapper.clientWidth, clientH = wrapper.clientHeight;
    renderer.setSize(clientW, clientH)
    console.log('11111111111', clientW, clientH)
    wrapper.appendChild(renderer.domElement)
  
    scene = new THREE.Scene()
    // scene.background = new THREE.Color(0xe0e0e0)
    // scene.up.z = 1
    // scene.up.x = 0
    // scene.up.y = 0
  
    camera = new THREE.PerspectiveCamera(45, clientW / clientH, 0.1, 1000)
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
  
    // 粒子
    // 怎么会成了平面（三角形）了呢？
    // const bufferGeometry = new THREE.BufferGeometry()
    // const vertices = []
  
    // for(let i = 0; i < 100; i++) {
    //   vertices.push(Math.random())
    // }
    // const position = new Float32Array(vertices)
    // bufferGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
  
    // const bufferMaterial = new THREE.PointsMaterial({ color: 0xff0000, side: THREE.DoubleSide })
    // const points = new THREE.Mesh(bufferGeometry, bufferMaterial)
    // scene.add(points)
  
  
    const bufferGeometry = new THREE.BufferGeometry()
    const count = 200000
    const positions = new Float32Array(count * 3)
  
    for(let i = 0; i < count *  3; i++) {
      positions[i] = Math.random() * 20
    }
  
    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  
    const pointsMaterial = new THREE.PointsMaterial({ color: new THREE.Color('rakeblue') })
    pointsMaterial.size = 0.02
    // pointsMaterial.depthTest = false
    pointsMaterial.depthWrite = false
    const points = new THREE.Points(bufferGeometry, pointsMaterial)
    points.position.x = -2
    scene.add(points)
    
  
    // scene.add( Hemihelper );
  
    const clock = new THREE.Clock()
    function render(){
      const time = clock.getElapsedTime()
  
      requestAnimationFrame(render)
  
      // animate
      // points.rotation.y = time
  
      // wave
      for(let i = 0; i < count; i++ ) {
        const i3 = i * 3
  
        const x = bufferGeometry.attributes.position.array[i3]
        // bufferGeometry.attributes.position.array[i3 + 1] = Math.sin(time)
        bufferGeometry.attributes.position.array[i3 + 1] = Math.sin(time + x)
      }
      bufferGeometry.attributes.position.needsUpdate = true
  
      orbitControl.update()
      renderer.render(scene, camera)
    }
    render()
  }
  onMounted(() => nextTick(init))
</script>
<style scoped>
#container {
  width: 100%;
  height: calc(100% - 60px);
}
</style>
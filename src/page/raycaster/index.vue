<template>
    <div id="container"></div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, nextTick } from 'vue'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  
  const init = () => {
    const root = document.querySelector('#container') as HTMLElement;
    const clientW = root.clientWidth, clientH = root.clientHeight;
    // 场景
    const scene = new THREE.Scene()
  
    // 相机
    let aspect = window.devicePixelRatio
    const camera = new THREE.PerspectiveCamera(45,aspect,0.1, 1000);
    
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 100
    // 将该向量与所传入的标量s进行相乘
    camera.position.multiplyScalar( 2 );
    camera.lookAt( 0, 0, 0 );
    camera.updateMatrixWorld();
  
    
  
  
    // 渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0xEEEEEE)
    renderer.setSize(clientW, clientH)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    
    root.appendChild(renderer.domElement)
    
    // random color
    function randomColor() {
      const r = Math.floor(THREE.MathUtils.randFloatSpread(255))
      const g = Math.floor(THREE.MathUtils.randFloatSpread(255))
      const b = Math.floor(THREE.MathUtils.randFloatSpread(255))
  
      return new THREE.Color(`rgb(${Math.abs(r)}, ${Math.abs(g)}, ${Math.abs(b)})`)
    }
    // box立方体
    let amount = 20;
    let altHex = null;
    for(let x = 0; x < amount; x++) {
      for(let y = 0; y < amount; y++) {
        const boxGeometry = new THREE.BoxGeometry(10,10,10)
        const r = Math.floor(THREE.MathUtils.randFloatSpread(255))
        const g = Math.floor(THREE.MathUtils.randFloatSpread(255))
        const b = Math.floor(THREE.MathUtils.randFloatSpread(255))
  
        const boxMaterial = new THREE.MeshBasicMaterial({ color: randomColor()})
        const box = new THREE.Mesh(boxGeometry, boxMaterial)
        box.position.set(r,g,b)
        scene.add(box)
        altHex = new THREE.Color(`rgb(${Math.abs(r)}, ${Math.abs(g)}, ${Math.abs(b)})`).getHex()
      }
    }
    // 光线投射
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
  
  
    // 鼠标事件
    function onDocumentMouseMove( event ) {
  
      event.preventDefault();
  
      mouse.x = ( event.clientX / clientW ) * 2 - 1;
      mouse.y = - ( event.clientY / clientH ) * 2 + 1;
  
    }
    document.addEventListener( 'mousemove', onDocumentMouseMove );
  
    // 控制器
    const orbitControls = new OrbitControls(camera, renderer.domElement)
  
    render()
    function render() {
      requestAnimationFrame(render)
      animate()
    }
  
    let delta = 0, radius = 100;
    let INTERSECTED
    
    function animate() {
      delta += 0.1
      // 旋转相机，rotation不起作用
      camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(delta))
      camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(delta))
      camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(delta))
  
  
      // 通过摄像机和鼠标位置更新射线
      raycaster.setFromCamera( mouse, camera );
      const intersects = raycaster.intersectObjects(scene.children, false)
      // console.log('intersects', intersects)
      if(intersects.length > 0) {
        // console.log('intersects', intersects)
        const targetDistance = intersects[0].distance;
        if ( INTERSECTED != intersects[ 0 ].object ) {
          if(intersects[0].object) {
            intersects[0].object.material.color.set(0xff0000)
            INTERSECTED = intersects[0].object
            altHex = INTERSECTED.material.color.getHex()
          }
        }
  
      } else {
        if(INTERSECTED) INTERSECTED.material.color.set(randomColor().getHex())
        INTERSECTED = null
      }
  
      orbitControls.update()
      renderer.render(scene, camera)
    }
  
  
  
    
  
  
  }
  onMounted(() => nextTick(init))
  </script>
<style scoped>
#container {
  width: 100%;
  height: calc(100% - 60px);
}
</style>  
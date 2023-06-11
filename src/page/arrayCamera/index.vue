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
    let AMOUNT = 6, cameras:any[] = [], aspect = window.devicePixelRatio;
    let width = clientW / AMOUNT,
        height = clientH / AMOUNT;
  
    for(let x = 0; x < AMOUNT; x++) {
      for(let y = 0; y < AMOUNT; y++) {
        const camera = new THREE.PerspectiveCamera(45,aspect,0.1, 10);
        camera.viewport = new THREE.Vector4(Math.floor(x * width), Math.floor(y * height), Math.ceil(width), Math.ceil(height))
        
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 1.5
        // 将该向量与所传入的标量s进行相乘
        camera.position.multiplyScalar( 2 );
        camera.lookAt( 0, 0, 0 );
        camera.updateMatrixWorld();
        console.log('camera.position', camera.position)
        cameras.push(camera)
      }
    }
  
    let camera = new THREE.ArrayCamera(cameras)
  
    // 渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(clientW, clientH)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    
    root.appendChild(renderer.domElement)
    
    // 圆柱体
    const cylinderGeometry = new THREE.CylinderGeometry(0.5,0.5,1,32)
    const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
    cylinder.receiveShadow = true
    cylinder.castShadow = true;
    scene.add(cylinder)
  
    // 平面背景
    const planeBackground = new THREE.Mesh(new THREE.PlaneGeometry(100,100), new THREE.MeshPhongMaterial({ color: 0x000066 }));
    planeBackground.receiveShadow = true;
    planeBackground.position.set(0.5,0.5,-1)
    scene.add(planeBackground)
  
    // 平行光
    const directionalLight = new THREE.DirectionalLight();
    directionalLight.position.set(0.5,0.5,1)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.zoom = 4;
    scene.add(directionalLight)
  
  
    render()
    function render() {
      requestAnimationFrame(render)
      animate()
    }
  
    function animate() {
      cylinder.rotation.x += 0.005;
          cylinder.rotation.z += 0.01;
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
<template>
    <div id="container"></div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, nextTick } from 'vue'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
  import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

  
  const init = () => {
    let wrap = document.querySelector('#container') as HTMLDivElement;
    let renderer = new THREE.WebGLRenderer()

    const clientW = wrap.clientWidth, clientH = wrap.clientHeight;

    renderer.setSize(clientW, clientH)
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
  
  
  }
  onMounted(() => nextTick(init))
  </script>
<style scoped>
#container {
  width: 100%;
  height: calc(100% - 60px);
}
</style>  
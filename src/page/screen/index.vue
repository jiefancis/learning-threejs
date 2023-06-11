<template>
    <div id="container"></div>
</template>
  
<script lang="ts" setup>
import { onMounted, nextTick } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  
 const init = () => {
    const ele = document.getElementById('container') as HTMLElement
    const clientW = ele.clientWidth, clientH = ele.clientHeight;

    const scene = new THREE.Scene({ color: 0xEEEEEE})
    // scene.background = new THREE.Color(0xEEEEEE)
    // scene.setSize(window.innerWidth, window.innerHeight)
  
    const frustumSize = 600
    let SCREEN_WIDTH = clientW;
              let SCREEN_HEIGHT = clientH;
              let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    const cameraOrtho = new THREE.OrthographicCamera( 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 150, 1000 );
  
      const cameraOrthoHelper = new THREE.CameraHelper( cameraOrtho );
      scene.add( cameraOrthoHelper );
  
    const camera = new THREE.PerspectiveCamera( 50, 0.5 * aspect, 150, 10000 )
    camera.position.z = 2500
    scene.add(camera)
  
    const camera2 = new THREE.PerspectiveCamera(45, 0.5 * aspect, 1, 100000)
    camera2.rotation.y = Math.PI;
    camera2.position.set(-100, 100,100)
    
  
    const cameraRig = new THREE.Group();
  
                  cameraRig.add( camera );
          cameraRig.add( camera2 );
                  cameraRig.add( cameraOrtho );
  
                  scene.add( cameraRig );
  
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor(new THREE.Color(0xEEEEEE))
    renderer.setSize(clientW, clientH)
    renderer.autoClear = false;
  
  
    
    ele.appendChild(renderer.domElement)
  
    // 平面
    const planeGeometry = new THREE.PlaneGeometry(60, 20)
    const planematerial = new THREE.MeshBasicMaterial({ color: 0x000000})
    const plane = new THREE.Mesh(planeGeometry, planematerial)
    plane.rotation.x = -0.5 * Math.PI
    scene.add(plane)
   
    // 球体
    const geometry = new THREE.SphereGeometry( 10 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
    material.transparent = true
    material.opacity = 0.5
    const sphere = new THREE.Mesh( geometry, material );
    camera.lookAt(sphere.position)
    scene.add( sphere );
    cameraRig.add(sphere)
  
    // OrbitControls
    const orbitControls = new OrbitControls( camera, renderer.domElement );
    const orbitControls2 = new OrbitControls( camera2, renderer.domElement );
  
    // ==============
    const geometry1 = new THREE.BufferGeometry();
    const vertices = [];
  
    for ( let i = 0; i < 10000; i ++ ) {
  
      vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // x
      vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // y
      vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // z
  
    }
  
    geometry1.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
  
    const particles = new THREE.Points( geometry1, new THREE.PointsMaterial( { color: 0x888888 } ) );
    scene.add( particles );
  
    console.log(geometry1, 'vertices', particles)
  
  
    // ===============renderer.setViewport分屏  renderer.autoClear = false;===================
      let width = clientW, height = clientH;
      // renderer.setViewport(0,0,width/2, height)
      // renderer.render(scene,camera)
  
      // const camera2 = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
      // camera2.position.set(-10, 20,20)
      // camera2.lookAt(sphere.position)
      // renderer.setViewport(width/2, 0, width/2, height)
      // renderer.render(scene, camera2)
  
      camera2.lookAt(sphere.position)
    // ==================================
  
    let step = 0
    function render() {
      requestAnimationFrame(render)
      step += 0.02
      sphere.position.x = 10 + Math.cos(step) * 10
      sphere.position.y = 3 + Math.abs(Math.sin(step)) * 5
      
      renderer.setViewport(0,0,width/2, height)
      renderer.render(scene,camera)
      
  
      renderer.setViewport(width/2, 0, width/2, height)
      renderer.render(scene, camera2)
      // camera2.updateProjectionMatrix();
      
      orbitControls.update()
      orbitControls2.update()
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
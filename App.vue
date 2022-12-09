
<template>
  <div id="three"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

/*
  动画教程
  1. 加载3d模型
  2. 获取模型中的animations数据
  3. 创建AnimationMixer(model) 混合器
  4. 设置动画参数、决定哪些动作可以激活
  5. render中调用mixer.update(new THREE.Clock().getDelta()) 实时更新动画
  cost loader = new THREE.xxxLoader()
  loader.load(modelUrl, (gltf) => { // 这里以gltf格式为例
    let model = gltf.scene
    let animations = gltf.animations // 模型的动画数据

    一般默认会支持 idle run walk
    let baseActionMap = {
      idle: { weight: 0},
      run: { weight: 0},
      walk: { weight: 1},
    }

    animations.forEach(action => {
      if(baseActionMap[action.name]) {
        mixer.clipAction(action)
        action.enabled = true
        action.setEffectiveTimeScale(1) // 数值越大，运动速度越快
        action.setEffectiveWeight(1 / 0) // 决定这个动作是动还是暂停
        action.play() // 激活动作
      }
    })

  })

  2. 创建一个动画播放器
  let mixer = new THREE.AnimationMixer(model: 需要动起来的3d模型)
  
*/
function init() {

  const scene = new THREE.Scene();

  const axis = new THREE.AxesHelper(10)
  scene.add(axis)

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.x = -20;
  camera.position.y = 5;
  camera.position.z = 5;
  camera.lookAt(scene.position);
  // camera.lookAt(scene.position)
  // camera.lookAt(new THREE.Vector3(0,0,0))
  // 平面
  const planeGeometry = new THREE.PlaneGeometry(60, 20,1,1)
  // const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x049ef4})
  const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.receiveShadow = true
  plane.rotation.x = -0.5 * Math.PI
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane)

  // camera.lookAt(plane.position)

  // 球体
  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
  const sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
  // const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff});
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.position.x = 20;
  sphere.position.y = 2;
  sphere.position.z = 0;
  sphere.castShadow = true
  scene.add(sphere)

  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff)
  // scene.add(ambientLight)

  // 聚光灯
  // const spotLight = new THREE.SpotLight(0xffff00,1);
  const light = new THREE.DirectionalLight(0xffffff)
  light.position.set(-30, 30, 0);
  light.castShadow = true

  // 光照颜色从天空光线颜色渐变到地面光线颜色
  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffff00 );
				hemiLight.position.set( 0, 20, 0 );
				// scene.add( hemiLight );

  const helper = new THREE.DirectionalLightHelper( light );
  scene.add( helper );

  light.shadow.mapSize.width = 1024; // default
  light.shadow.mapSize.height = 1024; // default

  // 设置阴影
  light.shadow.camera.top = 20
  light.shadow.camera.bottom = -20
  // light.shadow.camera.left = 
  light.shadow.camera.near = 1; // default
  light.shadow.camera.far = 1000; // default

  // light.distance = 0;
  // light.intensity = 0.5;
  // light.shadowMapHeight = 1024;
  // light.shadowMapWidth = 1024;
  scene.add(light)
  // const spotLightHelper = new THREE.SpotLightHelper( spotLight );
  // scene.add( spotLightHelper );

  const renderer = new THREE.WebGLRenderer()
  // renderer.setClearColor();
  renderer.setClearColor(new THREE.Color(0xEEEEEE));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true
  const wrapper = document.querySelector('#three') as HTMLDivElement;
  wrapper.appendChild(renderer.domElement)

  // 3d车模型
  
  function loadObjModel(url, scene) {
    return new Promise((resolve, reject) => {
      const objLoader = new OBJLoader()
      let objModel = null;
      objLoader.load(url, (obj) => {
        objModel = obj
        obj.castShadow = true
        obj.children.forEach(mesh => {
          // mesh.material.color = '#ffffff'
          if(mesh.name === 'car_body_Circle.073_MAIN') {
            // mesh.material.map = new THREE.TextureLoader().load('/img/car_body.webp')
            mesh.material.color = new THREE.Color(0x000000)
          }
          if(mesh.name === 'wheel_fl_Circle.067_MAIN') {
            mesh.material = new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load('/img/car_body.webp')})
            // mesh.material.map = new THREE.TextureLoader().load('/img/car_body.webp')
          }
          // 左侧门
          if(mesh.name === 'door_l_Circle.072_MAIN') {
            console.log('左侧门', mesh)
            mesh.material.color = new THREE.Color( 0xff0000 );
          }
          // 车轮
          if(mesh.name.startsWith('wheel_')) {
            mesh.material.color = new THREE.Color(0x3f51b5)
          }
        })
        scene.add(obj)
        console.log(scene, 'obj成功', obj)
        resolve(obj)
      }, (xhr) => {
          console.log('obj进度', xhr)
      }, (err) => {
          console.log('obj失败', err)
      })
    })
    
    return objModel || {}
  }
  // loadObjModel('/obj/free_car_001.obj', scene).then(objModel => {
  //   objModel.position.set(-2, 0,0)
  // })
  
  
  // loadObjModel('/obj/Sol_Woodsman_4WD.obj', scene).then(objModel => {
  //   objModel.position.set(-12, 0, 0 )
  //   // objModel.children.forEach(mesh => {
  //   //   // console.log('车', mesh, mesh.name)
  //   //   // mesh.material.color = new THREE.Color( 0x000000 )
  //   //   if(mesh.name === 'Body_Cube') {
  //   //     mesh.material.color = new THREE.Color( 0xff3300 )
  //   //   } else {
  //   //     mesh.material.map = new THREE.TextureLoader().load('/img/car_body.webp')
  //   //   }
      
  //   //   // if(mesh.name.indexOf('_Cube') !== -1) {
  //   //   // if(mesh.name === 'Leaf_Bolt_thing_Cube.028'){
  //   //   //   mesh.material.color = new THREE.Color( 0xffff00 )
  //   //   // }
  //   // })
  //   // var material = new THREE.PointCloudMaterial({
  //   // var material = new THREE.PointsMaterial({
  //   //   color: 0xffff00,
  //   //   size: 0.4,
  //   //   opacity: 0.6,
  //   //   transparent: true,
  //   //   blending: THREE.AdditiveBlending
  //   // });

  //   // let pointCloud = new THREE.Points(objModel, material);
  //   // pointCloud.sortParticles = true;

  //   // tween.start();
  //   // scene.add(pointCloud);
  // })
  

  // 加载军人模型 动画
  new GLTFLoader()
  const gltfLoader = new GLTFLoader()
  let mixer: any = null
  gltfLoader.load('/models/Soldier.glb', (gltf) => {
    console.log('军人模型', gltf)
    const model = gltf.scene
    const animations = gltf.animations
    model.position.set(-5, 0, 0)
    model.rotation.y = 0.5 * Math.PI

    // 阴影
    model.traverse(function(object) {
      if(object.isMesh) {
        object.castShadow = true
      }
    })
    
    // 动画混合器
    mixer = new THREE.AnimationMixer(model) as any
    let idleAction = mixer.clipAction(animations[0])
    let runAction = mixer.clipAction(animations[1])
    let walkAction = mixer.clipAction(animations[3])
    let actions = [idleAction, walkAction, runAction]

    actions.forEach((action,idx) => {
      action.enabled = true
      action.setEffectiveTimeScale( 1 );
			action.setEffectiveWeight( idx === 1 ? 1 : 0 );
      action.play() 
    })
    // mixer.timeScale = 
    scene.add(model)
    render()
  })

  const controls = new OrbitControls(camera, renderer.domElement);
  let step = 0;
  let clock = new THREE.Clock();
  function render() {
      step += 0.02;
      sphere.position.x = 10 + Math.cos(step) * 10
      sphere.position.y = 2 + Math.abs(Math.sin(step)) * 5
      // sphere.position.y = 2 + Math.sin(step) * 5
      
      mixer && mixer.update(clock.getDelta())
      controls.update()
      requestAnimationFrame(render)
      renderer.render(scene, camera);
  }
  
}
window.onload = init
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

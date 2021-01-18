//THREEJS RELATED VARIABLES
let scene,scene1,renderer,camera,camera1,texture,cube,rock,plane,road,collision
var clock = new THREE.Clock();
var keyboard = new THREEx.KeyboardState();


//3D MODELS
let panel;
window.onload = function init() {
    createScene();
    createGround();
    createGround1();
    createRoad();
    createRoad1();
    createCar();
    createCar1();
    createRock();
    onWindowResize();


 
    animate();
} 


//FUNÇÃO QUE CRIA AS DUAS CENAS
function createScene(){
    scene = new THREE.Scene();
    scene1= new THREE.Scene();
    scene.background = new THREE.Color( 0xBCD48F );
    scene1.background = new THREE.Color( 0x8FBCD4 );

    camera = new THREE.PerspectiveCamera( 45,(window.innerWidth/2)/ (window.innerHeight), 1, 2000 );
    camera.position.set(-0.5,0,0)
    camera1 = new THREE.PerspectiveCamera( 35, window.innerWidth/ window.innerHeight, 0.1, 100 );
    camera1.position.z = 6;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setScissorTest( true );

    

    document.getElementById('world').appendChild(renderer.domElement);
} 


//FUNÇÃO QUE RE AJUSTA AS CENAS
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


document.addEventListener("keydown", onDocumentKeyDown, false);


//CRIAÇÃO DA RELVA
function createGround() {
    const geometry = new THREE.PlaneBufferGeometry( 1000, 1000);
    let tex = new THREE.TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/4/4c/Grass_Texture.png")
tex.anisotropy = 32
tex.repeat.set(100, 100) //REPETE A TEXTURA A CADA BLOCO DE 100X100 PXS
tex.wrapT = THREE.RepeatWrapping
tex.wrapS = THREE.RepeatWrapping

    
const material = new THREE.MeshBasicMaterial( { map: tex })
     plane = new THREE.Mesh( geometry, material );
    plane.position.y=-1.6
    
    plane.rotation.set(Math.PI / -2, 0, 0)


scene.add( plane );
}


//
function createGround1() {
    const geometry = new THREE.PlaneBufferGeometry( 1000, 1000);
    let tex = new THREE.TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/4/4c/Grass_Texture.png")
tex.anisotropy = 32
tex.repeat.set(100, 100)
tex.wrapT = THREE.RepeatWrapping
tex.wrapS = THREE.RepeatWrapping

    
const material = new THREE.MeshBasicMaterial( { map: tex })
    const plane1 = new THREE.Mesh( geometry, material );
    plane1.position.y=-1.6
    
    plane1.rotation.set(-Math.PI * 0.5, 0, 0)


scene1.add( plane1 );
}


//CRIAÇÃO DA ESTRADA
function createRoad(){
    const geometry = new THREE.PlaneGeometry( 4, 1000)
    let tex = new THREE.TextureLoader().load("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp3OYZMCOIwkI91YS_xz5njgnaPyaVnw8bow&usqp=CAU")
    tex.anisotropy = 32
tex.repeat.set(2, 1000)
tex.wrapT = THREE.RepeatWrapping
tex.wrapS = THREE.RepeatWrapping
    const material = new THREE.MeshBasicMaterial( { map:tex })
     road = new THREE.Mesh(geometry,material)
    road.position.set(-1,-1.5,0)
    road.rotation.set(-Math.PI * 0.5, 0, 0)

    
    
    
    
    scene.add(road)
}


//
function createRoad1(){
    const geometry = new THREE.PlaneGeometry( 2, 1000)
    let tex = new THREE.TextureLoader().load("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp3OYZMCOIwkI91YS_xz5njgnaPyaVnw8bow&usqp=CAU")
    tex.anisotropy = 32
tex.repeat.set(1, 1000)
tex.wrapT = THREE.RepeatWrapping
tex.wrapS = THREE.RepeatWrapping
    const material = new THREE.MeshBasicMaterial( { map:tex })
    const road1 = new THREE.Mesh(geometry,material)
    road1.position.set(-2,-1,0)
    road1.rotation.set(Math.PI / -2, 0, 0)

    
    
    
    
    scene1.add(road1)
}


//CRIAÇÃO DO CARRO
function createCar(){
    let mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('archive\1377 Car.mtl', function (materials) {
    materials.preload();
    let loader = new THREE.OBJLoader();
    loader.setMaterials(materials);
    loader.load('archive\1377 Car.obj', function (object) {
    scene.add(object); });})
}


//CRIAÇÃO
function createCar1(){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
 cube = new THREE.Mesh( geometry, material );
scene.add( cube );
}


//CRIAÇÃO DE OBSTÁCULOS
function createRock(){

    
   const geometry = new THREE.SphereGeometry( 0.5, 5, 5);
        let tex = new THREE.TextureLoader().load("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ce49d94a-caca-45f6-b5dc-f2e742b1a409/d531x8m-220d1d0e-ec01-4bea-82cd-73456bc41c5b.jpg/v1/fill/w_1024,h_768,q_75,strp/rock_texture_by_roskvape_d531x8m-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD03NjgiLCJwYXRoIjoiXC9mXC9jZTQ5ZDk0YS1jYWNhLTQ1ZjYtYjVkYy1mMmU3NDJiMWE0MDlcL2Q1MzF4OG0tMjIwZDFkMGUtZWMwMS00YmVhLTgyY2QtNzM0NTZiYzQxYzViLmpwZyIsIndpZHRoIjoiPD0xMDI0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.IDXqoVdNqYsKtildrmhB1LrRhhCPG7H-312J8aYnWhg")
        const material = new THREE.MeshBasicMaterial( {map: tex} );
         rock = new THREE.Mesh( geometry, material );
        rock.position.set(Math.random()*-2,0,cube.position.z-25)
        scene.add( rock )
}


//CONTROLOS
function onDocumentKeyDown(event) {
    var Speed = 0.2;	
	// local transformations
    // move left/right
	if ( keyboard.pressed("A") )
		 cube.translateX( -Speed );
	if ( keyboard.pressed("D") )
		cube.translateX(  Speed );	
}


//FUNÇÃO DE ANIMAÇÃO
function animate() {
    // render
    renderer.setViewport(0, 0, window.innerWidth/2, window.innerHeight)
    renderer.setScissor( 0, 0, window.innerWidth/2, window.innerHeight );
				renderer.render( scene, camera );

                renderer.setViewport(window.innerWidth/2, 0, window.innerWidth, window.innerHeight)
				renderer.setScissor( window.innerWidth/2, 0, window.innerWidth, window.innerHeight );
                renderer.render( scene1, camera1 );
                // camera TO object relative offset
let relativeOffset = new THREE.Vector3(0,2 ,5 );
// updates the offset with the object’s global transformation matrix
let cameraOffset = relativeOffset.applyMatrix4(cube.matrixWorld);
// updates the camera position with the new offset
camera.position.x = cameraOffset.x;
	camera.position.y = cameraOffset.y;
	camera.position.z = cameraOffset.z;
// camera looks at the object’s position
camera.lookAt(cube.position);
uptadePlane()
checkCollisions()


    requestAnimationFrame(animate);
}


//RANDOMLY PLACES ROCKS
function uptadePlane(){
    if(collision==true){
    
    }else{
    
   
    cube.translateZ(-0.1)
    if(cube.position.z+5<rock.position.z){
        rock.geometry.dispose();
        rock.material.dispose();
        scene.remove( rock );
        createRock()
    }
    if(cube.position.z<-350){
        rock.geometry.dispose();
        rock.material.dispose();
        scene.remove( rock );
                createRock()
        cube.position.set(0,0,0)
        rock.geometry.dispose();
        rock.material.dispose();
        scene.remove( rock );
                createRock()
    }
}
}


//CHECK COLLISION ENTRE CARRO E ROCKS
function checkCollisions(){
    let cubeBox = new THREE.Box3().setFromObject(cube);
   
      let obstBox = new THREE.Box3().setFromObject(rock);
       collision = cubeBox.intersectsBox(obstBox)
      if(collision){
        console.log("hit");
        return true
      
    }
    return false
  }


//CHECK W PRECISION COLLISIONS
function checkCollisions2(){
  let vertices = []
  
    cube.updateMatrixWorld();
    cube.traverse(function (child){
      if(child instanceof THREE.Mesh){
        let len = child.geometry.vertices.length
        for (let i = 0; i < len; i++) {
          let v = child.geometry.vertices[i].clone()
  
          v.applyMatrix4(child.matrixWorld)
          
          vertices.push(v)
        }
      }
    })
  
    for (let i = 0; i < walls.length; i++) {
      let wallBox = new THREE.Box3().setFromObject(walls[i])
      for (let j = 0; j < vertices.length; j++) {
        let collision = wallBox.containsPoint(vertices[j])
        if(collision){
          console.log("Hit");
          return true
        }
        
      }
      
    }
    return false}
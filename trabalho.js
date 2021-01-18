<<<<<<< HEAD


//THREEJS RELATED VARIABLES
let scene,scene1,renderer,camera,camera1,texture,cube
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



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
// movement - please calibrate these values
var xSpeed = 0.2;
var ySpeed = 0.2;

document.addEventListener("keydown", onDocumentKeyDown, false);


function createGround() {
    const geometry = new THREE.PlaneBufferGeometry( 1000, 1000);
    let tex = new THREE.TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/4/4c/Grass_Texture.png")
tex.anisotropy = 32
tex.repeat.set(100, 100)
tex.wrapT = THREE.RepeatWrapping
tex.wrapS = THREE.RepeatWrapping

    
const material = new THREE.MeshBasicMaterial( { map: tex })
    const plane = new THREE.Mesh( geometry, material );
    plane.position.y=-1.6
    
    plane.rotation.set(Math.PI / -2, 0, 0)


scene.add( plane );

}
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
function createRoad(){
    const geometry = new THREE.PlaneGeometry( 4, 1000)
    let tex = new THREE.TextureLoader().load("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp3OYZMCOIwkI91YS_xz5njgnaPyaVnw8bow&usqp=CAU")
    tex.anisotropy = 32
tex.repeat.set(2, 1000)
tex.wrapT = THREE.RepeatWrapping
tex.wrapS = THREE.RepeatWrapping
    const material = new THREE.MeshBasicMaterial( { map:tex })
    const road = new THREE.Mesh(geometry,material)
    road.position.set(-1,-1.5,0)
    road.rotation.set(-Math.PI * 0.5, 0, 0)

    
    
    
    
    scene.add(road)
}
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
function createCar(){
    let mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('archive\1377 Car.mtl', function (materials) {
    materials.preload();
    let loader = new THREE.OBJLoader();
    loader.setMaterials(materials);
    loader.load('archive\1377 Car.obj', function (object) {
    scene.add(object); });})
}
function createCar1(){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
 cube = new THREE.Mesh( geometry, material );
scene.add( cube );
}
function createRock(){

    const geometry = new THREE.SphereGeometry( 0.5, 3, 3);
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    const rock = new THREE.Mesh( geometry, material );
    scene.add( rock );

}

function onDocumentKeyDown(event) {
    var delta = clock.getDelta(); // seconds.
	var moveDistance = 2 * delta; // 200 pixels per second
	var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
	
	// local transformations

	// move forwards/backwards/left/right
	if ( keyboard.pressed("W") )
		  cube.translateZ( -moveDistance );
	if ( keyboard.pressed("S") )
		cube.translateZ(  moveDistance );
	if ( keyboard.pressed("A") )
		 cube.translateX( -moveDistance );
	if ( keyboard.pressed("D") )
		cube.translateX(  moveDistance );	

	
	
    animate();
};


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

    requestAnimationFrame(animate);
}


=======


//THREEJS RELATED VARIABLES
let scene,scene1,renderer,camera,camera1,texture,cube


//3D MODELS
let panel;
window.onload = function init() {
    createScene();
    createGround();
    createGround1();
    createRoad();
    createRoad1();
    createCar();
    onWindowResize();


 
    animate();
} 



function createScene(){
    scene = new THREE.Scene();
    scene1= new THREE.Scene();
    scene.background = new THREE.Color( 0xBCD48F );
    scene1.background = new THREE.Color( 0x8FBCD4 );

    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.z = 6;
    camera1 = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera1.position.z = 6;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setScissorTest( true );

    

    document.getElementById('world').appendChild(renderer.domElement);


    
} 



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function createGround() {
    const geometry = new THREE.PlaneBufferGeometry( 1000, 1000);
    let tex = new THREE.TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/4/4c/Grass_Texture.png")
tex.anisotropy = 32
tex.repeat.set(100, 100)
tex.wrapT = THREE.RepeatWrapping
tex.wrapS = THREE.RepeatWrapping

    
const material = new THREE.MeshBasicMaterial( { map: tex })
    const plane = new THREE.Mesh( geometry, material );
    plane.position.y=-1.6
    
    plane.rotation.set(Math.PI / -2, 0, 0)


scene.add( plane );

}
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
    
    plane1.rotation.set(Math.PI / -2, 0, 0)


scene1.add( plane1 );

}
function createRoad(){
    const geometry = new THREE.PlaneGeometry( 2, 100)
    let tex = new THREE.TextureLoader().load("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp3OYZMCOIwkI91YS_xz5njgnaPyaVnw8bow&usqp=CAU")
    tex.anisotropy = 32
tex.repeat.set(1, 100)
tex.wrapT = THREE.RepeatWrapping
tex.wrapS = THREE.RepeatWrapping
    const material = new THREE.MeshBasicMaterial( { map:tex })
    const road = new THREE.Mesh(geometry,material)
    road.position.set(-2,-1,0)
    road.rotation.set(Math.PI / -2, 0, 0)

    
    
    
    
    scene.add(road)
}
function createRoad1(){
    const geometry = new THREE.PlaneGeometry( 2, 100)
    let tex = new THREE.TextureLoader().load("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp3OYZMCOIwkI91YS_xz5njgnaPyaVnw8bow&usqp=CAU")
    tex.anisotropy = 32
tex.repeat.set(1, 100)
tex.wrapT = THREE.RepeatWrapping
tex.wrapS = THREE.RepeatWrapping
    const material = new THREE.MeshBasicMaterial( { map:tex })
    const road1 = new THREE.Mesh(geometry,material)
    road1.position.set(-2,-1,0)
    road1.rotation.set(Math.PI / -2, 0, 0)

    
    
    
    
    scene1.add(road1)
}
function createCar(){
    const geometry = new THREE.BoxGeometry( 1, 0.5, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
 cube = new THREE.Mesh( geometry, material );
cube.position.set(-1.7,-0.5,2)
cube.rotation.set(Math.PI / -2, 0, 0)
scene.add( cube );
}

function animate() {
    // render
    renderer.setScissor( 0, 0, window.innerWidth/2, window.innerHeight );
				renderer.render( scene, camera );

				renderer.setScissor( window.innerWidth/2, 0, window.innerWidth, window.innerHeight );
                renderer.render( scene1, camera );
                // camera TO object relative offset
let relativeOffset = new THREE.Vector3(0,-2 ,0 );
// updates the offset with the object’s global transformation matrix
let cameraOffset = relativeOffset.applyMatrix4(cube.matrixWorld);
// updates the camera position with the new offset
camera.position.copy(cameraOffset);
// camera looks at the object’s position
camera.lookAt(cube.position);

    requestAnimationFrame(animate);
}


>>>>>>> 6a17e05f69e86a4e65ea048342c5f658f9ddc426

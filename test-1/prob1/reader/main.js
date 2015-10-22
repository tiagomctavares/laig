//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return vars;
}	 

serialInclude(['../lib/CGF.js', 
    'XMLscene.js', 'MySceneGraph.js', './interfaces/LightsInterface.js',
    './leaves/MyPrimitive.js', './leaves/MyQuad.js', 
    './leaves/MyCylinder.js', './leaves/MySphere.js', './leaves/MyTriangle.js',
	//LAIGPROB1_inicio
	'./leaves/MyCircumv.js',
	//LAIGPROB1_fim;
    './components/Parser.js', './components/BaseParserObject.js', './components/Initials.js', './components/Illumination.js', './components/Light.js', './components/Material.js',
    './components/Texture.js', './components/Leaf.js', './components/Node.js',

main=function()
{
	// Standard application, scene and interface setup
    var app = new CGFapplication(document.body);
    var myScene = new XMLscene();
    var lightsInterface = new LightsInterface();

    app.init();

    app.setScene(myScene);
    app.setInterface(lightsInterface);

    lightsInterface.setActiveCamera(myScene.camera);

	myScene.setInterface(lightsInterface);
	
	// get file name provided in URL, e.g. http://localhost/myproj/?file=myfile.xml 
	// or use "demo.xml" as default (assumes files in subfolder "scenes", check MySceneGraph constructor) 
	
	var filename=getUrlVars()['file'] || "campoBasket.lsx";

	// create and load graph, and associate it to scene. 
	// Check console for loading errors
	var myGraph = new MySceneGraph(filename, myScene);
	
	// start
    app.run();
}

]);
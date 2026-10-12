// Read shader source from the page so the GLSL remains inspectable and easy to edit.
const canvas=document.querySelector(".shader"),gl=canvas.getContext("webgl",{alpha:false,antialias:false,powerPreference:"low-power"}),reduced=matchMedia("(prefers-reduced-motion: reduce)");
if(!gl){canvas.remove();document.body.classList.add("fallback");}else{try{
function compile(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;}
const program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,document.querySelector("#vs").textContent));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,document.querySelector("#fs").textContent));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);
const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);const pos=gl.getAttribLocation(program,"a_position");gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
const res=gl.getUniformLocation(program,"u_resolution"),mouseLoc=gl.getUniformLocation(program,"u_mouse"),timeLoc=gl.getUniformLocation(program,"u_time");let mouse=[.72,.55],frame=0,start=performance.now();const dpr=Math.min(devicePixelRatio||1,1.5);
// Cap pixel density to 1.5x, and resize the drawing buffer only when dimensions change.
function resize(){const w=Math.round(innerWidth*dpr),h=Math.round(innerHeight*dpr);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}}
function draw(now){resize();gl.uniform2f(res,canvas.width,canvas.height);gl.uniform2f(mouseLoc,mouse[0],mouse[1]);gl.uniform1f(timeLoc,reduced.matches?0:(now-start)/1000);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);}
function tick(now){draw(now);if(!reduced.matches&&!document.hidden)frame=requestAnimationFrame(tick);}
function restart(){cancelAnimationFrame(frame);start=performance.now();draw(start);if(!reduced.matches&&!document.hidden)frame=requestAnimationFrame(tick);}
addEventListener("resize",()=>draw(performance.now()));addEventListener("pointermove",e=>{mouse=[e.clientX/innerWidth,1-e.clientY/innerHeight];if(reduced.matches)draw(performance.now());},{passive:true});document.addEventListener("visibilitychange",restart);reduced.addEventListener("change",restart);restart();
}catch(e){console.error("Shader setup failed:",e);canvas.remove();document.body.classList.add("fallback");}}

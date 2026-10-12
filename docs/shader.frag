precision mediump float;uniform vec2 u_resolution;uniform vec2 u_mouse;uniform float u_time;varying vec2 v_uv;
// Hash gives each pixel stable variation for the finishing grain.
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
// Aspect-correct coordinates keep the flowing bands round on wide screens.
vec2 uv=gl_FragCoord.xy/u_resolution;vec2 p=(uv-0.5)*vec2(u_resolution.x/u_resolution.y,1.0);vec2 mouse=(u_mouse-0.5)*vec2(u_resolution.x/u_resolution.y,1.0);float t=u_time*0.16;
// Two offset sine flows make slow, overlapping aurora ribbons.
float a=sin(p.x*2.2+p.y*1.3+t+sin(p.y*3.1-t)*0.7);float b=sin(p.x*1.4-p.y*2.0-t*0.8+cos(p.x*2.7+t)*0.5);float bands=(1.0-smoothstep(0.0,0.78,abs(p.y-a*0.20+0.10)));bands+=(1.0-smoothstep(0.0,0.62,abs(p.y-b*0.17-0.14)))*0.65;
// Cursor glow and broad halo gently pull the palette toward the pointer.
float cursor=exp(-length(p-mouse)*1.5);float halo=exp(-length(p-vec2(0.56,0.08))*1.35);vec3 color=vec3(0.025,0.035,0.078);color+=vec3(0.10,0.67,0.65)*bands*(0.22+0.12*sin(p.x*2.0+t));color+=vec3(0.43,0.30,0.82)*bands*0.28;color+=vec3(0.10,0.06,0.20)*halo;color+=vec3(0.12,0.29,0.36)*cursor*0.10;
// Dark left veil protects headline contrast; fine grain softens the gradient.
float veil=smoothstep(-0.15,0.78,p.x);color*=mix(0.58,1.0,veil);color+=(hash(gl_FragCoord.xy+floor(u_time*12.0))-0.5)*0.018;gl_FragColor=vec4(color,1.0);}

uniform float time;
uniform vec2 resolution;
uniform vec4 waves[50];

varying vec2 pos;

void main() {
	vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	pos = p.xy;
	gl_Position = p;
}
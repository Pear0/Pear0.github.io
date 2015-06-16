#define WAVE_NUMBER 50
#define PI 3.1415926535
#define ORIG_COLOR 0.15

uniform float time;
uniform vec2 resolution;
uniform vec4 waves[WAVE_NUMBER]; //x is s, y is y, z is radius, w is strength

varying vec2 pos;

float avg(float a, float b) {
	return (a + b) / 2.0;
}

void main() {
	vec2 position = gl_FragCoord.xy;
	float color = ORIG_COLOR;
	
	for (int i = 0; i < WAVE_NUMBER; i++) {
		if (waves[i].w > 0.02) {
			float raw = (waves[i].z - distance(position, waves[i].xy)) / 10.0;
			if (raw > 0.0 && raw <= 1.0) {
				float alpha = min(0.8, 10.0 * waves[i].w / pow(waves[i].z, 1.5));
				
				color += sin(raw * PI) * alpha;
				
			}
		}
	}
	
	
	vec3 triColor = vec3(color, color, color);
	if (position.x / resolution.x > 0.95)
		triColor.x = position.x / resolution.x;
	if (position.y / resolution.y > 0.95)
		triColor.y = position.y / resolution.y;
		
	// feed into our frag colour
	gl_FragColor = vec4(triColor, 1.0);

}
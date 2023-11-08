uniform vec3 topColor;
uniform vec3 bottomColor;
varying vec3 vWorldPosition;

void main() {
    float h = normalize( vWorldPosition).z;
    gl_FragColor = vec4( mix( bottomColor, topColor, max( h, 0.0 ) ), 1.0 );
}
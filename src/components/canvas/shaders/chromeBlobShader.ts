import * as THREE from "three";

export const ChromeBlobVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uNoiseFrequency;
  uniform float uNoiseAmplitude;
  uniform vec2 uMouse;
  uniform float uScroll;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec3 vEyeVector;
  varying float vDisplacement;

  // Simplex 3D Noise by Ian McEwan, Stefan Gustavson, Ashima Arts
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    // Permutations
    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  // mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    // Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix contributions
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  // Multi-octave fractional Brownian motion
  float fbm(vec3 p) {
    float total = 0.0;
    float amp = 1.0;
    float freq = uNoiseFrequency;
    for (int i = 0; i < 3; i++) {
      total += snoise(p * freq + vec3(uTime * 0.35)) * amp;
      freq *= 2.1;
      amp *= 0.45;
    }
    return total;
  }

  void main() {
    vPosition = position;

    // Mouse influence vector
    vec3 mouseInfluence = vec3(uMouse.x * 0.3, uMouse.y * 0.3, 0.0);
    vec3 samplePos = position + mouseInfluence;

    // Calculate displacement
    float noise = fbm(samplePos);
    float displacement = noise * uNoiseAmplitude * (1.0 + uScroll * 1.5);
    vDisplacement = displacement;

    // Displace vertex along original normal
    vec3 newPosition = position + normal * displacement;

    // Sample neighbors to reconstruct smooth normal
    float eps = 0.015;
    vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0) + vec3(0.001)));
    vec3 bitangent = normalize(cross(normal, tangent));

    vec3 p1 = (position + tangent * eps) + normal * fbm(samplePos + tangent * eps) * uNoiseAmplitude;
    vec3 p2 = (position + bitangent * eps) + normal * fbm(samplePos + bitangent * eps) * uNoiseAmplitude;

    vec3 displacedNormal = normalize(cross(p1 - newPosition, p2 - newPosition));

    // World & View calculations
    vec4 worldPos = modelMatrix * vec4(newPosition, 1.0);
    vWorldPosition = worldPos.xyz;
    vNormal = normalize(mat3(modelMatrix) * displacedNormal);
    vEyeVector = normalize(cameraPosition - worldPos.xyz);

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const ChromeBlobFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform vec3 uBaseColor;
  uniform vec3 uPurpleRim;
  uniform vec3 uPinkRim;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec3 vEyeVector;
  varying float vDisplacement;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 eye = normalize(vEyeVector);

    // Fresnel reflection
    float fresnel = pow(1.0 - max(dot(eye, normal), 0.0), 2.8);
    float deepFresnel = pow(1.0 - max(dot(eye, normal), 0.0), 5.0);

    // Liquid chrome reflection vector
    vec3 reflected = reflect(-eye, normal);

    // Procedural pseudo-HDRI environment reflection
    float envLightY = reflected.y * 0.5 + 0.5; // 0 (down) to 1 (up)
    
    // Core chrome gradient: deep obsidian black, liquid mercury silver, crisp white horizon
    vec3 chromeDark = vec3(0.03, 0.03, 0.05);
    vec3 chromeMid = vec3(0.55, 0.56, 0.62);
    vec3 chromeHighlight = vec3(0.98, 0.98, 1.0);

    // Curved chrome bands simulating high-end studio reflections
    float band = sin(reflected.y * 7.0 + reflected.x * 3.0 + uTime * 0.2) * 0.5 + 0.5;
    band = pow(band, 4.0);

    vec3 chrome = mix(chromeDark, chromeMid, smoothstep(0.1, 0.6, envLightY));
    chrome = mix(chrome, chromeHighlight, band * 0.7);

    // Specular light sources
    vec3 lightDir1 = normalize(vec3(1.5, 2.0, 1.2));
    vec3 lightDir2 = normalize(vec3(-2.0, -1.0, 0.8));
    
    float diff1 = max(dot(normal, lightDir1), 0.0);
    float spec1 = pow(max(dot(reflected, lightDir1), 0.0), 32.0);
    float spec2 = pow(max(dot(reflected, lightDir2), 0.0), 48.0);

    // Purple & Pink accent rim glow (#8B5CF6 to #EC4899)
    float rimAngle = dot(normal, vec3(1.0, 0.5, 0.0));
    vec3 rimColor = mix(uPurpleRim, uPinkRim, sin(rimAngle * 2.0 + uTime * 0.5) * 0.5 + 0.5);

    // Combine layers: Chrome base + Specular highlights + Radiant colored rim + Fresnel
    vec3 finalColor = chrome;
    finalColor += spec1 * vec3(1.0, 0.95, 1.0) * 1.5;
    finalColor += spec2 * uPinkRim * 1.2;
    finalColor += rimColor * fresnel * 2.2;
    finalColor += uPurpleRim * deepFresnel * 1.8;

    // Extra subtle interior chromatic glow based on displacement
    finalColor += mix(uPurpleRim, uPinkRim, vDisplacement * 2.0 + 0.5) * 0.15;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function createChromeBlobMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: ChromeBlobVertexShader,
    fragmentShader: ChromeBlobFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uNoiseFrequency: { value: 0.65 },
      uNoiseAmplitude: { value: 0.35 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uBaseColor: { value: new THREE.Color("#0d0d12") },
      uPurpleRim: { value: new THREE.Color("#8B5CF6") },
      uPinkRim: { value: new THREE.Color("#EC4899") },
    },
    wireframe: false,
  });
}

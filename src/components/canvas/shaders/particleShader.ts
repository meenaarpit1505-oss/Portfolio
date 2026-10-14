import * as THREE from "three";

export const ParticleVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform vec3 uColorPurple;
  uniform vec3 uColorPink;
  uniform vec3 uColorCore;

  attribute vec3 aDirection;
  attribute float aSpeed;
  attribute float aSize;
  attribute float aOffset;
  attribute float aColorMix;

  varying float vAlpha;
  varying vec3 vColor;

  // Simplex 3D Noise by Ian McEwan, Stefan Gustavson, Ashima Arts
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // Curl noise approximation for realistic fluid particle tendrils
  vec3 curlNoise(vec3 p) {
    float eps = 0.1;
    float n1 = snoise(p + vec3(0.0, eps, 0.0));
    float n2 = snoise(p - vec3(0.0, eps, 0.0));
    float n3 = snoise(p + vec3(0.0, 0.0, eps));
    float n4 = snoise(p - vec3(0.0, 0.0, eps));
    float n5 = snoise(p + vec3(eps, 0.0, 0.0));
    float n6 = snoise(p - vec3(eps, 0.0, 0.0));

    return vec3(
      (n1 - n2) - (n3 - n4),
      (n3 - n4) - (n5 - n6),
      (n5 - n6) - (n1 - n2)
    );
  }

  void main() {
    // Stage 1: Ambient breathing/shimmer when progress is near 0
    float ambientFloat = sin(uTime * 1.5 + aOffset * 6.28) * 0.06;
    vec3 initialPos = position + aDirection * ambientFloat;

    // Stage 2: Non-linear explosive blast progression
    // Smooth buildup -> rapid outward burst -> galactic dissipation
    float burstEased = pow(smoothstep(0.08, 0.85, uProgress), 1.35);
    float burstDist = burstEased * (14.0 + aSpeed * 12.0);

    // Compute curl turbulence
    vec3 curl = curlNoise(position * 0.7 + vec3(uTime * 0.35 + aOffset * 2.0));
    vec3 turbulentOffset = curl * (burstEased * 4.8);

    // Subtle cursor vortex influence
    vec3 mouseVec = vec3(uMouse.x * 2.0, uMouse.y * 2.0, 0.0);
    float mouseDist = length(initialPos - mouseVec);
    vec3 mousePush = normalize(initialPos - mouseVec + vec3(0.001)) * (0.8 / max(mouseDist, 0.5));

    // Combine into final 3D world trajectory
    vec3 displaced = initialPos + (aDirection * burstDist) + turbulentOffset + (mousePush * burstEased * 0.6);

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);

    // Distance attenuation for perspective points
    float distToCam = -mvPosition.z;
    float baseSize = aSize * (1.0 + burstEased * 0.8);
    float pSize = baseSize * (260.0 / max(distToCam, 0.1)) * uPixelRatio;
    
    // Clamp size for safety
    gl_PointSize = clamp(pSize, 1.0, 48.0);
    gl_Position = projectionMatrix * mvPosition;

    // Dynamic color gradient: blend between deep violet, neon pink, and radiant white
    vec3 color = mix(uColorPurple, uColorPink, aColorMix);
    // Core particles shine with hot white-pink highlight
    if (aColorMix > 0.75) {
      color = mix(color, uColorCore, (aColorMix - 0.75) * 4.0);
    }
    vColor = color;

    // Alpha lifecycle:
    // 0.00 -> 0.12: faint shimmer around the blob
    // 0.12 -> 0.75: explosive brilliance (1.0)
    // 0.75 -> 1.00: graceful cosmic fade-out
    float fadeIn = smoothstep(0.0, 0.18, uProgress);
    float fadeOut = 1.0 - smoothstep(0.72, 1.0, uProgress);
    float twinkle = 0.85 + 0.15 * sin(uTime * 4.0 + aOffset * 20.0);

    vAlpha = fadeIn * fadeOut * twinkle;
  }
`;

export const ParticleFragmentShader = /* glsl */ `
  precision highp float;

  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    // Convert square point into smooth circular particle
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);

    if (dist > 0.5) {
      discard;
    }

    // Soft outer glow falloff
    float glow = pow(1.0 - dist * 2.0, 2.2);

    // Intensely luminous core for bloom triggering
    float core = exp(-dist * 9.0);

    // Emissive boost: values > 1.0 activate post-processing Bloom threshold
    vec3 luminousColor = vColor * (glow * 1.6 + 0.4) + vec3(1.0) * core * 1.4;

    float finalAlpha = vAlpha * (glow * 0.85 + core * 0.15);

    gl_FragColor = vec4(luminousColor * finalAlpha, finalAlpha);
  }
`;

export function createParticleMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: ParticleVertexShader,
    fragmentShader: ParticleFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uPixelRatio: { value: 1.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorPurple: { value: new THREE.Color("#8B5CF6") },
      uColorPink: { value: new THREE.Color("#EC4899") },
      uColorCore: { value: new THREE.Color("#FFFFFF") },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: true,
  });
}

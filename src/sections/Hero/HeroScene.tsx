import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Particles() {
  const mesh = useRef<THREE.Points>(null)
  const count = 1200
  const mouseRef = useRef({ x: 0, y: 0 })

  const [positions, velocities, sizes, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16

      vel[i * 3] = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001

      sz[i] = Math.random() * 3 + 0.5

      const t = Math.random()
      col[i * 3] = 0 + t * 0          // R: 0 -> 0
      col[i * 3 + 1] = 0.4 + t * 0.24 // G: 0.4 -> 0.64
      col[i * 3 + 2] = 0.57 + t * 0.43 // B: 0.57 -> 1.0  (#005792 -> #00a3ff)
    }
    return [pos, vel, sz, col]
  }, [])

  const { size } = useThree()

  const handlePointerMove = useCallback((e: { clientX: number; clientY: number }) => {
    mouseRef.current.x = (e.clientX / size.width - 0.5) * 2
    mouseRef.current.y = -(e.clientY / size.height - 0.5) * 2
  }, [size])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const geo = mesh.current.geometry
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array
    const t = clock.elapsedTime

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3] + Math.sin(t * 0.3 + i) * 0.001
      arr[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(t * 0.2 + i) * 0.001
      arr[i * 3 + 2] += velocities[i * 3 + 2]

      // Wrap around
      for (let j = 0; j < 3; j++) {
        const bound = j === 2 ? 8 : 12
        if (arr[i * 3 + j] > bound) arr[i * 3 + j] = -bound
        if (arr[i * 3 + j] < -bound) arr[i * 3 + j] = bound
      }
    }

    posAttr.needsUpdate = true

    // Subtle mouse follow
    mesh.current.rotation.y = mouseRef.current.x * 0.05 + t * 0.02
    mesh.current.rotation.x = mouseRef.current.y * 0.03 + Math.sin(t * 0.1) * 0.05
  })

  return (
    <points ref={mesh} onPointerMove={handlePointerMove as never}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function GlowRing({ position, args, speed, axis }: {
  position: [number, number, number]
  args: [number, number, number, number]
  speed: number
  axis: 'x' | 'y' | 'z'
}) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.elapsedTime * speed
    mesh.current.rotation[axis] = t
    if (axis === 'x') {
      mesh.current.rotation.z = t * 0.6
      mesh.current.position.y = Math.sin(t * 0.4) * 0.5
    } else {
      mesh.current.rotation.x = t * 0.7
      mesh.current.position.y = Math.cos(t * 0.3) * 0.4
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <torusGeometry args={args} />
      <meshBasicMaterial color="#00a3ff" transparent opacity={0.12} side={THREE.DoubleSide} />
    </mesh>
  )
}

function CenterGlow() {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const scale = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.15
    mesh.current.scale.setScalar(scale)
  })

  return (
    <mesh ref={mesh} position={[0, 0, -5]}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshBasicMaterial color="#005792" transparent opacity={0.04} />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <Particles />
        <GlowRing position={[3, 0, -3]} args={[2, 0.015, 16, 100]} speed={0.15} axis="x" />
        <GlowRing position={[-3.5, 0.5, -4]} args={[2.5, 0.012, 16, 100]} speed={0.1} axis="y" />
        <GlowRing position={[0, -1, -6]} args={[3.5, 0.008, 16, 120]} speed={0.06} axis="x" />
        <CenterGlow />
      </Canvas>
    </div>
  )
}

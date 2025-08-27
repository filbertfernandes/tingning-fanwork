import { useGLTF, useTexture } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'
import { Hitbox } from './Hitbox'

const World = () => {
  const { scene } = useGLTF('/models/world.glb')
  const titleObject = useGLTF('/models/title.glb')
  const bakedTexture = useTexture('/images/Texture.webp')

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;
  bakedTexture.minFilter = THREE.LinearFilter;
  bakedTexture.magFilter = THREE.LinearFilter;

  const texture = new THREE.MeshBasicMaterial({ map: bakedTexture });

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = texture
      }
    });
  }, [scene, texture]);

  return (
    <>
      <primitive object={scene} />
      <primitive object={titleObject.scene} />
      <Hitbox />
    </>
  )
}

export default World

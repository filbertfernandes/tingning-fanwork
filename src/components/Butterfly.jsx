import { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import * as THREE from 'three';

export default function Butterfly({
    min = [0, 1, -5], // xyz
    max = [-5, 3, 5], // xyz
    speed = 1.5
}) {
    const gltf = useGLTF('/models/butterfly.glb');
    const { actions } = useAnimations(gltf.animations, gltf.scene);
    const modelRef = useRef();
    const [target, setTarget] = useState([0, 0, 0]);

    const getRandomTarget = () => {
        return [
            Math.random() * (max[0] - min[0]) + min[0],
            Math.random() * (max[1] - min[1]) + min[1],
            Math.random() * (max[2] - min[2]) + min[2]
        ];
    }

    useEffect(() => {
        setTarget(getRandomTarget());
    }, []);

    useEffect(() => {
        const action = actions['KeyAction.001'];
        if (action) {
            action.reset().fadeIn(0.2).play();
            action.timeScale = 2;
        }
    }, [actions]);

    useFrame((_, delta) => {
        if (!modelRef.current) return;
        const pos = modelRef.current.position;
        const [tx, ty, tz] = target;
        // Move towards target
        const dx = tx - pos.x;
        const dy = ty - pos.y;
        const dz = tz - pos.z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        // Smooth rotation
        if (dist > 0.001) {
            const targetY = Math.atan2(dx, dz);
            let currentY = modelRef.current.rotation.y;
            let deltaY = targetY - currentY;
            if (deltaY > Math.PI) deltaY -= Math.PI * 2;
            if (deltaY < -Math.PI) deltaY += Math.PI * 2;
            const lerpFactor = 0.1;
            modelRef.current.rotation.y = currentY + deltaY * lerpFactor;
        }
        if (dist < 0.05) {
            setTarget(getRandomTarget());
        } else {
            const step = Math.min(speed * delta, dist);
            pos.x += (dx / dist) * step;
            pos.y += (dy / dist) * step;
            pos.z += (dz / dist) * step;
        }
    });

    const bakedTexture = useTexture('/images/Texture.webp')
    
    bakedTexture.flipY = false;
    bakedTexture.colorSpace = THREE.SRGBColorSpace;
    bakedTexture.minFilter = THREE.LinearFilter;
    bakedTexture.magFilter = THREE.LinearFilter;

    const texture = new THREE.MeshBasicMaterial({ map: bakedTexture });

    useEffect(() => {
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = texture
            }
        });
    }, [gltf.scene, texture]);

    return <primitive object={gltf.scene} ref={modelRef} />;
}

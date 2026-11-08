// Copied from the Djoda site repo (Scout-NU/djoda, my-app/src/components/3dvis.js).
// Changes from the original, nothing else:
//  - the model loads from the portfolio's S3 bucket instead of /spine/
//  - the stylesheet is scoped under .djoda-spine so its class names don't
//    collide with the portfolio's (see 3dvis.css)
//  - the root element carries the .djoda-spine class
//  - the canvas clears to transparent so the section sits on the page's cream
// 3D model: "Spine" by Ruth Lilly Medical Library, IU School of Medicine,
// CC-BY-NC-SA-4.0 (credited on the case study page).
import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import './3dvis.css';
import { getAssetPath } from '../../../utils/assetUtils';

const SPINE_MODEL = getAssetPath('/pictures/portfolio-content_spring2026/03_CODE/djoda/spine/scene.gltf');

const RotatingModel = ({ setClickedPart }) => {
  const { scene } = useGLTF(SPINE_MODEL);
  const modelRef = useRef();
  const lastClickedRef = useRef(null); 
  const highlightedRefs = useRef([]); 

  // Function to apply highlight
  const applyHighlight = (object) => {
    if (!object.userData.originalMaterial) {
      object.userData.originalMaterial = object.material;
      object.material = object.material.clone();
    }
    object.material.emissive = new THREE.Color('#ecf170'); 
    object.material.emissiveIntensity = 1;
    object.material.transparent = true;
    object.material.opacity = 0.8;
  };

  const revertHighlight = (object) => {
    if (object.userData.originalMaterial) {
      object.material = object.userData.originalMaterial;
      delete object.userData.originalMaterial;
    }
  };

  // Function to highlight all objects with the same name
  const highlightMatchingObjects = (name) => {
    highlightedRefs.current.forEach(obj => revertHighlight(obj));
    highlightedRefs.current = [];
    
    scene.traverse((object) => {
      if (object.isMesh && object.material.name === name && object.material.name !== 'lambert3') {
        applyHighlight(object);
        highlightedRefs.current.push(object);
      }
    });
  };

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });


// BUG: sometimes clicking off a section of the spine or reclicking the same component
// just leaves empty divs with the boxes and no text; can you ensure it's always saying the 
// "Click on a part of the spine to learn more!" text on default?
  
  const handleClick = (event) => {
    event.stopPropagation();
    const clickedObject = event.object;
    const clickedName = clickedObject.material.name;
    //console.log(clickedName); used this to check handleClick

    // If clicking on the same part, unhighlight
    if (lastClickedRef.current === clickedName) {
      // Revert the highlight and reset lastClickedRef
      highlightedRefs.current.forEach(obj => revertHighlight(obj));
      highlightedRefs.current = [];
      setClickedPart(null);  
      lastClickedRef.current = null; 
    } else {
      highlightMatchingObjects(clickedName);
      setClickedPart(clickedName);
      lastClickedRef.current = clickedName;  
    }
  };

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={0.2}
      position={[0, -50, 0]}
      onClick={handleClick}
    />
  );
};

// EDIT: CHANGE COPY HERE! - Name of spine section
const partNameToDisplay = {
  "lambert6": "Cervical Spine (C1-C7)",
  "lambert5": "Thoracic Spine (T1-T12)",
  "lambert4": "Lumbar Spine (L1-L5)",
  "lambert2": "Sacrum (S1-S5)"
};

// EDIT: CHANGE COPY HERE! - Short TLDR of what the section does
const partCaptionToDisplay = {
  "lambert6": "Supports head, enables neck movement",
  "lambert5": "Stabilizes torso, protects vital organs",
  "lambert4": "Supports weight, allows bending and lifting",
  "lambert2": "Connects spine to pelvis for stability"
};

// EDIT: CHANGE COPY HERE! - More in-depth explanation of each section
const partDescToDisplay = {
  "lambert6": "The cervical spine is the uppermost part of the spine, made up of seven small vertebrae (C1-C7). It supports the weight of the head and allows for a wide range of neck motion, including turning, tilting, and nodding. The top two vertebrae, called the atlas and axis, are especially important for rotation. The cervical spine also protects the upper part of the spinal cord and nerves that connect to the brain. We use this region constantly — when we look around, check our phones, or drive. Keeping good posture and stretching the neck helps prevent strain or discomfort here.",
  "lambert5": "The thoracic spine consists of twelve vertebrae (T1-T12) located in the mid-back. Each thoracic vertebra connects to a rib, forming the ribcage that protects the heart and lungs. While the thoracic spine has less flexibility than other sections, it provides important stability and helps maintain upright posture. It allows for limited twisting and bending of the upper body. We use the thoracic spine during breathing, torso rotation, and lifting our arms. Sitting for long periods or poor posture can lead to stiffness here, so mobility exercises and stretches are important for keeping this part of the spine healthy.",
  "lambert4": "The lumbar spine is the lower back section of the spine, made up of five large vertebrae (L1-L5). It bears much of the body’s weight and allows for movements like bending, twisting, and lifting. The lumbar spine is highly active during walking, standing, and almost all physical activities. Because it supports so much pressure, this area is prone to injuries like muscle strain or disc problems. Core strength is especially important to protect the lumbar spine. Proper lifting techniques and exercises like planks, squats, and stretching can help prevent lower back pain and maintain long-term spinal health.",
  "lambert2": "The sacrum is a triangular bone at the base of the spine, formed by five fused vertebrae (S1-S5). It connects the lumbar spine to the pelvis and helps support the weight of the upper body when standing or sitting. The sacrum also forms part of the sacroiliac joints, which provide stability to the hips and lower body. This region is used most during activities like walking, running, or climbing stairs. A strong core, glutes, and hip muscles are important to support the sacrum. Keeping this area healthy helps prevent lower back or hip pain and improves overall body balance."
};


// Main 3D visualization component
const ThreeDVis = () => {
  const [clickedPart, setClickedPart] = useState(null); // State to store the clicked part

  return (
    <div className="djoda-spine" style={{ display: "flex" }}>
      {/* Side panel for displaying the clicked text */}
      <div className="sidePanel">
        {/* EDIT: CHANGE COPY HERE! - Name of side panel */}
        <h1>
          General Spine Anatomy
        </h1>
        <div className="blueLine"></div>

        <br></br><br></br>
        {clickedPart && partNameToDisplay[clickedPart] ? (
           <div>
              <div className="spinePartTitle">
                <h2>{partNameToDisplay[clickedPart] || partNameToDisplay.default}</h2>
                <h3>{partCaptionToDisplay[clickedPart] || partCaptionToDisplay.default}</h3>
              </div>
              <p>{partDescToDisplay[clickedPart] || partDescToDisplay.default}</p>
          </div>
          // EDIT: CHANGE COPY HERE!
              ) : <h6>Click on a part of the spine to learn more!
                <br></br>
                Click and drag or scroll to move around the spine.</h6>}
      </div>

      {/* 3d model */}
      <Canvas
        style={{ 
          width: "50vw",
          height: "100vh"
        }}
        camera={{
          position: [0, 0, 200], // Adjust these values to change initial zoom
          fov: 50, // Field of view (smaller number = less perspective distortion)
          near: 0.1,
          far: 1000
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#1b1b1b'), 0); // transparent on the portfolio page
        }}
      >
        {/* Ambient light for softer lighting */}
        <ambientLight intensity={0.5} />

        {/* Directional light shining from the top */}
        <directionalLight
          position={[0, 5, 0]} // Positioned above the scene
          intensity={1} // Adjust intensity as needed
          castShadow // Enable shadows
        />

        {/* Model with rotation */}
        <RotatingModel setClickedPart={setClickedPart} />

        {/* Controls for rotating the scene */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ThreeDVis;
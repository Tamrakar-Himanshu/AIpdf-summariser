"use client";

import React, { useRef, useState, Suspense } from "react";
import z from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, UploadCloud, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import * as THREE from "three";
import confetti from "canvas-confetti";

// three/fiber + drei + postprocessing~
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Float, OrbitControls, Stars, shaderMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Glitch } from "@react-three/postprocessing";
import { generatePdfSummary } from "@/actions/generatePdfSummary";
import { generateSummaryFromGemeni } from "@/lib/gemeni";

/* =========================================
   Validation
========================================= */
const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "File must be a PDF",
    }),
});

/* =========================================
   Cyber Grid Shader (status-reactive)
========================================= */
const GridMaterial = shaderMaterial(
  { time: 0, statusColor: new THREE.Color("#00f0ff") },
  // vertex
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment
  `
    uniform float time;
    uniform vec3 statusColor;
    varying vec2 vUv;

    // subtle scanlines
    float scan(vec2 uv) {
      return 0.5 + 0.5 * sin((uv.y + time*0.4) * 120.0);
    }

    void main() {
      // neon grid
      float gx = step(0.02, abs(sin(vUv.x * 40.0 + time*3.0)));
      float gy = step(0.02, abs(sin(vUv.y * 40.0 + time*3.0)));
      float grid = (1.0 - gx) * (1.0 - gy);

      // pulse wave
      float pulse = 0.15 * (sin(time*6.0 + vUv.y*25.0) * 0.5 + 0.5);

      vec3 base = mix(vec3(0.02,0.02,0.06), statusColor, grid);
      base += pulse * statusColor;

      // scanline overlay
      base += 0.06 * scan(vUv) * statusColor;

      gl_FragColor = vec4(base, 1.0);
    }
  `
);
extend({ GridMaterial });

/* =========================================
   Cyber Grid Background
========================================= */
function CyberGrid({ status }: { status: Status }) {
  const mat = useRef<any>(null);
  useFrame(({ clock }) => {
    if (mat.current) mat.current.time = clock.getElapsedTime();
  });

  const colorMap: Record<Status, string> = {
    idle: "#3b82f6",
    drag: "#06b6d4",
    uploading: "#facc15",
    success: "#22c55e",
    error: "#ef4444",
  };

  return (
    <mesh scale={[8, 8, 1]} position={[0, 0, -2]}>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore – injected by shaderMaterial/extend */}
      <gridMaterial ref={mat} statusColor={new THREE.Color(colorMap[status])} />
    </mesh>
  );
}

/* =========================================
   CRAZY Cyber Mech Character
   - head + visor + chest + wings + orbiting drones
   - energy beam while uploading
========================================= */
type Status = "idle" | "drag" | "uploading" | "success" | "error";

function CrazyCyberRobot({ status }: { status: Status }) {
  const group = useRef<THREE.Group>(null!);
  const haloLeft = useRef<THREE.Mesh>(null!);
  const haloRight = useRef<THREE.Mesh>(null!);
  const drones = useRef<THREE.Mesh[]>([]);
  const chest = useRef<THREE.Mesh>(null!);

  const colors: Record<Status, string> = {
    idle: "#00f0ff",
    drag: "#06b6d4",
    uploading: "#facc15",
    success: "#22ff88",
    error: "#ff0044",
  };
  const c = colors[status];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (group.current) {
      // float & breathe
      group.current.position.y = Math.sin(t * 1.2) * 0.22;
      group.current.rotation.y = Math.sin(t * 0.35) * 0.35;
      if (status === "error") {
        // subtle shake
        group.current.position.x = Math.sin(t * 25) * 0.05;
      } else {
        group.current.position.x = THREE.MathUtils.damp(
          group.current.position.x,
          0,
          4,
          0.1
        );
      }
    }

    // orbiting drones
    drones.current.forEach((drone, i) => {
      const angle = t * 1.3 + (i * Math.PI * 2) / drones.current.length;
      const r = 1.8 + 0.15 * Math.sin(t * 2 + i);
      drone.position.set(
        Math.cos(angle) * r,
        0.3 * Math.sin(t * 3 + i),
        Math.sin(angle) * r
      );
      drone.rotation.y += 0.08;
      // drone pulse (stronger while uploading)
      const intensity = status === "uploading" ? 2.4 : 1.2;
      (drone.material as THREE.MeshStandardMaterial).emissiveIntensity =
        intensity + Math.sin(t * 8 + i) * 0.6;
    });

    // wings spin
    if (haloLeft.current) haloLeft.current.rotation.z = t * 0.8;
    if (haloRight.current) haloRight.current.rotation.z = -t * 0.8;

    // chest pulse on uploading
    if (chest.current) {
      const scale =
        status === "uploading"
          ? 1 + Math.sin(t * 9) * 0.25
          : 1 + Math.sin(t * 2) * 0.05;
      chest.current.scale.set(1, scale, 1);
    }
  });

  return (
    <Float floatIntensity={1.2} rotationIntensity={1.6}>
      <group ref={group}>
        {/* HEAD */}
        <mesh position={[0, 1.9, 0]}>
          <octahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial
            color={c}
            emissive={c}
            emissiveIntensity={1.3}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>

        {/* VISOR */}
        <mesh position={[0, 1.9, 0.65]}>
          <planeGeometry args={[0.95, 0.34]} />
          <meshStandardMaterial
            color="#000000"
            emissive={status === "error" ? "#ff0044" : "#00ffff"}
            emissiveIntensity={status === "error" ? 3.2 : 2}
          />
        </mesh>

        {/* CHEST / CORE */}
        <mesh ref={chest} position={[0, 0.6, 0]}>
          <boxGeometry args={[1.2, 1.6, 0.9]} />
          <meshStandardMaterial
            color={c}
            emissive={c}
            emissiveIntensity={0.9}
          />
        </mesh>

        {/* WINGS / HALOS */}
        <mesh
          ref={haloLeft}
          position={[2.1, 1, 0]}
          rotation={[0, 0, Math.PI / 6]}
        >
          <torusGeometry args={[1.2, 0.06, 12, 80, Math.PI]} />
          <meshStandardMaterial
            color={c}
            emissive={c}
            emissiveIntensity={status === "success" ? 3 : 1.1}
          />
        </mesh>
        <mesh
          ref={haloRight}
          position={[-2.1, 1, 0]}
          rotation={[0, Math.PI, -Math.PI / 6]}
        >
          <torusGeometry args={[1.2, 0.06, 12, 80, Math.PI]} />
          <meshStandardMaterial
            color={c}
            emissive={c}
            emissiveIntensity={status === "success" ? 3 : 1.1}
          />
        </mesh>

        {/* ORBITING DRONES */}
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) drones.current[i] = el;
            }}
          >
            <icosahedronGeometry args={[0.28, 0]} />
            <meshStandardMaterial
              color={c}
              emissive={c}
              emissiveIntensity={1.2}
              metalness={0.5}
            />
          </mesh>
        ))}

        {/* ENERGY BEAM ON UPLOADING */}
        {status === "uploading" && (
          <mesh position={[0, 3.1, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 4.2, 32]} />
            <meshStandardMaterial
              color="#ffffaa"
              emissive="#ffffaa"
              transparent
              opacity={0.55}
              emissiveIntensity={3.5}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}

/* =========================================
   Canvas Scene
========================================= */
function RobotScene({ status }: { status: Status }) {
  return (
    <Canvas camera={{ position: [-4, 0, 6], fov: 50 }}>
      <Suspense fallback={null}>
        <CrazyCyberRobot status={status} />
        <Stars
          radius={80}
          depth={40}
          count={1600}
          factor={3.5}
          fade
          speed={0.8}
        />
      </Suspense>

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} />

      <EffectComposer>
        <Bloom intensity={2} luminanceThreshold={0.2} />
      </EffectComposer>

      <OrbitControls enableZoom={false} enablePan={true} />
    </Canvas>
  );
}

/* =========================================
   UploadForm Component
========================================= */
const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { startUpload } = useUploadThing("pdfUploader");

  // file intake
  const handleFile = (file: File) => {
    const result = schema.safeParse({ file });
    if (!result.success) {
      setStatus("error");
      toast.error(result.error.format().file?._errors[0] ?? "Invalid File");
      return;
    }
    setSelectedFile(file);
    setStatus("idle");

    // keep input in sync
    if (inputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      inputRef.current.files = dt.files;
    }
  };

  // clear
  const clearFile = () => {
    setSelectedFile(null);
    setStatus("idle");
    if (inputRef.current) inputRef.current.value = "";
  };

  // submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      setStatus("error");
      toast.error("Please select a PDF file first.");
      return;
    }

    setStatus("uploading");
    const uploadPromise = startUpload([selectedFile]);

    toast.promise(uploadPromise, {
      loading: "⏳ Uploading...",
      success: "🎉 Uploaded successfully!",
      error: "❌ Upload failed",
    });

    const res = await uploadPromise;

    if (!res) {
      setStatus("error");
      toast.error("No files were uploaded");
      return;
    }

    setStatus("success");
    // neon confetti burst
    confetti({
      particleCount: 220,
      spread: 120,
      startVelocity: 35,
      scalar: 0.9,
      origin: { y: 0.6 },
      colors: ["#00f0ff", "#ff00ff", "#22ff88", "#facc15", "#ef4444"],
    });

    // auto-clear preview after a moment
    setTimeout(() => clearFile(), 2200);

    const summary = await generatePdfSummary(res);

    console.log("PDF Summary:", { summary });

  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      {/* Top-right Sonner toaster */}

      {/* Hero 3D scene */}
      <div className="w-full h-50 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl bg-black">
        <RobotScene status={status} />
      </div>

      {/* Upload zone */}
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="flex flex-col gap-4"
      >
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
            setStatus("drag");
          }}
          onDragLeave={() => {
            setDragActive(false);
            setStatus("idle");
          }}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFile(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-2xl p-10 cursor-pointer transition ${
            dragActive
              ? "border-cyan-400 bg-cyan-50/60"
              : "border-zinc-300 bg-zinc-50 hover:bg-zinc-100"
          }`}
        >
          <UploadCloud className="w-10 h-10 text-zinc-500" />
          <p className="text-zinc-700 text-sm">
            {selectedFile
              ? "File ready to upload"
              : "Drop PDF here or click to browse"}
          </p>
          <Input
            ref={inputRef}
            type="file"
            name="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50"
          disabled={!selectedFile || status === "uploading"}
        >
          {status === "uploading" ? "Uploading..." : "Upload PDF"}
        </button>
      </form>

      {/* File preview w/ remove */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            className="flex items-center justify-between bg-zinc-50 p-4 rounded-xl border border-zinc-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-300" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-900">
                  {selectedFile.name}
                </span>
                <span className="text-xs text-zinc-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
            </div>
            <Button
              type="button"
              onClick={clearFile}
              className="p-1 rounded-full bg-violet-300 hover:bg-zinc-200 transition"
            >
              <X className="w-5 h-5 text-zinc-600" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadForm;

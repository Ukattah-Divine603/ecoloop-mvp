import { useRef, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { usePoints } from "../context/PointsContext";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Upload,
  ScanSearch,
  Leaf,
  Award,
  Camera,
  Image as ImageIcon,
} from "lucide-react";
import { useHistory } from "../context/HistoryContext";
import { analyzeWasteImage } from "../services/gemini";
import { supabase } from "../lib/supabase";
import CameraCapture from "../components/CameraCapture";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };

    reader.onerror = reject;
  });

export default function Scan() {
  const { addPoints } = usePoints();
  const { addScan } = useHistory();
  const { user } = useAuth();

  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const analysisSteps = [
    "Uploading Image...",
    "Detecting Material...",
    "Checking Recyclability...",
    "Calculating Eco Points...",
    "Finalizing Analysis...",
  ];

  const processFile = async (file) => {
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setResult(null);
    setAnalysisComplete(false);
    setIsAnalyzing(true);
    setCurrentStep(0);

    try {
      // Fake AI progress animation
      for (let i = 0; i < analysisSteps.length; i++) {
        setCurrentStep(i);

        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      const base64Image = await fileToBase64(file);

      let aiResult;

      try {
        aiResult = await analyzeWasteImage(base64Image, file.type);
      } catch (error) {
        console.error("Gemini Error:", error);

        aiResult = {
          material: "Unknown Material",
          recyclable: "Unknown",
          category: "General Waste",
          decomposition: "Unknown",
          points: 1,
        };

        toast.error("AI temporarily unavailable. Using fallback analysis.");
      }

      setResult(aiResult);

      // Upload image to Supabase Storage
      let imageUrl = null;

      if (user) {
        const fileExt = file.name.split(".").pop();
        const filePath = `${user.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("scan-images")
          .upload(filePath, file);

        if (uploadError) {
          console.error("Image upload error:", uploadError);
        } else {
          const { data: publicUrlData } = supabase.storage
            .from("scan-images")
            .getPublicUrl(filePath);

          imageUrl = publicUrlData.publicUrl;
        }
      }

      await addPoints(aiResult.points);

      await addScan({
        material: aiResult.material,
        recyclable: aiResult.recyclable,
        category: aiResult.category,
        decomposition: aiResult.decomposition,
        points: aiResult.points,
        image_url: imageUrl,
      });

      setAnalysisComplete(true);

      toast.success(`+${aiResult.points} Eco Points Earned`);

      toast.success("Scan Saved Successfully");
    } catch (error) {
      console.error(error);

      toast.error("Analysis Failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const handleCameraCapture = (file) => {
    setShowCamera(false);
    processFile(file);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold">Scan Waste</h1>

          <p className="text-gray-400 mt-2">
            Snap a photo or upload an image and let EcoLoop identify it.
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* IMAGE */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="font-semibold text-2xl mb-6">Image Preview</h2>

            {!image ? (
              <div className="h-[500px] rounded-3xl border-2 border-dashed border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <Upload size={50} className="mx-auto text-gray-500" />

                  <p className="text-gray-500 mt-4">
                    Take a photo or upload an image
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={image}
                  alt="preview"
                  className="w-full h-[500px] object-cover"
                />

                {isAnalyzing && (
                  <>
                    <motion.div
                      animate={{
                        top: ["-15%", "100%", "-15%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute left-0 w-full h-24 bg-gradient-to-b from-emerald-500/40 via-emerald-500/10 to-transparent z-10"
                    />

                    <motion.div
                      animate={{
                        top: ["0%", "100%", "0%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute left-0 w-full h-1 bg-emerald-400 shadow-[0_0_20px_#4ade80] z-20"
                    />
                  </>
                )}

                {analysisComplete && (
                  <div className="absolute top-5 right-5 bg-emerald-500 text-black px-4 py-2 rounded-full font-semibold z-30">
                    Analysis Complete
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RESULTS */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-8">
              <ScanSearch className="text-emerald-400" />

              <h2 className="font-semibold text-2xl">AI Analysis</h2>
            </div>

            {!image && (
              <div className="h-[500px] flex items-center justify-center text-gray-500">
                Take a photo or upload an image to begin analysis
              </div>
            )}

            {isAnalyzing && (
              <div className="h-[500px] flex items-center justify-center">
                <div className="w-full max-w-md">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="w-16 h-16 mx-auto border-4 border-emerald-500/20 border-t-emerald-400 rounded-full"
                  />

                  <h3 className="text-center text-2xl font-semibold mt-8">
                    AI Processing
                  </h3>

                  <p className="text-center text-emerald-400 mt-3">
                    {analysisSteps[currentStep]}
                  </p>

                  <div className="mt-8 h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      animate={{
                        width: `${
                          ((currentStep + 1) / analysisSteps.length) * 100
                        }%`,
                      }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {analysisComplete && result && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="space-y-6"
              >
                <div className="flex justify-between">
                  <span className="text-gray-400">Material</span>

                  <span>{result.material}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Recyclable</span>

                  <span className="text-emerald-400">{result.recyclable}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>

                  <span>{result.category}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Decomposition Time</span>

                  <span>{result.decomposition}</span>
                </div>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: -5,
                  }}
                  className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Leaf className="text-emerald-400" />

                    <span>+{result.points} Eco Points Earned</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Award className="text-yellow-400" />

                    <span>Badge Progress Updated</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>

        {/* CAPTURE OPTIONS */}
        <div className="relative">
          <button
            onClick={() => setShowOptions((prev) => !prev)}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-emerald-500 text-black font-semibold cursor-pointer hover:bg-emerald-400 transition"
          >
            <Camera size={20} />
            Scan Waste Image
          </button>

          {showOptions && (
            <div className="absolute bottom-full mb-2 left-0 right-0 bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl z-20">
              <button
                onClick={() => {
                  setShowOptions(false);
                  setShowCamera(true);
                }}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-white/5 transition"
              >
                <Camera size={20} className="text-emerald-400" />
                Take Photo
              </button>

              <button
                onClick={() => {
                  setShowOptions(false);
                  fileInputRef.current?.click();
                }}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-white/5 transition border-t border-white/10"
              >
                <ImageIcon size={20} className="text-emerald-400" />
                Upload from Gallery
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </DashboardLayout>
  );
}

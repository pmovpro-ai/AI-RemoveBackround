"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Download, Upload, Loader2, Image as ImageIcon, Palette, AlertCircle } from "lucide-react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { HexColorPicker } from "react-colorful";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PRESET_COLORS = ["#FFFFFF", "#000000", "#3B82F6", "#EF4444", "#10B981", "#EAB308", "transparent"];

export default function BackgroundRemover({ dict }: { dict: any }) {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<string>("transparent");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    try {
      const imglyPkg = await import("@imgly/background-removal");
      // @ts-ignore
      const removeBackground = imglyPkg.removeBackground || imglyPkg.default;
      const imageUrl = URL.createObjectURL(file);
      setOriginalImage(imageUrl);
      
      const blob = await removeBackground(imageUrl, {
        progress: (key: string, current: number, total: number) => {
          // progress reporting
        }
      });
      const processedUrl = URL.createObjectURL(blob);
      setProcessedImage(processedUrl);
    } catch (err) {
      console.error(err);
      setError(dict.tool.error);
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      processImage(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  // Apply background color
  useEffect(() => {
    if (!processedImage || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (bgColor !== "transparent") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0);
    };
    img.src = processedImage;
  }, [processedImage, bgColor]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "removed-bg.png";
    a.click();
  };

  return (
    <div id="upload" className="w-full max-w-4xl mx-auto mt-12 bg-card rounded-2xl shadow-xl border overflow-hidden">
      <div className="p-8">
        {!originalImage && !isProcessing && (
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors flex flex-col items-center justify-center min-h-[300px]",
              isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
            )}
          >
            <input {...getInputProps()} />
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xl font-semibold mb-2">{dict.tool.dragDrop}</p>
            <p className="text-muted-foreground">{dict.tool.orClick}</p>
            <p className="text-sm text-muted-foreground mt-4">{dict.hero.supported}</p>
          </div>
        )}

        {isProcessing && (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <h3 className="text-xl font-semibold mb-2">{dict.tool.processing}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">{dict.tool.processingWarning}</p>
          </div>
        )}

        {error && !isProcessing && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex items-start gap-3 mb-6">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <p>{error}</p>
            <button onClick={() => setError(null)} className="ml-auto underline text-sm">Dismiss</button>
          </div>
        )}

        {processedImage && !isProcessing && (
          <div className="space-y-8">
            <div className="relative rounded-xl overflow-hidden border bg-muted/20" style={{ minHeight: '300px' }}>
              <ReactCompareSlider
                itemOne={<ReactCompareSliderImage src={originalImage!} alt={dict.tool.original} />}
                itemTwo={
                  <div className="w-full h-full relative" style={{ 
                    backgroundImage: bgColor === 'transparent' ? 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURbOzs/v7+8TExObm5pivQEEAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAwSURBVBjTYwABQxSBAQGBEUEQUKKAqMAIEmIEMQGBIQoIKjCACGIEAQUG4MEEBAwA1nIFuUvE1hAAAAAASUVORK5CYII=")' : 'none',
                    backgroundColor: bgColor !== 'transparent' ? bgColor : 'transparent'
                  }}>
                    <img src={processedImage} alt={dict.tool.removed} className="w-full h-full object-contain" />
                  </div>
                }
                className="w-full h-full object-contain max-h-[60vh]"
              />
            </div>

            {/* Hidden canvas for applying background color for download */}
            <canvas ref={canvasRef} className="hidden" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  {dict.tool.changeBg}
                </h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  {PRESET_COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => setBgColor(color)}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-transform hover:scale-110",
                        bgColor === color ? "border-primary" : "border-border"
                      )}
                      style={{
                        background: color === 'transparent' ? 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURbOzs/v7+8TExObm5pivQEEAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAwSURBVBjTYwABQxSBAQGBEUEQUKKAqMAIEmIEMQGBIQoIKjCACGIEAQUG4MEEBAwA1nIFuUvE1hAAAAAASUVORK5CYII=")' : color
                      }}
                      title={color}
                    />
                  ))}
                  <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="w-10 h-10 rounded-full border-2 border-border bg-gradient-to-tr from-red-500 via-green-500 to-blue-500 hover:scale-110 transition-transform"
                    title={dict.tool.customColor}
                  />
                </div>
                {showColorPicker && (
                  <div className="mt-4">
                    <HexColorPicker color={bgColor === 'transparent' ? '#ffffff' : bgColor} onChange={setBgColor} />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 px-6 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/25"
                >
                  <Download className="w-6 h-6" />
                  {dict.tool.download}
                </button>
                <button
                  onClick={() => {
                    setOriginalImage(null);
                    setProcessedImage(null);
                    setBgColor('transparent');
                  }}
                  className="w-full py-3 px-6 rounded-xl font-medium border hover:bg-muted transition-colors"
                >
                  Upload Another Image
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import BgGradient from "@/components/common/bg-gradient";
import { Badge } from "@/components/ui/badge";
import { UploadHeader } from "@/components/upload/upload-header";
import UploadForm from "@/components/upload/UploadForm";

import { Sparkle } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <section className=" w-full mb-20">
      <BgGradient />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
};

export default page;

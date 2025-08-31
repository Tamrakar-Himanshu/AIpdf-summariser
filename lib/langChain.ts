import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdf(url: string): Promise<string | null> {
  const res = await fetch(url);
  if (!res.ok) return null;

  const blob = await res.blob();
  const pdfBuffer = await blob.arrayBuffer();

  const loader = new PDFLoader(new Blob([pdfBuffer]));
  const docs = await loader.load();
  return docs.map((d) => d.pageContent).join("\n");
}

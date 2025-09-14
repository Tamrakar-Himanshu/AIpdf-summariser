import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async () => {
      const user = await currentUser();
      if (!user) throw new UploadThingError("UNAUTHORIZED");
      return { userID: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // ⚡ Keep this lightweight
      return {
        userID: metadata.userID,
        file: {
          url: file.ufsUrl, // ✅ correct property
          key: file.key, // ✅ also useful if you want to delete later
          name: file.name,
        },
      };
    }),
} satisfies FileRouter;

export type ourFileRouter = typeof ourFileRouter;

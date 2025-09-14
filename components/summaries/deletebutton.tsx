"use client";

import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { getDbconnection } from "@/lib/db";
import { deleteSummary } from "@/actions/summary_actions";
import { toast } from "sonner";
import { start } from "repl";

interface DeleteButtonProps {
  summaryID: string;
}

export const DeleteButton = ({ summaryID }: DeleteButtonProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteSummary(summaryID);
      if (!result.success) {
        toast.error("Failed to delete summary");
      } else {
        toast.success("Summary deleted successfully");
      }
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Floating trigger */}
      <DialogTrigger asChild>
        <Button
          className="w-9 h-9 flex items-center justify-center rounded-full 
          border border-gray-200/60 bg-white/80 backdrop-blur-sm 
          text-gray-500 shadow-sm hover:shadow-md hover:scale-105 
          hover:bg-rose-500 hover:text-white transition-all duration-200"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      {/* Dialog */}
      <DialogContent
        className="sm:max-w-[420px] p-6 rounded-2xl shadow-2xl 
        border border-gray-100 bg-white/95 backdrop-blur-md"
      >
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Delete Summary{" "}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 leading-relaxed">
            Are You Sure You Want To Delete This Summary? This Action Cannot Be
            Undone
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-center gap-3 pt-4">
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await handleDelete();
            }}
            variant={"destructive"}
            className="rounded-xl bg-green-500 hover:bg-rose-800 
            text-white font-medium shadow-sm hover:shadow-md 
            px-4 flex items-center gap-2 transition"
          >
            <Trash className="w-4 h-4" />
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

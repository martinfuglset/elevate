"use client";

import { useState } from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import AssessmentPageComponent from '@/app/assessment/AssessmentPageComponent';
import { AssessmentPageProps } from '@/types/assessment';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  testMode?: boolean;
  mockData?: AssessmentPageProps['mockData'];
  mockGeneratedProgram?: AssessmentPageProps['mockGeneratedProgram'];
  mockLibraryModules?: AssessmentPageProps['mockLibraryModules'];
}

export function AssessmentModal({
  isOpen,
  onClose,
  onComplete,
  testMode = false,
  mockData,
  mockGeneratedProgram,
  mockLibraryModules,
}: AssessmentModalProps) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-6xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-8 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-h-[95vh] overflow-y-auto">
          <div className="relative">
            <DialogPrimitive.Close className="absolute right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary z-10">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
            <AssessmentPageComponent
              testMode={testMode}
              mockData={mockData}
              mockGeneratedProgram={mockGeneratedProgram}
              mockLibraryModules={mockLibraryModules}
            />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
} 
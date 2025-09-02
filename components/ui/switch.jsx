"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-500",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        "w-12 h-6 rounded-full transition-colors",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-white block h-5 w-5 rounded-full shadow",
          "translate-x-0 data-[state=checked]:translate-x-6 transition-transform"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

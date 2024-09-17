import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { FC } from "react"; // Import React types

// Define backgroundVariants using cva
const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-emerald-100",
        success: "bg-emerald-100",
      },
      size: {
        default: "p-2",
        sm: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Define iconVariants using cva
const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-emerald-600",
      success: "text-emerald-700",
    },
    size: {
      default: "h-8 w-8",
      sm: "h-4 w-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

// Define the props types
type IconBadgeProps = {
  icon: FC<{ className?: string }>; // Icon as a React component with optional className prop
  variant?: "default" | "success"; // Limit to the variants you defined in cva
  size?: "default" | "sm"; // Limit to the sizes you defined in cva
};

// Define the IconBadge component with the proper types
export const IconBadge: FC<IconBadgeProps> = ({ icon: Icon, variant, size }) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
};

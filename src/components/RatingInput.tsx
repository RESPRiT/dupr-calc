import { Input } from "@/components/ui/input";
import type { ComponentProps } from "react";

type RatingInputProps = Omit<ComponentProps<"input">, "value"> & {
  value: string;
};

function RatingInput({ value, ...props }: RatingInputProps) {
  return (
    <Input
      className="max-w-40 min-h-21 h-[14vh] max-h-28 rounded-2xl border
        border-navy-900/20 valid:border-blue-800/75 shadow-none text-base
        font-normal text-center text-navy-900 placeholder:text-navy-900/20
        valid:focus-visible:ring-blue-500/75 transition-shadow duration-300
        ease-in-out"
      type="text"
      inputMode="decimal"
      pattern="[0-9]\.[0-9]{3}"
      required
      maxLength={5}
      value={value}
      {...props}
    />
  );
}

export default RatingInput;

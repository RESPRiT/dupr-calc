import { Input } from "@/components/ui/input";
import type { ComponentProps } from "react";

type RatingInputProps = Omit<ComponentProps<"input">, "value"> & {
  value: string;
};

function RatingInput({ value, ...props }: RatingInputProps) {
  return (
    <Input
      className="w-24 md:w-28 h-21 rounded-2xl border border-navy-900/20
        valid:border-navy-900/50 shadow-nonetext-[16px] md:text-base font-normal
        text-center text-navy-900 placeholder:text-navy-900/20
        valid:focus-visible:ring-blue-500 transition-shadow duration-400
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

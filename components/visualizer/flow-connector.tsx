import { ChevronRight } from "lucide-react";

interface FlowConnectorProps {
  active: boolean;
}

export function FlowConnector({ active }: FlowConnectorProps) {
  return (
    <div className="flex-1 flex items-center px-0.5 sm:px-2">
      <div
        className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
          active
            ? "bg-gradient-to-r from-flow-active-start to-flow-active-end"
            : "bg-flow-inactive"
        }`}
      />
      <ChevronRight
        className={`w-3 h-3 sm:w-4 sm:h-4 -ml-0.5 transition-colors duration-300 ${
          active ? "text-flow-arrow-active" : "text-flow-arrow-inactive"
        }`}
      />
    </div>
  );
}

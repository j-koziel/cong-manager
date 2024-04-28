import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DynamicMapView = dynamic(
  () => import("./map-view").then((mod) => mod.MapView),
  { ssr: false },
);

/**
 * A toggle which lets the user peek at the map of the selected location
 * @returns A popover component with the map and toggle button
 */
export function MapToggle() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Show Map</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw]">
        <DynamicMapView />
      </PopoverContent>
    </Popover>
  );
}

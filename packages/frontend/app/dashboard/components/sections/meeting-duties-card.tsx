import { CheckboxIcon } from "@radix-ui/react-icons";

import ItemCards from "../item-cards";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PlaceholderDashboardData } from "@/lib/types/placeholder-dashboard-data";

/**
 * A card which shows all the upcoming duties one may have at the meetings
 *
 * @todo
 *
 * @param props - The props object
 * @param props.data - Placeholder data
 * @returns
 */
const MeetingDutiesCard = ({
  data,
}: {
  data: PlaceholderDashboardData[] /* | DashData[] */;
}) => {
  return (
    <Card className="p-10">
      <CardContent className="flex flex-col items-center">
        <CheckboxIcon height={48} width={48} />
        <p className="font-bold text-center">Duties</p>
      </CardContent>
    </Card>
  );
};

// <CardHeader>
//         <CardTitle>Your Duties: </CardTitle>
//         <CardDescription>
//           These are your upcoming duties/assignments.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-72">
//           <ItemCards data={data} />
//           <ScrollBar />
//         </ScrollArea>
//       </CardContent>
//       <CardFooter></CardFooter>

export default MeetingDutiesCard;

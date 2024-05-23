import { CalendarIcon } from "@radix-ui/react-icons";

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
 * A card which shows congregation events like CO visits, assemblies and
 * conventions
 *
 * @todo
 *
 * @param props - The props object
 * @param props.data - Placeholder dashboard data
 * @returns
 */
const CongEventsCard = ({ data }: { data: PlaceholderDashboardData[] }) => {
  return (
    <Card className="p-10">
      <CardContent className="flex flex-col items-center">
        <CalendarIcon height={48} width={48} />
        <p className="font-bold text-center">Upcoming Events</p>
      </CardContent>
    </Card>
  );
};

// {/* <CardHeader>
//         <CardTitle>Congregation Events: </CardTitle>
//         <CardDescription>Upcoming congregation events.</CardDescription>
//       </CardHeader>
//       {/* CO visits, assemblies, conventions etc */}
//       <CardContent>
//         <ScrollArea className="h-72">
//           <ItemCards data={data} />
//           <ScrollBar />
//         </ScrollArea>
//       </CardContent>
//       <CardFooter></CardFooter> */}

export default CongEventsCard;

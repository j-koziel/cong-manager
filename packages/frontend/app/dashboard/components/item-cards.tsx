import { Separator } from "../../../components/ui/separator";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceholderDashboardData } from "@/lib/types/placeholder-dashboard-data";

/**
 * Takes some placeholder data and renders cards with the provided data
 *
 * @param props - The props object
 * @param props.data - For now this is just placeholder data
 * @returns A bunch of cards
 */
const ItemCards = ({ data }: { data: PlaceholderDashboardData[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {data.map((item: any, i: number) => {
        return (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <span>{item.content}</span>
              <Separator orientation="horizontal" />
              <span>{item.date}</span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ItemCards;

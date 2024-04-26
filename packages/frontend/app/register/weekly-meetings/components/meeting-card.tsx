"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";

import { Congregation } from "@/lib/types/models/congregation";

export interface MeetingCardProps {
  congregation: Congregation;
  isSelected: boolean;
  onSelect: () => void;
  animationDelay: number;
}

/**
 * A card which shows information about a congregation
 * 
 * @param props - The props object
 * @param props.congregation - The congregation object
 * @param props.isSelected - Whether a congregation is selected
 * @param props.onSelect - Accepts a callback which runs when a congregation is selected
 * @param props.animationDelay - The amount of milliseconds to delay the render animation of each card
 * @returns 
 */
export function MeetingCard({
  congregation,
  isSelected,
  onSelect,
  animationDelay,
}: MeetingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5, delay: animationDelay / 8 },
      }}
    >
      <Card className="p-2">
        <CardHeader>
          <p>{congregation.name}</p>
        </CardHeader>
        <CardBody>
          <small>{congregation.address}</small>
        </CardBody>
        <CardFooter>
          {congregation.phoneNumbers[0].phone}
          <Button
            variant="ghost"
            color={isSelected ? "success" : "default"}
            className="flex ml-auto"
            onClick={onSelect}
          >
            Select
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

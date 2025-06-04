"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import { fetchExpiringInventory } from "@/lib/fetchInventory";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface InventoryItem {
  inventory_id: number;
  quantity: number;
  expiration_date: string;
  ingredients: {
    ingredient_id: number;
    name: string;
    unit: string;
  };
}

interface ExpiryItem {
  name: string;
  daysLeft: number;
}

interface ExpiryData {
  [key: string]: {
    count: number;
    isWithinWeek: boolean;
    items: ExpiryItem[];
  };
}

export default function CalendarSection() {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [expiryDates, setExpiryDates] = useState<ExpiryData>({});

  useEffect(() => {
    const loadExpiryDates = async () => {
      try {
        const rawData = await fetchExpiringInventory();
        const data = rawData as unknown as InventoryItem[];
        const dates: ExpiryData = {};
        const today = new Date();
        const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

        data.forEach((item) => {
          const date = item.expiration_date.split('T')[0];
          const expiryDate = new Date(item.expiration_date);
          const diffTime = expiryDate.getTime() - today.getTime();
          const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const isWithinWeek = expiryDate.getTime() - today.getTime() <= oneWeek;

          if (!dates[date]) {
            dates[date] = { 
              count: 0, 
              isWithinWeek,
              items: []
            };
          }
          dates[date].count += 1;
          dates[date].items.push({
            name: item.ingredients.name,
            daysLeft
          });
        });

        setExpiryDates(dates);
      } catch (error) {
        console.error("Error loading expiry dates:", error);
      }
    };

    loadExpiryDates();
  }, []);

  const handleChange = (value: Value) => {
    setSelectedDate(value);
    if (value instanceof Date) {
      console.log("Selected Date:", value.toISOString().split("T")[0]);
    } else if (Array.isArray(value)) {
      const [start, end] = value;
      console.log("Selected Range:", start, end);
    }
  };

  const formatTooltipContent = (items: ExpiryItem[]) => {
    return items
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .map(item => `${item.name} (${item.daysLeft} days left)`)
      .join('\n');
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      if (expiryDates[dateStr]?.count) {
        return (
          <div className="tooltip-wrapper">
            <div className="expiring-items">
              {expiryDates[dateStr].count}
            </div>
            {expiryDates[dateStr].items.length > 0 && (
              <div className="tooltip">
                {formatTooltipContent(expiryDates[dateStr].items)}
              </div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const classes = [];

      if (expiryDates[dateStr]) {
        classes.push('expiring-date');
        if (expiryDates[dateStr].isWithinWeek) {
          classes.push('week-expiring');
        }
      }

      return classes.join(' ');
    }
    return '';
  };

  return (
    <div className="mb-6 flex flex-col items-center">
      <h2 className="text-xl text-black font-semibold mb-2">Select Date</h2>
      <div className="bg-white rounded-xl shadow p-4 w-fit calendar-container">
        <Calendar
          onChange={handleChange}
          value={selectedDate}
          className="custom-calendar"
          tileContent={tileContent}
          tileClassName={tileClassName}
        />
      </div>
    </div>
  );
}
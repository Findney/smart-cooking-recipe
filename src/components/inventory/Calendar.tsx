"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import { fetchExpiringInventory } from "@/lib/fetchInventory";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface ExpiryData {
  [key: string]: number;
}

export default function CalendarSection() {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [expiryDates, setExpiryDates] = useState<ExpiryData>({});

  useEffect(() => {
    const loadExpiryDates = async () => {
      try {
        const data = await fetchExpiringInventory();
        const dates: ExpiryData = {};

        data.forEach((item) => {
          const date = item.expiration_date.split('T')[0];
          dates[date] = (dates[date] || 0) + 1;
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

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      if (expiryDates[dateStr]) {
        return (
          <div className="expiring-items">
            {expiryDates[dateStr]}
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      if (expiryDates[dateStr]) {
        return 'expiring-date';
      }
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
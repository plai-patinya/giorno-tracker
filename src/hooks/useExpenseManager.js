import { useMemo, useState } from "react";
import {
  BIKE_BASE_PRICE
} from "../constants/appConstants";

  const useExpenseManager = (expensesInput = []) => {

    const expenses = Array.isArray(expensesInput)
        ? expensesInput
        : [];

  // 💰 ค่าใช้จ่ายรวม
  const totalExpense = useMemo(() => {
    return expenses?.reduce(
      (sum, item) => sum + Number(item.price || 0),
      0
    );
  }, [expenses]);

  // 🔧 ค่าแต่ง
  const partsExpense = useMemo(() => {
    return expenses
      ?.filter((item) => item.category !== "base")
      ?.reduce(
        (sum, item) => sum + Number(item.price || 0),
        0
      );
  }, [expenses]);

  // 📊 รวมตามหมวด
  const categoryTotals = useMemo(() => {

  const totals = {};

  expenses?.forEach((item) => {

    if (!totals[item.category]) {
      totals[item.category] = 0;
    }

    totals[item.category] += Number(item.price || 0);

  });

  return Object.entries(totals).map(([category, total]) => ({
    category,
    total
  }));

}, [expenses]);

  // 📅 รวมตามเดือน
  const monthlyData = useMemo(() => {

    const grouped = {};

    expenses?.forEach((item) => {

      const month = item.date?.slice(0, 7);

      if (!grouped[month]) {
        grouped[month] = [];
      }

      grouped[month].push(item);

    });

    return grouped;

  }, [expenses]);

  // 📈 Stats
  const stats = useMemo(() => {

  const totalItems = expenses?.length || 0;

  const totalExpenseWithBike =
  totalExpense + BIKE_BASE_PRICE;

  // 📅 เดือนทั้งหมด
  const uniqueMonths = new Set(
    expenses.map((item) =>
      item.date?.slice(0, 7)
    )
  );

  const totalMonths =
    uniqueMonths.size || 1;

  // 💰 เฉลี่ยต่อเดือน
  const avgPerMonth =
    partsExpense / totalMonths;

    const totalDays = Math.max(
  1,
  Math.floor(
    (
      new Date() -
      new Date(expenses[0]?.date || new Date())
    ) / (1000 * 60 * 60 * 24)
  )
);

const avgPerDay =
  totalExpenseWithBike / totalDays;

  return {
    totalItems,
    avgPerDay,
    totalExpense,
    partsExpense,

    totalExpenseWithBike,

    totalMonths,

    avgPerMonth
  };

}, [
  expenses,
  totalExpense,
  partsExpense
]);

  return {
    expenses,

    totalExpense,
    partsExpense,

    categoryTotals,
    monthlyData,

    stats
  };

};

export default useExpenseManager;
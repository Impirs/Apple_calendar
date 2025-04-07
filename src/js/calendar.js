import { createMonthTable } from "./calendarMonth.js";
import { createWeekTable } from "./calendarWeek.js";
import { createDayView } from "./calendarDay.js";

// Constants
export const monthName = {
    full: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    mmm: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ],
};
//name of the days
export const dayName = {
    full: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ],
    d: ["M", "T", "W", "T", "F", "S", "S"],
    dd: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    ddd: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    sss: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
};

// Draw calendar
function drawCalendar(options) {
    const defaults = {
        type: "month", // "month", "week", or "day"
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        date: new Date().getDate(),
        startWeekOnSunday: false, // New option
    };

    options = { ...defaults, ...options };
    const calendarData = getCalendar(options.year, options.month, options.date, options.startWeekOnSunday);

    const targetElement = document.querySelector(options.target);
    if (targetElement) {
        targetElement.innerHTML = "";
        let calendarHTML;
        if (options.type === "month") {
            calendarHTML = createMonthTable(calendarData, options.startWeekOnSunday);
        } else if (options.type === "week") {
            calendarHTML = createWeekTable(calendarData);
        } else if (options.type === "day") {
            calendarData.setSelectedDate = options.setSelectedDate;
            calendarHTML = createDayView(calendarData);
        }
        targetElement.appendChild(calendarHTML);
    }
}

// Get calendar data
function getCalendar(year, month, date, startWeekOnSunday = false) {
    const dateObj = new Date(year, month, date);
    const result = {};

    result.year = year;
    result.month = month;
    result.date = date;

    // Today
    const today = new Date();
    result.today = {
        date: today.getDate(),
        monthIndex: today.getMonth(),
        year: today.getFullYear(),
        dayOfWeek: today.getDay(),
    };

    // First day of the month
    const firstDay = new Date(year, month, 1);
    result.firstDayIndex = firstDay.getDay();
    if (!startWeekOnSunday) {
        result.firstDayIndex = (result.firstDayIndex + 6) % 7; // Adjust for Monday start
    }

    // Total days in the month
    const lastDay = new Date(year, month + 1, 0);
    result.totaldays = lastDay.getDate();

    // Day of the week for the selected date
    result.dayOfWeek = dateObj.getDay();
    if (!startWeekOnSunday) {
        result.dayOfWeek = (result.dayOfWeek + 6) % 7; // Adjust for Monday start
    }

    // Calculate the start date of the week
    const selectedDate = new Date(year, month, date);
    const dayOfWeek = selectedDate.getDay();
    const adjustedDayOfWeek = startWeekOnSunday ? dayOfWeek : (dayOfWeek + 6) % 7;
    const startDate = new Date(selectedDate);
    startDate.setDate(selectedDate.getDate() - adjustedDayOfWeek);
    result.startDate = startDate;

    return result;
}

export function UpdateCurrentTime() {
    const now = new Date();
    let minutes_offset = parseFloat(now.getHours() * 60 + now.getMinutes());
    return {
        hours: now.getHours(),
        minutes: now.getMinutes(),
        offset: minutes_offset,
    };
}

// Export draw function
export const draw = drawCalendar;
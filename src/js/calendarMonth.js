import {dayName, monthName} from "./calendar.js";

export function createMonthTable(data, startWeekOnSunday) {
    const table = document.createElement("table");
    table.className = "calendar-table";

    const headerRow = document.createElement("tr");
    const dayNames = startWeekOnSunday ? dayName.sss : dayName.ddd;
    dayNames.forEach((day, index) => {
        const th = document.createElement("th");
        const dayWeekName = document.createElement("span");
        dayWeekName.innerHTML = day;
        
        const adjustedIndex = index + (startWeekOnSunday ? 0 : 1);
        if (adjustedIndex === data.today.dayOfWeek) {
            th.classList.add("today");
        }

        th.appendChild(dayWeekName);
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Dates
    let tr = document.createElement("tr");
    let dayIndex = data.firstDayIndex;

    // Fill previous month's days
    const prevMonthDays = new Date(data.year, data.month, 0).getDate();
    for (let i = 0; i < dayIndex; i++) {
        const td = document.createElement("td");
        td.className = "prev-month-day";

        const indexContainer = document.createElement("span");
        indexContainer.className = "index-container";
        indexContainer.innerHTML = prevMonthDays - dayIndex + i + 1;

        td.appendChild(indexContainer);
        tr.appendChild(td);
    }

    // Fill current month's days
    for (let day = 1; day <= data.totaldays; day++) {
        if (dayIndex === 7) {
            table.appendChild(tr);
            tr = document.createElement("tr");
            dayIndex = 0;
        }
        const td = document.createElement("td");
        td.className = "current-month-day";

        if (day === data.today.date && data.month === data.today.monthIndex && data.year === data.today.year) {
            td.classList.add("today");
        }

        // Add weekend class
        const adjustedIndex = startWeekOnSunday ? dayIndex : (dayIndex + 1) % 7;
        if (adjustedIndex === 0 || adjustedIndex === 6) {
            td.classList.add("weekend");
        }

        const indexContainer = document.createElement("span");
        indexContainer.className = "index-container";
        indexContainer.innerHTML = day;

        td.appendChild(indexContainer);
        tr.appendChild(td);
        dayIndex++;
    }

    // Fill next month's days
    for (let i = dayIndex; i < 7; i++) {
        const td = document.createElement("td");
        td.className = "next-month-day";

        const adjustedIndex = ((i + 1) % 7);
        if (adjustedIndex === 0 || adjustedIndex === 6) {
            td.classList.add("weekend");
        }

        const indexContainer = document.createElement("span");
        indexContainer.className = "index-container";
        indexContainer.innerHTML = i - dayIndex + 1;

        td.appendChild(indexContainer);
        tr.appendChild(td);
    }
    table.appendChild(tr);

    return table;
}
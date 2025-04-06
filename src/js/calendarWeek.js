import {dayName} from "./calendar.js";

export function createWeekTable(data) {
    const table = document.createElement("table");
    table.className = "calendar-table";

    // Header row for day names
    const headerRow = document.createElement("tr");
    dayName.ddd.forEach(day => {
        const th = document.createElement("th");
        th.innerHTML = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Week row
    const tr = document.createElement("tr");
    for (let i = 0; i < 7; i++) {
        const td = document.createElement("td");
        const date = new Date(data.year, data.month, data.date + i - data.dayOfWeek);
        td.innerHTML = date.getDate();
        td.className = "current-week-day";
        if (date.toDateString() === new Date().toDateString()) {
            td.classList.add("today");
        }
        tr.appendChild(td);
    }
    table.appendChild(tr);

    return table;
}
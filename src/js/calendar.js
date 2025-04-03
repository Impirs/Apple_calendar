// Constants
const monthName = {
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
const dayName = {
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
};

// Create month table
function createMonthTable(data) {
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

        const indexContainer = document.createElement("span");
        indexContainer.className = "index-container";
        indexContainer.innerHTML = i - dayIndex + 1;

        td.appendChild(indexContainer);
        tr.appendChild(td);
    }
    table.appendChild(tr);

    return table;
}

// Create week table
function createWeekTable(data) {
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

// Create day view
function createDayView(data) {
    const container = document.createElement("div");
    container.className = "calendar-day-view";

    const header = document.createElement("div");
    header.className = "day-header";
    header.innerHTML = `${dayName.full[data.dayOfWeek]}, ${monthName.full[data.month]} ${data.date}, ${data.year}`;
    container.appendChild(header);

    const body = document.createElement("div");
    body.className = "day-body";
    for (let hour = 0; hour < 24; hour++) {
        const hourBlock = document.createElement("div");
        hourBlock.className = "hour-block";
        hourBlock.innerHTML = `${hour}:00`;
        body.appendChild(hourBlock);
    }
    container.appendChild(body);

    return container;
}

// Draw calendar
function drawCalendar(options) {
    const defaults = {
        type: "month", // "month", "week", or "day"
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        date: new Date().getDate(),
    };

    options = { ...defaults, ...options };
    const calendarData = getCalendar(options.year, options.month, options.date);

    const targetElement = document.querySelector(options.target);
    if (targetElement) {
        targetElement.innerHTML = "";
        let calendarHTML;
        if (options.type === "month") {
            calendarHTML = createMonthTable(calendarData);
        } else if (options.type === "week") {
            calendarHTML = createWeekTable(calendarData);
        } else if (options.type === "day") {
            calendarHTML = createDayView(calendarData);
        }
        targetElement.appendChild(calendarHTML);
    }
}

// Get calendar data
function getCalendar(year, month, date) {
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
    };

    // First day of the month
    const firstDay = new Date(year, month, 1);
    result.firstDayIndex = firstDay.getDay();

    // Total days in the month
    const lastDay = new Date(year, month + 1, 0);
    result.totaldays = lastDay.getDate();

    // Day of the week
    result.dayOfWeek = dateObj.getDay();

    return result;
}

// Export draw function
export const draw = drawCalendar;
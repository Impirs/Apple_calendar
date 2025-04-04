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
    sss: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
};

// Create month table
function createMonthTable(data, startWeekOnSunday) {
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
    const body = document.createElement("div");
    body.className = "day-body";

    const header = document.createElement("div");
    header.className = "day-header";
    const isolatedBox = document.createElement("div");
    isolatedBox.className = "isolated-box";
    const dateNumber = document.createElement("span");
    dateNumber.className = "date-date";
    dateNumber.innerHTML = data.date <10 ? `0${data.date}` : data.date;
    const dayNameElement = document.createElement("span");
    dayNameElement.className = "day-day";
    dayNameElement.innerHTML = dayName.full[data.dayOfWeek];
    isolatedBox.appendChild(dateNumber);
    isolatedBox.appendChild(dayNameElement);
    header.appendChild(isolatedBox);
    body.appendChild(header);

    const heightContainer = document.createElement("div");
    heightContainer.className = "height-container";

    const eventsContainer = document.createElement("div");
    eventsContainer.className = "events-container";
    const eventsHeader = document.createElement("div");
    eventsHeader.className = "events-header";
    const allDayLine = document.createElement("div");
    allDayLine.className = "all-day-line";
    allDayLine.innerHTML = "All Day";
    const allDayEvents = document.createElement("div");
    allDayEvents.className = "all-day-events";
    eventsHeader.appendChild(allDayLine);
    eventsHeader.appendChild(allDayEvents);
    eventsContainer.appendChild(eventsHeader);
    
    const scrollContainer = document.createElement("div");
    scrollContainer.className = "scroll-container";
    const dayTimelineChart = document.createElement("div"); // grid
    // grid-template-columns: 90px repeat(1, calc(100% - 90px));
    // grid-template-rows: repeat(1440, 1fr);
    dayTimelineChart.className = "day-timeline-chart";
    // timeline-chart fill
    for (let hour = 0; hour < 24; hour++) {
        const hourBlock = document.createElement("div");
        hourBlock.className = "hour-block";
        const hourLabel = document.createElement("span");
        hourLabel.className = "hour-label";
        hourLabel.innerHTML = hour < 10 ? `0${hour}` : hour;
        hourBlock.appendChild(hourLabel);
        dayTimelineChart.appendChild(hourBlock);
    }

    const dayEventChart = document.createElement("div");
    dayEventChart.className = "day-event-chart";
    const eventChartBackground = document.createElement("div");
    eventChartBackground.className = "event-chart-background";
    // event-chart background fill
    // originaly it has one more biv as background / trying without it
    for (let hourLine = 1; hourLine <= 23; hourLine++) {
        let lineTopdistance = hourLine * 4.166666666666667; // 100% / 24 hours
        const hourLineBlock = document.createElement("div");
        hourLineBlock.className = "hour-line-block";
        hourLineBlock.style.top = `${lineTopdistance}%`;

        eventChartBackground.appendChild(hourLineBlock);
    }
    const eventColumnChart = document.createElement("div");
    eventColumnChart.className = "event-column-chart";
    // TODO add events rendering to the chart
    /* 
    <div class="css-12efcmn" style="top: 9.375%; bottom: 86.4583%; inset-inline: calc(0%);">
        <div class="event-preview css-g8uo7x"> // grid
            <button data-focusyn="allow" class="css-1ngsai5 event-button"> //flex
                <div class="css-z7mtfw"> // flex
                    <div class="css-dsp1hn">
                        New Event
                    </div>
                    <div class="css-kq1hr5">
                    </div>
                </div>
                <div class="css-1po17j4">
                </div>
            </button>
            <div class="css-444zfp top-resizer">
            </div>
            <div class="css-1ix2hec bottom-resizer">
            </div>
        </div>
    </div>
    */
    dayEventChart.appendChild(eventChartBackground);
    dayEventChart.appendChild(eventColumnChart);

    const nowTimeline = document.createElement("div"); // flex
    nowTimeline.className = "now-timeline";
    const nowTimelineLabel = document.createElement("div");
    nowTimelineLabel.className = "now-timeline-label";
    nowTimelineLabel.innerHTML = "Now"; // TODO add time to the label
    nowTimelineLabel.className = "now-timeline-label";
    nowTimeline.appendChild(nowTimelineLabel);
    // the indicator of real time above event chart
    const nowTimelineBox = document.createElement("div");
    nowTimelineBox.className = "now-timeline-box";
    const nowTimelineLine = document.createElement("div");
    nowTimelineLine.className = "now-timeline-line";
    const nowTimelineIndicator = document.createElement("div");
    nowTimelineIndicator.className = "now-timeline-indicator";
    nowTimelineBox.appendChild(nowTimelineLine);
    nowTimelineBox.appendChild(nowTimelineIndicator);    
    nowTimeline.appendChild(nowTimelineBox);

    let nowTimelineTop = 0; // 0,069444444444444% = 1 minute
    // nowTimeline.style.top = `${nowTimelineTop}%`;


    scrollContainer.appendChild(dayTimelineChart); 
    scrollContainer.appendChild(dayEventChart);
    scrollContainer.appendChild(nowTimeline); // TODO add nowTimelineTop to the top of the element

    eventsContainer.appendChild(scrollContainer);
    heightContainer.appendChild(eventsContainer);
    body.appendChild(heightContainer);

    // right side info container
    const infoContainer = document.createElement("div");
    infoContainer.className = "info-container";

    const monthContainer = document.createElement("div");
    monthContainer.className = "month-container-mini";
    const monthGrid = document.createElement("div"); //grid
    monthGrid.className = "month-grid";
    // TODO add month grid rendering
    monthContainer.appendChild(monthGrid);

    const devider = document.createElement("hr");
    devider.className = "devider";

    const eventInfo = document.createElement("div");
    eventInfo.className = "event-info";
    // TODO add event info rendering

    infoContainer.appendChild(monthContainer);
    infoContainer.appendChild(devider);
    infoContainer.appendChild(eventInfo);
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

    return result;
}

// Export draw function
export const draw = drawCalendar;
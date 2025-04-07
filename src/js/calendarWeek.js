import {dayName} from "./calendar.js";
import {createDayTimeChart, createRTindicator} from "./calendarDay.js";

export function createWeekTable(data) {
    const container = document.createElement("div");
    container.className = "calendar-week-view";
    const body = document.createElement("div");
    body.className = "week-body";

    // Week days header
    const header = createWeekCalendarHeader(data);
    body.appendChild(header);

    // All day events line
    // TODO need events data for rendering
    const eventsHeader = createAllDaysHeader(); // flex
    body.appendChild(eventsHeader);
    
    // Week events chart with timelines
    const scrollContainer = document.createElement("div");
    scrollContainer.className = "scroll-container";
    const theScroll = document.createElement("div");
    theScroll.className = "the-scroll"; //  flex 

    const dayTimelineChart = createDayTimeChart(); // grid
    theScroll.appendChild(dayTimelineChart);
    const weekEventChart = createEventChart();
    theScroll.appendChild(weekEventChart);

    // Check dates in the week to add "right now timeline"
    const today = new Date();
    const startDate = new Date(data.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    if (today >= startDate && today <= endDate) {
        const nowTimeline = createRTindicator();
        theScroll.appendChild(nowTimeline);
    }

    scrollContainer.appendChild(theScroll);
    body.appendChild(scrollContainer);

    requestAnimationFrame(() => {
        const scrollContainer = document.querySelector(".scroll-container");
        const nowTimeline = document.querySelector(".now-timeline");
    
        if (scrollContainer && nowTimeline) {    
            const offset = nowTimeline.offsetTop 
                            - (scrollContainer.clientHeight / 2) 
                            + (nowTimeline.clientHeight / 2);
    
            scrollContainer.scrollTop = offset;
        }
    });

    container.appendChild(body);

    return container;
}

function createWeekCalendarHeader(data) {
    const header = document.createElement("div");
    header.className = "week-header";

    const headerContainer = document.createElement("div");
    headerContainer.className = "header-container"; // grid

    const offset = document.createElement("div");
    offset.className = "time-col-offset";

    const weekDaysContainer = document.createElement("div");
    weekDaysContainer.className = "week-days-container";
    const weekGrid = document.createElement("div");
    weekGrid.className = "week-days-grid"; // grid

    const startDate = data.startDate;

    for (let day = 0; day < 7; day++) {
        const gridContainer = document.createElement("div");
        gridContainer.style.gridArea = `1 / ${day + 1} / 2 / ${day + 2}`;

        const dayLable = document.createElement("div");
        dayLable.className = "week-day-label";

        const weekDayDate = document.createElement("div");
        weekDayDate.className = "week-day-date";

        // Calculate the date for the current day, starting from Monday
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + day);
        weekDayDate.innerHTML = currentDate.getDate();
        if (currentDate.getDate() === data.today.date &&
            currentDate.getMonth() === data.today.monthIndex &&
            currentDate.getFullYear() === data.today.year) {
            weekDayDate.classList.add("today");
        }

        const weekDayName = document.createElement("div");
        weekDayName.className = "week-day-name";
        weekDayName.innerHTML = dayName.ddd[day]; 

        dayLable.appendChild(weekDayDate);
        dayLable.appendChild(weekDayName);
        gridContainer.appendChild(dayLable);

        weekGrid.appendChild(gridContainer);
    }
    
    weekDaysContainer.appendChild(weekGrid);
    headerContainer.appendChild(offset);
    headerContainer.appendChild(weekDaysContainer);
    header.appendChild(headerContainer);

    return header;
}

function createAllDaysHeader() {
    const eventsHeader = document.createElement("div");
    eventsHeader.className = "all-day-week-line";

    // right side barrier
    const rightBarrier = document.createElement("div");
    rightBarrier.className = "right-side-barrier";

    const allDayLable = document.createElement("span"); // flex
    allDayLable.className = "all-day-lable";
    allDayLable.innerHTML = "All Day";

    const allDaysEventsContainer = document.createElement("div");
    allDaysEventsContainer.className = "all-days-events-container";
    const allDayEvents = document.createElement("div");
    allDayEvents.className = "all-day-events-grid"; //grid

    for (let day = 0; day < 7; day++) {
        const div = document.createElement("div");

        const button = document.createElement("div");
        button.className = "all-day-day-button";
        if (day >= 5) button.classList.add("weekend");

        button.style.gridArea = `1 / ${day + 1} / 2 / ${day + 2}`;
        button.setAttribute("role", "button");
        button.setAttribute("data-focusyn", "allow");
        button.setAttribute("tabindex", "-1");

        div.appendChild(button);

        allDayEvents.appendChild(div);
    }
    // TODO add all day events rendering
    // need to upgrade the structure of all-day-events container
    /*
        <div class="n-grid-col month-grid-week-row css-g6p9q3">
            <div class="css-1h98574">
                <div class="n-grid-col css-aivotf month-grid-time-window">
                    <div class="all-day-event-preview css-5ve0cs" data-testid="all-day-event-bf46511e-0c3c-4599-aaf8-76c9c9c7a84f">
                        <button data-focusyn="allow" class="css-5nz45d event-button">
                            <div class="css-142ikh3">
                                New Event
                            </div>

                            <div class="css-kq1hr5">
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    */
    allDaysEventsContainer.appendChild(allDayEvents);
    
    eventsHeader.appendChild(rightBarrier);
    eventsHeader.appendChild(allDayLable);
    eventsHeader.appendChild(allDaysEventsContainer);

    return eventsHeader;
}

function createEventChart() {
    const weekEventChart = document.createElement("div");
    weekEventChart.className = "week-event-chart";
    const eventChartBackground = document.createElement("div");
    eventChartBackground.className = "event-chart-background";
    // event-chart background fill
    const eventColumns = document.createElement("div");
    eventColumns.className = "event-columns"; // flex
    for (let day = 0; day < 7; day++) {
        const column = document.createElement("div");
        column.className = "event-column";
        if (day >= 5) column.classList.add("weekend");
        eventColumns.appendChild(column);
    }
    eventChartBackground.appendChild(eventColumns);

    const eventLines = document.createElement("div");
    eventLines.className = "event-lines";
    for (let hourLine = 1; hourLine <= 23; hourLine++) {
        let lineTopdistance = hourLine * 4.166666666666667; // 100% / 24 hours
        const hourLineBlock = document.createElement("div");
        hourLineBlock.className = "hour-line-block";
        hourLineBlock.style.top = `${lineTopdistance}%`;

        eventLines.appendChild(hourLineBlock);
    }
    eventChartBackground.appendChild(eventLines);

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
    weekEventChart.appendChild(eventChartBackground);
    weekEventChart.appendChild(eventColumnChart);

    return weekEventChart;
}

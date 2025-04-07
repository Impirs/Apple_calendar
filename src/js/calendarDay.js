import {dayName , UpdateCurrentTime} from "./calendar.js";

export function createDayView(data) {
    const container = document.createElement("div");
    container.className = "calendar-day-view";
    const body = document.createElement("div");
    body.className = "day-body";

    // Date and weekday name header
    const header = createDayCalendarHeader(data); 
    body.appendChild(header);

    const eventsContainer = document.createElement("div");
    eventsContainer.className = "events-container";

    // All day header
    const eventsHeader = createAllDayHeader(); // TODO need events data for rendering
    eventsContainer.appendChild(eventsHeader);
    
    const scrollContainer = document.createElement("div");
    scrollContainer.className = "scroll-container";
    const theScroll = document.createElement("div");
    theScroll.className = "the-scroll"; //  flex 

    // Timeline chart
    const dayTimeContainer = document.createElement("div"); // container
    dayTimeContainer.className = "day-time-container";
    const dayTimelineChart = createDayTimeChart(); // grid
    dayTimeContainer.appendChild(dayTimelineChart);
    theScroll.appendChild(dayTimeContainer); 
    // Event chart
    const dayEventChart = createEventChart();
    theScroll.appendChild(dayEventChart);
    // RN timeline
    if (data.date === data.today.date && 
        data.month === data.today.monthIndex && 
        data.year === data.today.year) 
    {
        const nowTimeline = createRTindicator();
        theScroll.appendChild(nowTimeline);
    }

    scrollContainer.appendChild(theScroll);
    eventsContainer.appendChild(scrollContainer);
    body.appendChild(eventsContainer);

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

    // right side info container
    const infoContainer = document.createElement("div");
    infoContainer.className = "info-container";

    const monthContainer = createMonthGrid(data);

    const devider = document.createElement("hr");
    devider.className = "devider";

    const eventInfo = document.createElement("div");
    eventInfo.className = "event-info";
    // TODO add event info rendering

    infoContainer.appendChild(monthContainer);
    infoContainer.appendChild(devider);
    infoContainer.appendChild(eventInfo);

    container.appendChild(body);
    container.appendChild(infoContainer);

    return container;
}

// function createAllDayContainer() {}

function createDayCalendarHeader( data ) {
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

    return header;
}

function createAllDayHeader() {
    const eventsHeader = document.createElement("div");
    eventsHeader.className = "events-header";
    const allDayLine = document.createElement("span");
    allDayLine.className = "all-day-line";
    allDayLine.innerHTML = "All Day";

    const allDayEventsContainer = document.createElement("div");
    allDayEventsContainer.className = "all-day-events-container";
    const allDayEvents = document.createElement("div");
    allDayEvents.className = "all-day-events";
    
    // TODO add all day events rendering
    // need to upgrade the structure of all-day-events container
    /*
        <div class="css-1r0a2d7 multi-day-event-grid month-grid">
            <div class="css-nhdjln n-grid-col">
                <div role="button" tabindex="-1" data-focusyn="allow" class="all-day-day-cell css-1sqrjd">
                </div>
            </div>
        </div>
    */
    
    eventsHeader.appendChild(allDayLine);
    allDayEventsContainer.appendChild(allDayEvents);
    eventsHeader.appendChild(allDayEventsContainer);

    return eventsHeader;
}

export function createDayTimeChart() {
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
        if (hour === 0) {
            hourLabel.innerHTML = " ";
        }
        else {
            hourLabel.innerHTML = hour < 10 ? `0${hour}` : hour;
        }
        const rowStart = (60 * hour) + 1;
        const rowEnd = (60 * hour) + 2;

        hourBlock.style.gridArea = `${rowStart} / 1 / ${rowEnd} / 2`;

        hourBlock.appendChild(hourLabel);
        dayTimelineChart.appendChild(hourBlock);
    }

    return dayTimelineChart;
}

export function createRTindicator() {
    let currentTime = UpdateCurrentTime();

    const nowTimeline = document.createElement("div"); // flex
    nowTimeline.className = "now-timeline";

    const nowTimelineLabel = document.createElement("div");
    nowTimelineLabel.className = "now-timeline-label";
    nowTimeline.appendChild(nowTimelineLabel);

    // TODO add am/pm indicator
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

    // count top offset by getting current time and converting it to percentage
    let lastRenderedMinute = null;

    function render() {
        currentTime = UpdateCurrentTime();

        if (currentTime.minutes !== lastRenderedMinute) {
            nowTimelineLabel.innerHTML = `${currentTime.hours < 10 ? 
                                                `0${currentTime.hours}` : currentTime.hours}:` +
                                         `${currentTime.minutes < 10 ? 
                                                `0${currentTime.minutes}` : currentTime.minutes}`;
            lastRenderedMinute = currentTime.minutes;
        }

        let nowTimelineTop = currentTime.offset * 0.069444444444444;
        // 0,069444444444444% = 1 minute
        nowTimeline.style.top = `${nowTimelineTop}%`;
    }
    render();
    setInterval(render, 1000 ); 

    return nowTimeline;
}

function createEventChart() {
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

    return dayEventChart;
}

function handleDateSelection(data, selectedDate) {
    data.date = selectedDate;
    // console.log("Date clicked:", selectedDate);
    // console.log("Selected date:", data.date);

    if (data.setSelectedDate) {
        data.setSelectedDate({
            date: selectedDate,
            month: data.month,
            year: data.year,
        });
    } else {
        console.error("setSelectedDate is not defined in data.");
    }
}

function createMonthGrid(data) {
    const monthContainer = document.createElement("div");
    monthContainer.className = "month-container-mini";
    const monthGrid = document.createElement("div"); //grid
    monthGrid.className = "month-grid";

    // TODO maybe add startWeekOnSunday option to the month grid as well
    for (let i = 0; i < 7; i++) {
        const weekDay = document.createElement("div");
        weekDay.className = "week-day";
        weekDay.className = "mini-month-grid-col";
        if (i === 5 || i === 6) {
            weekDay.classList.add("weekend");
        }

        const weekDayName = document.createElement("span");
        weekDayName.innerHTML = dayName.d[i];

        weekDay.appendChild(weekDayName);
        monthGrid.appendChild(weekDay);
    }

    let dayIndex = data.firstDayIndex;
    // prev month days
    for (let i = 0; i < data.firstDayIndex; i++) {
        const monthDay = document.createElement("div");
        monthDay.className = "prev-month-day";
        monthDay.className = "mini-month-grid-col";
        monthGrid.appendChild(monthDay);
    }
    // this month days
    for (let i = 1; i <= data.totaldays; i++) {
        // cycle the day index to 0-6
        dayIndex = dayIndex <= 6 ? dayIndex : 0;

        const monthDay = document.createElement("div");
        monthDay.className = "current-month-day";
        monthDay.className = "mini-month-grid-col";

        const dateTranslate = document.createElement("button");
        dateTranslate.className = "mini-month-grid-button";
        if (i === data.today.date && 
            data.month === data.today.monthIndex && 
            data.year === data.today.year) 
        {
            dateTranslate.classList.add("today");
        }
        if (dayIndex === 5 ||dayIndex === 6) {
            dateTranslate.classList.add("weekend");
        }
        if (i === data.date) {
            dateTranslate.classList.add("selected");
        }
        
        const dateNumber = document.createElement("span");
        dateNumber.className = "mini-month-grid-number";
        dateNumber.innerHTML = i;

        // TODO add the "Has events" indicator
        /*
            position: absolute;
            border-radius: 50%;
            background-color: var(--theme-color-systemRed);
            width: 4px;
            height: 4px;
            left: 13.5px;
            bottom: 2px;
        */

        dateTranslate.appendChild(dateNumber);

        dateTranslate.onclick = () => handleDateSelection(data, i);
        monthDay.appendChild(dateTranslate);

        monthGrid.appendChild(monthDay);
        dayIndex ++;
    }
    // next month days
    for (let i = dayIndex; i < 7; i++) {
        const monthDay = document.createElement("div");
        monthDay.className = "next-month-day";
        monthDay.className = "mini-month-grid-col";
        monthGrid.appendChild(monthDay);
    }

    monthContainer.appendChild(monthGrid);

    return monthContainer;
}
// function createEventInfo() {}
// function createMonthGrid() {} // should have been done in month file



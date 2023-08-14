import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const timeFromNow = (time) => {
    const currentDate = dayjs();
    const targetDate = dayjs(time);
    const timeDifference = currentDate.diff(targetDate, "day");

    if (timeDifference < 1) {
        return targetDate.fromNow();
    } 
    else {
        return targetDate.format('D MMMM YYYY');
    }
}

export {
    timeFromNow
}
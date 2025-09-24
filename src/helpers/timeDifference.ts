export const timeDifference = (current: Date, previous: Date): string => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current.getTime() - previous.getTime();

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ago';
  } else {
    return Math.round(elapsed / msPerYear) + ' years ago';
  }
};

export function convertTo12HourFormat(time24: string) {
  // Parse the input time
  const [hour, minute, second] = time24.split(':').map(Number);

  // Determine AM or PM
  const period = hour >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  const hour12 = hour % 12 || 12; // If hour is 0, it should be 12 in 12-hour format

  // Format the result
  const time12 = `${hour12}:${minute.toString().padStart(2, '0')}${period}`;

  return time12;
}

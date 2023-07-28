export const formatDate = (date) => {
    const newDate = new Date(date)
    const formattedDate = `${newDate.toLocaleString("en-US", { month: "long" })} ${newDate.getDate()} , ${newDate.getFullYear()}, ${formatTime(newDate)}`;
    return formattedDate
}


function formatTime(date) {
  const hours = date.getHours();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = padZero(hours % 12 || 12);
  return `${formattedHours}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())} ${amOrPm}`;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}

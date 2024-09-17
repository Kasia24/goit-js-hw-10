import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

const startButton = document.querySelector('button[data-start]');
const datetimePicker = document.getElementById('datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const countdownElement = document.getElementById('countdown');

let selectedDate = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const now = new Date();
    selectedDate = selectedDates[0];

    if (selectedDate <= now) {
      iziToast.error({
        title: 'Błąd',
        message: 'Please choose a date in the future.',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

function updateTimer() {
  const now = new Date().getTime();
  const timeRemaining = selectedDate - now;

  if (timeRemaining >= 0) {
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    // Aktualizacja elementów HTML
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  } else {
    clearInterval(timerInterval);
    iziToast.success({
      title: 'Gratulacje',
      message: 'Czas się skończył!',
    });
  }
}

function startTimer() {
  startButton.disabled = true; // Dezaktywacja przycisku po starcie
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

// Obsługa kliknięcia przycisku Start
startButton.addEventListener('click', () => {
  startButton.disabled = true; // Dezaktywuj przycisk
  startTimer(); // Uruchom licznik czasu
});

// Funkcja do formatowania liczb
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

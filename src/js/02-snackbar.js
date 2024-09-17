document
  .getElementById('promiseForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    // Pobranie wartości wprowadzonych przez użytkownika
    const delay = document.getElementById('delay').value;
    const state = document.querySelector(
      'input[name="promiseResult"]:checked'
    ).value;

    // Funkcja tworząca obietnicę
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (promiseResult === 'fulfilled') {
          resolve(delay); // Zwracamy wartość opóźnienia w przypadku sukcesu
        } else {
          reject(delay); // Zwracamy wartość opóźnienia w przypadku odrzucenia
        }
      }, delay);
    });

    promise
      .then(delay => {
        iziToast.success({
          title: 'Success',
          message: `Fulfilled promise in ${delay}ms`,
        });
      })
      .catch(delay => {
        iziToast.error({
          title: 'Error',
          message: `Rejected promise in ${delay}ms`,
        });
      });
  });

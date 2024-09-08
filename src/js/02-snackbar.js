document
  .getElementById('promiseForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    // Pobranie wartości wprowadzonych przez użytkownika
    const delay = document.getElementById('delay').value;
    const promiseResult = document.querySelector(
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

    // Obsługa wyniku obietnicy
    promise
      .then(delay => {
        console.log(`✅ Fulfilled promise in ${delay}ms`);
      })
      .catch(delay => {
        console.log(`❌ Rejected promise in ${delay}ms`);
      });
  });

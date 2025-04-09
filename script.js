document.addEventListener('DOMContentLoaded', () => {
  // MENU LOADING
  const menuContainer = document.getElementById('menu');

  fetch('http://localhost:5001/api/menu')
    .then(response => response.json())
    .then(menuItems => {
      menuItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        itemElement.innerHTML = `
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <strong>₹${item.price}</strong>
        `;
        menuContainer.appendChild(itemElement);
      });
    })
    .catch(error => {
      console.error('Error fetching menu:', error);
      menuContainer.innerHTML = '<p>Sorry, could not load menu right now.</p>';
    });

  // CONTACT FORM SUBMISSION
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      try {
        const response = await fetch('http://localhost:5001/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();
        alert(result.message); // Success alert
        contactForm.reset();   // Clear the form
      } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('There was a problem sending your message. Please try again later.');
      }
    });
  }
});


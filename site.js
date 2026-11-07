document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
      }
    });
  }

  if (nav && !nav.querySelector('a[href="faq.html"]')) {
    const faq = document.createElement('a');
    faq.href = 'faq.html';
    faq.textContent = 'FAQs';
    if (location.pathname.endsWith('faq.html')) faq.className = 'active';
    const contact = nav.querySelector('a[href="contact.html"]');
    nav.insertBefore(faq, contact);
  }

  const form = document.querySelector('.enquiry-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(form);
      const enquiry = [
        'Hello Nahori Wild Photography, I would like a quote for a Maasai Mara safari.',
        '',
        `Name: ${formData.get('name')}`,
        `Email: ${formData.get('email')}`,
        `Travel dates: ${formData.get('dates') || 'Flexible / to be discussed'}`,
        `Travellers: ${formData.get('travellers') || 'To be discussed'}`,
        `Trip length: ${formData.get('duration') || 'To be discussed'}`,
        `Arrival / transport: ${formData.get('transport') || 'To be discussed'}`,
        `Accommodation: ${formData.get('accommodation') || 'To be discussed'}`,
        `Photography interest: ${formData.get('photography') || 'To be discussed'}`,
        `Trip details: ${formData.get('message')}`
      ];
      const interest = new URLSearchParams(location.search).get('interest');
      if (interest) enquiry.splice(1, 0, `Safari interest: ${interest.replace(/-/g, ' ')}`);

      const feedback = document.querySelector('.form-feedback');
      feedback.textContent = 'WhatsApp is opening with your enquiry. Please review it and press Send to contact us.';
      location.href = `https://wa.me/254718769412?text=${encodeURIComponent(enquiry.join('\n'))}`;
    });
  }
});

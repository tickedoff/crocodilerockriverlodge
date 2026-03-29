// Main JS — Crocodile Rock River Lodge

// FAQ accordion
document.querySelectorAll('.faq__trigger').forEach(function(trigger) {
  trigger.addEventListener('click', function() {
    var expanded = trigger.getAttribute('aria-expanded') === 'true';
    var panel = document.getElementById(trigger.getAttribute('aria-controls'));
    trigger.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });
});

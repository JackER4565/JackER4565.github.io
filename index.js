// get mails, subject and body from params and create a new mail vanilla javascript

function test() {
  alert('test');
//get params
const params = new URLSearchParams(window.location.search);
const mail = params.get('mail');
const subject = params.get('subject');
const body = params.get('body');

//create new mail
const mailTo = document.createElement('a');
mailTo.target = '_blank';
mailTo.style.display = 'none';
mailTo.rel = 'noopener noreferrer';
mailTo.href = `mailto:${mail}?subject=${subject}&body=${body}`;
mailTo.click();

// Path: index.js
}
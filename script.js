function init() {
    let screen = document.getElementById('screen');
    screen.onclick = buttonClick;
    let header = document.getElementsByClassName('header');
    let footer = document.getElementsByClassName('footer');
}

function buttonClick(e) {

    let btn = e.target.id;

    if (btn.includes('_')) { 
        if (btn === 'mapsLänk_s') {
            window.open('https://www.google.com/maps/place/Skolgatan+8,+262+31+%C3%84ngelholm/@56.2450512,12.8675006,19z/data=!3m1!4b1!4m6!3m5!1s0x46522aa3d49b9b4f:0xae6d2341f4676b30!8m2!3d56.2450512!4d12.8675006!16s%2Fg%2F11cnch4p7b?entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3D');
        } else if (btn === 'mapsLänk_h') {
            window.open('https://www.google.com/maps/place/Trapetsgatan+16,+262+55+%C3%84ngelholm/@56.2336737,12.8531521,17z/data=!3m1!4b1!4m6!3m5!1s0x46522be8db8d1d1b:0x74b9e63a72e3c187!8m2!3d56.2336737!4d12.8557324!16s%2Fg%2F11y3n9cr8b?entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3D');
        }
    } //for IOS 
    else if (btn.substring(1,2) === 'o') {
        window.location.href = 'tel:+46 073 523 2993';
    } else if (btn.substring(1,2) === 'm') {
        window.location.href = 'sms:+46 073 523 2993';
    } else if (btn.substring(1,2) === 'e') {
        window.location.href = 'mailto:feritbat6@gmail.com';
    }
}

window.onload = init;
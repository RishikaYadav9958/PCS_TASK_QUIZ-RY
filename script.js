/*let x=document.getElementsByClassName("box1");
x.addEventListener("click", function(){
    x.style.color="yellow";
    x.style.backgroundColour="red";
})*/

/*document.querySelectorAll('.container div').forEach(box => {
    box.addEventListener('click', () => {
        alert(`Starting quiz`);
    });
});*/
document.querySelectorAll('.box1').forEach(box1 => {
    box1.addEventListener('click', () => {
        window.location.href = 'quiz.html';
    });
 });
document.querySelectorAll('.box2').forEach(box2 => {
    box2.addEventListener('click', () => {
        window.location.href = 'quiz1.html';
    });
 });
document.querySelectorAll('.box3').forEach(box3 => {
    box3.addEventListener('click', () => {
        window.location.href = 'quiz2.html';
    });
 });
document.querySelectorAll('.box4').forEach(box4 => {
    box4.addEventListener('click', () => {
        window.location.href = 'quiz3.html';
    });
 });
document.querySelectorAll('.box5').forEach(box5 => {
    box5.addEventListener('click', () => {
        window.location.href = 'quiz4.html';
    });
 });
document.querySelectorAll('.box6').forEach(box6 => {
    box6.addEventListener('click', () => {
        window.location.href = 'quiz5.html';
    });
 });
document.querySelectorAll('.box7').forEach(box7 => {
    box7.addEventListener('click', () => {
        window.location.href = 'quiz6.html';
    });
 });

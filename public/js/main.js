
    //hàm tạo vòng lặp tự động bằng thơi gian
var theCountdownDate =  new Date().getTime(); // thời gian hiện tại
var game_turn = 0;
var theDistance; // chênh lệch sử dụng trong hàm setInterval

var theInterValsFunction = setInterval( function(){
    var theNowTimeDate = new Date().getTime();
    theDistance =  theNowTimeDate - theCountdownDate;
    if (theDistance - 10000*game_turn >= 10000){
        game_turn += 1;
        xuly(true);
    }
})
//tạo biến current khi click next sẽ +1, click prev sẽ -1.
var current = 1;
var max_number = 20;

function xuly(dieuhuong){
    if (dieuhuong == true && current < max_number){
        current++;
        // bộ đếm trỏ về 0
        game_turn=0;
        theCountdownDate=  new Date().getTime(); 
    }
    else if (dieuhuong == true && current == max_number){
        current = 1;
        // bộ đếm trỏ về 0
        game_turn=0;
        theCountdownDate=  new Date().getTime(); 
    }
    else if (dieuhuong == false && current > 1) {
        current--;
        // bộ đếm trỏ về 0
        game_turn=0;
        theCountdownDate=  new Date().getTime();             
    }
    document.querySelector(".current_page").innerHTML = "Ảnh "+ current.toString() + " / " + max_number.toString();
    //thay hình theo biến current
    document.querySelector('#main_img').src = "images/"+ (current%5+1).toString() +".jpg";
    console.log('aa')
}




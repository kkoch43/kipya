$(document).ready(function(){

    $('#district').click(function(){
        var distval=$("#district").val();
        $.post('http://localhost/kipya/public/api/searchCity', {distval:distval},function(match){
            $("#city").html(match);
        });
    });

});
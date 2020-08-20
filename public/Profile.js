function setProfile(user) {

    $("#user-name").html(user["name"]);
    $("#user-age").html(user["age"]);
    $("#user-bio").html(user["bio"])
    $("#user-pic").attr('src', user["pic"]);

}

function sendEmail(user){
    let name = user["name"];
    let email = user["email"];

    console.log(name)
    console.log(email)

    let data = {name:name, email:email}
    console.log("data:    " +data)
    $.ajax({
        url: '/sendEmail',
        contentType: 'application/json',
        data: JSON.stringify(data), // access in body
        type: 'POST',
        success: function (result) {
            console.log(data)
            console.log(result)
            //.html?email="x"
        }
    })
}





// I could retrieve the data out of load for more efficiency
$(document).ready(function(){
    console.log("running script");

    $.get("/getUsers", function (res) {
        console.log(res);
        let users = res;
        let i = 0;
        let user = users[i];
        setProfile(user);

        let end = users.length;
        const eof = {name: "no more users", pic:"https://ncjamieson.com/static/42192ca0cf015fd255a43c143de83e7d/5fd6b/title.jpg", bio:"please try again later", age:"null"}
        $("#like-button").click(function () {
            //functions could be used for the 2 buttons
            if(user["like"] == "true"){
                $("#match-img").attr('src', user["pic"]);
                $( function() {
                    $( "#dialog" ).dialog();
                } );
                sendEmail(user)
                /////////////////////////////////////////////////////////
            }


            if(i >= (end-1))
            {
                setProfile(eof);
            }
            else {
                i++;
                user = users[i];
                setProfile(user);
            }

        })
        $("#dislike-button").click(function () {
            if(i >= (end-1))
            {
                setProfile(eof);
            }
            else {
                i++;
                user = users[i];
                setProfile(user);
            }
        })
    })
});







(function(){
    //点赞
    if(document.getElementById("like_btn")) {
        document.getElementById("like_btn").addEventListener("click", function(){
            fetch("/api/like/"+window.location.href.split("/")[window.location.href.split("/").length - 1], {
                method: "GET"
            })
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                document.getElementById("like").innerText = res.data;
            })
        })
    }


    //
    if(document.getElementById("commentBtn")) {
        document.getElementById("commentBtn").addEventListener("click", function(){
            fetch("/api/comment/"+window.location.href.split("/")[window.location.href.split("/").length - 1], {
                method: "GET"
            })
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                document.getElementById("like").innerText = res.data;
            })
        })
    }
})()
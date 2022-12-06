    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var up = false;
        if (t < 0){
            t = t * -1;
            up = true;
        }
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            'up' : up
        };
    }
 
    function initializeClock(endtime, type) {
        if(type == "del"){
            document.getElementById("topMessage").innerHTML = "本文将在以下时间后被删除";
        }else if(type == "ban"){
            document.getElementById("topMessage").innerHTML = "本用户直至以下时间被封禁";
        } else {
            var typetext = type.split("%20");
            document.getElementById("topMessage").innerHTML = typetext.join(" ");
        }
 
        var clock = document.getElementById('clockdiv');
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');
 
        function updateClock() {
            var t = getTimeRemaining(endtime);
 
            if (t.up) {
                daysSpan.innerHTML = t.days;
                daysSpan.style.color = "green";
                hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
                hoursSpan.style.color = "green";
                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                minutesSpan.style.color = "green";
                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
                secondsSpan.style.color = "green";
 
                if(type == "del"){
                    document.getElementById("topMessage").innerHTML = "本文章已经超过符合被删除期限";
                    document.getElementById("topMessage").style.color = "green";
                    document.getElementById("message").style.display = "none";
 
                }else if(type == "ban"){
                    document.getElementById("topMessage").innerHTML = "本用户已经超过期限符合被解封"
                    document.getElementById("messsage").style.color = "green";
                    document.getElementById("message").style.display = "none";
                } else {
                    document.getElementById("topMessage").innerHTML = "本计时器已经到时间";
                    document.getElementById("messsage").style.color = "green";
                    document.getElementById("message").style.display = "none";
                }
            } else {
                daysSpan.innerHTML = t.days;
                hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
            }
        }
 
        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
 
    }
 
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    var time = parseFloat(getUrlVars()["time"]);
    var type = decodeURIComponent(getUrlVars()["type"]);
    var deadline = new Date(time);
    initializeClock(deadline, type);

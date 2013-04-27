today = new Date();         // initialize to current date
hh = today.getHours();          // goes from 0 to 23
var ampm = "am"
        var NoLoops = hh        // this variable is also used for the cuckoo clock
                if(hh == 0) { NoLoops = 12};
                if(hh > 12) { NoLoops = hh - 12; ampm = "pm" }
                if(hh == 12) { ampm = "pm" }
var dd = today.getDate();
var mm = today.getMonth() + 1;  // Jan is 0, Feb is 1, etc., hence the +1
var dow = today.getDay();
MonNames = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
var ThisMonth = MonNames[mm];

// var yy = today.getYear();
// browser Y2K bug fix -- convert from msec to years because getYear() doesn't work right
    var millisec = today.getTime();            // this gives msecs
    var yy = ((((millisec / 1000) / 3600) / 24) / 365.25);
    yy = Math.floor(yy);
    yy +=1970;

var txtDate = "" + ((dd < 10) ? "0" : "") + dd;   // add 0 if less than 10 so displays right
txtDate += "&nbsp;" + ThisMonth;
txtDate += "&nbsp;" + yy;
var mn = today.getMinutes();        // goes from 0 to 59
var txtTime = "" + ((NoLoops < 10) ? "0" : "") + NoLoops;
txtTime += ((mn<10) ? ":0" : ":") + mn;

// here's where the calculations from the book start
var moondate = today;
tzone = moondate.getTimezoneOffset() / 60               // in min so convert to hours
var moonmsec = moondate.getTime();                      // this gives msecs
GMtime = moonmsec + (tzone * 60 * 60 * 1000)            // GMT in msec
// adapted from my VB code
var startDate = new Date(89, 11, 31, 00, 00, 00);       // equivalent of the book's 0 Jan 90
var startMsec = startDate.getTime();
var dmsec = GMtime - startMsec;
D = ((((dmsec /1000) /60) /60) /24);
var n = D * (360 / 365.242191);                         //no 46-3
if (n > 0) {
        n = n - Math.floor(Math.abs(n / 360)) * 360;    //no 46-3
} else {
        n = n + (360 + Math.floor(Math.abs(n / 360)) * 360);  //no 46-3
}
var Mo = n + 279.403303 - 282.768422;                   //no 46-4;
if(Mo < 0) { Mo = Mo + 360 }                         //no 46-4
var Ec = 360 * .016713 * Math.sin(Mo * 3.141592654 / 180) / 3.141592654;        //no 46-5
var lamda = n + Ec + 279.403303;                        //no 46-6
if(lamda > 360) { lamda = lamda - 360 }              //no 46-6
var l = 13.1763966 * D + 318.351648;                    //no 65-4
if (l > 0) {
        l = l - Math.floor(Math.abs(l / 360)) * 360;    //no 65-4
} else {
        l = l + (360 + Math.floor(Math.abs(l / 360)) * 360);  //no 65-4
}
var Mm = l - .1114041 * D - 36.34041;                   //no 65-5
if (Mm > 0) {
        Mm = Mm - Math.floor(Math.abs(Mm / 360)) * 360; //no 65-5
} else {
        Mm = Mm + (360 + Math.floor(Math.abs(Mm / 360)) * 360); //no 65-5
}
var N65 = 318.510107 - .0529539 * D;                    //no 65-6
if (N65 > 0) {
        N65 = N65 - Math.floor(Math.abs(N65 / 360)) * 360;      //no 65-6
} else {
        N65 = N65 + (360 + Math.floor(Math.abs(N65 / 360)) * 360);      //no 65-6
}
var Ev = 1.2739 * Math.sin((2 * (l - lamda) - Mm) * 3.141592654 / 180); //no 65-7
var Ae = .1858 * Math.sin(Mo * 3.141592654 / 180);      //no 65-8
var A3 = .37 * Math.sin(Mo * 3.141592654 / 180);        //no 65-8
var Mmp = Mm + Ev - Ae - A3;                            //no 65-9
var Ec = 6.2886 * Math.sin(Mmp * 3.141592654 / 180);    //no 65-10
var A4 = .214 * Math.sin((2 * Mmp) * 3.141592654 / 180);        //no 65-11
var lp = l + Ev + Ec - Ae + A4;                         //no 65-12
var V = .6583 * Math.sin((2 * (lp - lamda)) * 3.141592654 / 180);       //no 65-13
var lpp = lp + V;                                       //no 65-14
var D67 = lpp - lamda;                                  //no 67-2
Ff = .5 * (1 - Math.cos(D67 * 3.141592654 / 180));      //no 67-3
Xx = (Math.sin(D67 * 3.141592654 / 180));

// figure out what phase the moon is in and what icon to use to go with it
var MoonPhaseMsg = "Just for fun, the moon is ";
if(Ff < .02) {
        document.write ('<IMG name="moonpic" SRC="graphics/steincarter/moon/moon01.gif" HEIGHT="32" WIDTH="32" ALIGN="right" alt="">');
        MoonPhaseMsg += "new."
}
if((Ff > .45) && (Ff < .55) && (Xx > 0)) {
        document.write ('<IMG name="moonpic" SRC="graphics/steincarter/moon/moon03.gif" HEIGHT="32" WIDTH="32" ALIGN="right" alt="">');
        MoonPhaseMsg += "first quarter."
}
if((Ff > .45) && (Ff < .55) && (Xx < 0)) {
        document.write ('<IMG name="moonpic" SRC="graphics/steincarter/moon/moon07.gif" HEIGHT="32" WIDTH="32" ALIGN="right" alt="">');
        MoonPhaseMsg += "last quarter."
}                
if(Ff > .98) {
        document.write ('<IMG name="moonpic" SRC="graphics/steincarter/moon/moon05.gif" HEIGHT="32" WIDTH="32" ALIGN="right" alt="">');
        MoonPhaseMsg += "full."
}                                                                             
if((Ff > .02) && (Ff < .45) && (Xx > 0)) {
        document.write ('<IMG name="moonpic" SRC="graphics/steincarter/moon/moon02.gif" HEIGHT="32" WIDTH="32" ALIGN="right" alt="">');
        MoonPhaseMsg += "waxing."
}
if((Ff > .02) && (Ff < .45) && (Xx < 0)) {
        document.write ('<IMG name="moonpic" SRC="graphics/steincarter/moon/moon08.gif" HEIGHT="32" WIDTH="32" ALIGN="right" alt="">');
        MoonPhaseMsg += "waning."
}
if((Ff > .55) && (Ff < .98) && (Xx > 0)) {
        document.write ('<IMG name="moonpic" SRC="graphics/steincarter/moon/moon04.gif" HEIGHT="32" WIDTH="32" ALIGN="right" alt="">');
        MoonPhaseMsg += "waxing gibbous."
}
if((Ff > .55) && (Ff < .98) && (Xx < 0)) {
        document.write ('<IMG name="moonpic" SRC="graphics/steincarter/moon/moon06.gif" HEIGHT="32" WIDTH="32" ALIGN="right" alt="">');
        MoonPhaseMsg += "waning gibbous."
}

document.write (MoonPhaseMsg);
document.write (' The moon phase calculations are based on your computer reporting that is is');
document.write (" " + txtTime + "&nbsp;" + ampm + " on " + txtDate + ",\n");
document.write (' and that you are ' + tzone + ' hours from GMT.');

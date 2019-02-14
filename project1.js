document.getElementById('dateform').valueAsDate = new Date();
document.getElementById('dateform').min = new Date().toISOString().split("T")[0];
var memos = [];

window.onload = function(){
    if(JSON.parse(localStorage.getItem("notes")) === null){return}
    var strg_notes = localStorage.getItem("notes");
    memos = JSON.parse(strg_notes);
    UpdatePanel();
}

function AddMemo() {
    if(!VerifInfo()){
        return   
    }
    
    var mtitle = document.getElementById("titleform").value;
    var mnote = document.getElementById("noteform").value;
    var mdate = document.getElementById("dateform").value;
    var mtime = document.getElementById("timeform").value;
    mnote = mnote.replace(/\n\r?/g, '<br/>');

    var memo = `{"title":"${mtitle}", "note":"${mnote}", "date":"${mdate}", "time":"${mtime}"}`;
    memos.push(JSON.parse(memo));
    EnterLocalStr();
    ClearForm();
    UpdatePanel();
}

function EnterLocalStr(){
    var arr_notes = JSON.stringify(memos);
    localStorage.setItem("notes",arr_notes);
}

function UpdatePanel(){
    if(memos.length<1){return}
    var buffer = "";
    for(var i=(memos.length)-1;i>=0;i--){
        buffer += `<div class="paperc">
                        <i class="far fa-times-circle fa-lg" onclick="DeletePaper(${i})"></i>
                        <h5 class="titlepaper">${memos[i].title}</h5>
                        <div class="notepaper">${memos[i].note}</div>
                        <div class="datepaper">${memos[i].date.substring(8,10)}/${memos[i].date.substring(5,7)}/${memos[i].date.substring(0,4)}</div>
                        <div class="timepaper">${memos[i].time}</div>
                    </div>`;
    }
    document.getElementById("paperboard").innerHTML = buffer;
}

function ClearForm() {
    var mtitle = document.getElementById("titleform");
    mtitle.value="";
    mtitle.focus();
    document.getElementById("noteform").value = "";
    document.getElementById('dateform').valueAsDate = new Date();
    document.getElementById('dateform').min = new Date().toISOString().split("T")[0];
    document.getElementById("timeform").value = "";
}

function DeletePaper(index){
    memos.splice(index,1);
    EnterLocalStr();
    UpdatePanel();
}

function VerifInfo() {
    var mtitle = document.getElementById("titleform").value;
    var mnote = document.getElementById("noteform").value;
    var mdate = document.getElementById("dateform").value;
    var mtime = document.getElementById("timeform").value;
    var bufferverif = "";
    if (mtitle === "" && mnote === "") {
        bufferverif += "The memo is empty";
    }
    if (mdate === "") {
        AddAnd();
        bufferverif += "the date is incorrect";
    }
    var datetime = "";
    if (mtime !== "") {
        datetime = "T" + mtime + ":00";
    }
    else {
        datetime = "T23:59:59";
    }
    if (new Date(mdate + datetime) < new Date()) {
        AddAnd();
        bufferverif += "the date is passed";
    }
    if (bufferverif !== "") {
        alert(bufferverif);
        return 0
    }
    return 1
    function AddAnd() {
        if (bufferverif !== "") {
            bufferverif += " and ";
        }
    }
}
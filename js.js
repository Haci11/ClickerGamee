var clicker = {
    money:0,
    power:1,
    upgrades: {
        Bob:{
            amount:0,
            cost:10,
            cps:1,
            name:"Bob"
        },
        Sheesh:{
            amount:0,
            cost:100,
            cps:10,
            name:"Sheesh"
        },
        Haco:{
            amount:0,
            cost:1000,
            cps:100,
            name:"Haco"
        },
        Reto:{
            amount:0,
            cost:10000,
            cps:1000,
            name:"Reto"
        }
    }
};

var deley = 0;
var cps = 0;
function update(){

    if(Cookies.get("clicker") != null && Cookies.get("clicker") != "undefined"){
        var clicker1 = JSON.parse(Cookies.get("clicker"));
        for(i in clicker.upgrades){
            if(clicker1.upgrades[i] == null){
                clicker1.upgrades[i] = clicker.upgrades[i];
            }
        }
        clicker = clicker1
    }
    update_upgrades();
    if(Cookies.get("lasttime") !=null){
        var lastsavedate = Number(Cookies.get("lasttime"));
        lastsavedate = Date.now() - lastsavedate;
        lastsavedate = Math.round(lastsavedate / 1000);
        if(lastsavedate / 60 >= 1){
            clicker.money += lastsavedate * cps / 1.8;
            document.querySelector("#afk").innerHTML += `<br> While you where afk you earned <br> ${numberformat.format(lastsavedate*cps/1.8)} money`;
        }

    }
    setInterval(()=>{
        for(i in clicker.upgrades){
            clicker.money += clicker.upgrades[i].amount*clicker.upgrades[i].cps/20;
        }
    document.getElementById('inGameMoney').innerHTML = numberformat.format(String(clicker.money).split(".")[0])
        deley++
    if(deley >=40){
            Cookies.set("clicker", JSON.stringify(clicker), {expires:10000});
            Cookies.set("lasttime", Date.now(), {expires:10000})
            delay = 0;
        }
},50)
}


function gamebtn(thing) {
    console.log(clicker)
    if(clicker.upgrades[thing].cost <= clicker.money){
        clicker.money -= clicker.upgrades[thing].cost;
        clicker.upgrades[thing].amount++;
        clicker.upgrades[thing].cost += Math.round(clicker.upgrades[thing].cost*0.15);
        update_upgrades();
    }
}

function update_upgrades(){
    document.querySelector("#building").innerHTML="";
    var d = 0;
    for(i in clicker.upgrades){
        document.querySelector("#building").innerHTML += `<button class="btn" onclick="gamebtn('${i}')"> ${clicker.upgrades[i].name}
         </button> Amount: ${clicker.upgrades[i].amount}. Cost: ${numberformat.format(clicker.upgrades[i].cost)}`;
         d += clicker.upgrades[i].cps * clicker.upgrades[i].amount;
    }

    cps = d;
    
    document.querySelector("#cpsmeter").innerHTML = `Cps: ${numberformat.format(cps) }`

}


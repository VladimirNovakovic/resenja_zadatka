/**
 *Vladimir Novakovic
 */
"use strict";
(function(){
    function nadji(data){
        $('#mojaForma').submit(function(){
            var id=$(this).find('#mojSelect').val();
            var broj=0;
            if(typeof(parseInt(id[0]))==="number" && typeof(parseInt(id[1]))==="number") broj=parseInt(id[0]+id[1]);
            else broj=parseInt(id[0]);
            var objectId=data[broj-1];
            var ime=objectId.firstName;
            var prezime=objectId.surname;
            var godina=objectId.age;
            var pol=objectId.gender;
            var prikaz=$('#osoba');
            prikaz.html('');
            prikaz.html('Trazena osoba je:</br>Ime:'+ime+'</br>Prezime:'+prezime+'</br>godina:'+godina+'</br>pol:'+pol);
            var niz=objectId.friends;
            var duzinaNiza=niz.length;
            var dp=$('#direktniPrijatelji');
            var pp=$('#prijateljiPrijatelja');
            dp.html('');
            pp.html('');
            var objectId1;
            var niz1;
            var prp=$('#predloziPrijatelje');
            prp.html('');
            var brojPredlozenihPrijatelja=duzinaNiza;
            var izbroj=0;
            var ajde=0;
            var reci=[];
            var text;
            out:
            for(var i=0;i<duzinaNiza;i++){
                objectId=data[niz[i]-1];
                ime=objectId.firstName;
                prezime=objectId.surname;
                godina=objectId.age;
                pol=objectId.gender;
                dp.append('Direktni prijatelj/i: </br>Ime:'+ime+'</br>Prezime:'+prezime+'</br>godina:'+godina+'</br>pol:'+pol+'</br></br>');
                objectId1=data[niz[i]-1];
                niz1=objectId1.friends;
                var number=0;
                var noviNiz=[];
                var n=0;
                outer:
                for(var j=0;j<niz1.length;j++) {
                    if(broj === niz1[j]) {
                        console.log('ovde skripi');
                        if(j===(niz1.length-1) && i===(duzinaNiza-1)){n=1;}
                        else continue;}
                    for(var o = 0; o < niz.length; o++) {
                        if((niz[o] - 1) != (niz1[j] - 1)){
                        }
                        else {
                            number++;
                            if(number > 0){
                                number = 0;
                                console.log('na pravom si mestu');
                                if(j===(niz1.length-1) && i===(duzinaNiza-1)){
                                    console.log('to majstore');}
                                else
                                continue outer;
                            }
                        }
                    }
                    console.log('pocetak');
                    for(;;)
                    {
                        console.log('tu smo gde treba');
                        reci[izbroj++]=niz1[j]-1;
                        if(j===(niz1.length-1) && i===(duzinaNiza-1)) {
                            console.log('dobro je');break;}
                        else
                        continue outer;
                    }
                    console.log('doslo je');
                    var dobarBroj;
                    for(var a=0;a<izbroj;a++)
                    {
                        if(n===1){izbroj--;n=0;}
                        dobarBroj=0;
                        for(var brojevi=0;brojevi<izbroj;brojevi++)
                        {
                            if(reci[a]===reci[brojevi]) dobarBroj++;
                        }
                        if(dobarBroj===1){}
                        else{reci[a]=-1;}
                    }
                    for(var f=0;f<izbroj;f++)
                    {
                        if(reci[f]===-1) continue;
                        objectId1=data[reci[f]];
                        ime=objectId1.firstName;
                        prezime=objectId1.surname;
                        godina=objectId1.age;
                        pol=objectId1.gender;
                        pp.append('Prijatelj/i prijatelja: </br>Ime:'+ime+'</br>Prezime:'+prezime+'</br>godina:'+godina+'</br>pol:'+pol+'</br></br>');
                    }
                    if(false)
                    {
                        objectId1=data[niz1[j]-1];
                        ime=objectId1.firstName;
                        prezime=objectId1.surname;
                        godina=objectId1.age;
                        pol=objectId1.gender;
                        pp.append('Prijatelj/i prijatelja: </br>Ime:'+ime+'</br>Prezime:'+prezime+'</br>godina:'+godina+'</br>pol:'+pol+'</br></br>');
                    }
                }
            }
            var objectId2;
            var niz2;
            for(var i= 0,o=0;i<data.length;i++){

                if(brojPredlozenihPrijatelja<2) {prp.html('Nema predlozenih prijatelja');break;}
                objectId2=data[i];
                niz2=objectId2.friends;
                if(i===(broj-1)) continue;
                var brojac=0;
                for(var j=0;j<niz.length;j++){
                    for(var t=0;t<niz2.length;t++){
                        if(niz[j]===niz2[t]) {brojac++;}
                        if(brojac>1){
                            ime=objectId2.firstName;
                            prezime=objectId2.surname;
                            godina=objectId2.age;
                            pol=objectId2.gender;
                            prp.append('Predlozi prijatelja/e: </br>Ime:'+ime+'</br>Prezime:'+prezime+'</br>godina:'+godina+'</br>pol:'+pol+'</br></br>');
                            brojac=0;
                        }

                    }
                }
            }
            if(prp.html()==='') prp.html('Nema predlozenih prijatelja');
        });
    }
    $.ajax({
        url:'data.json',
        method:'GET',
        dataType:'json',
        success:function(data){
            nadji(data);
        },
        error:function(data){
            console.log('greska');
        }
    });
}());

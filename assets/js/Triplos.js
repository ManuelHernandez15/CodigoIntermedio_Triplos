const table_tripos = document.getElementById("table-triplos");

// function calcTriplos() {
//     //uwu
//     table_tripos.innerHTML = '<tr><th>Operador</th><th>Arg1</th><th>Arg2</th></tr>'
//     const expresion = String(document.getElementById("expresion").value);
//     let apertura=[]
//     let cerradura=[]
//     let multDiv = []
//     let addSub = []
//     for (let index = 0; index < expresion.length; index++) {
//         if (expresion[index] == '('){
//             apertura.push(index)
//         }
//         else if(expresion[index] == ')'){
//             cerradura.push(index)
//         }
//     }
//     cerradura = cerradura.reverse()
//     console.log(apertura)
//     console.log(cerradura)  
//     // for (let i = 0; i < 10; i++) {
//     //     table_tripos.insertRow(-1).innerHTML = '<td>aa</td><td>bb</td><td>bb</td>'
//     // }

// }
function calcTriplos() {
    //((x-1)+2)*2
    table_tripos.innerHTML = '<tr><th>indice</th><th>Operador</th><th>Arg1</th><th>Arg2</th></tr>';
    const expresion = String(document.getElementById("expresion").value);
    // let expParentesis = new RegExp("(\w)","ig");
    // let xd = expParentesis.exec(expresion);
    // console.log(xd);

    expresion.replace(/[.*+\-?^${}()|[\]\\]/gm, '\\$&');
    let expreg = /([\d.]+)|[-+*/()=]|[a-z]/gm;
    let operaciones = expresion.match(expreg);
    let contp = 0;
    for (let i = 0; i < operaciones.length; i++) {
        if (operaciones[i] == '(') {
            contp++;
        }
    }

    let contA = -1;
    let contC = 0;
    let apertura = new Array(contp);
    let cerradura = new Array(contp);
    console.log(operaciones);
    for (let i = 0; i < operaciones.length; i++) {
        if (operaciones[i] == '(') {
            debugger;
            contA++;
            contC=contA;
            apertura[contA] = i;

        }
        else if (operaciones[i] == ')') {
            debugger;
            cerradura[contC] = i;            
            while(cerradura[contC] != undefined && contC != 0){
                contC--;
            }

        }
    }




    console.log(apertura);
    console.log(cerradura);
    let evaluados = [];
    jerarquia(apertura, cerradura, 0, operaciones.length, operaciones, evaluados, 0, 0);
    // for (let i = 0; i < 10; i++) {
    //     table_tripos.insertRow(-1).innerHTML = '<td>aa</td><td>bb</td><td>bb</td>'
    // }

}

function jerarquia(arrayA, arrayC, inicio, fin, expresion, evaluados, cont_triplos, i_inicio) {
    // for (let i = 0; i < arrayA.length; i++) {
    //     if (inicio < arrayA[i] && arrayC[i] < fin) {
    //         prioridadParentesis(arrayA, arrayC, arrayA[i], arrayC[i])   
    //         break;
    //     }
    // }
    //x=((x-1)+2)*(((2+y)+x)-3)
    let i = i_inicio;
    let it = cont_triplos;
    // let inParentesis = false;
    while (i < arrayA.length) {

        if (inicio <= arrayA[i] && arrayC[i] < fin) {

            //pila = prioridadParentesis(arrayA, arrayC, arrayA[i], arrayC[i], expresion,evaluados);
            let aux = jerarquia(arrayA, arrayC, arrayA[i], arrayC[i], expresion, evaluados, it, i);
            it = aux[0];
            i = aux[1];
            i_inicio = aux[1];
            // inParentesis = true;
        }
        i++;
    }
    debugger;
    for (let i = inicio; i < fin; i++) {
        if (expresion[i] == '/' || expresion[i] == '*') {
            let noEvaluado = true;
            for (let x = 0; x < evaluados.length; x++) {
                if (evaluados[x][0] < i && i < evaluados[x][1]) {
                    noEvaluado = false;
                }
            }
            if (noEvaluado) {
                let arg1 = expresion[i - 1];
                let arg2 = expresion[i + 1];
                let i_arg1 = i - 1;
                let i_arg2 = i + 1;
                for (let index = evaluados.length-1; index >= 0 ; index--) {
                    if (i_arg1 == evaluados[index][1]) {
                        i_arg1 = evaluados[index][0];
                        arg1 = `(${evaluados[index][2]})`;
                    }
                    if (i_arg2 == evaluados[index][0]) {
                        i_arg2 = evaluados[index][1];
                        arg2 = `(${evaluados[index][2]})`;
                    }
                }
                table_tripos.insertRow(-1).innerHTML = `<td>(${it})</td><td>${expresion[i]}</td><td>${arg1}</td><td>${arg2}</td>`;
                evaluados.push([i_arg1, i_arg2, it]);
                it++;
            }
        }
    }
    for (let i = inicio; i < fin; i++) {
        if (expresion[i] == '+' || expresion[i] == '-') {
            let noEvaluado = true;
            for (let x = 0; x < evaluados.length; x++) {
                if (evaluados[x][0] < i && i < evaluados[x][1]) {
                    noEvaluado = false;
                }
            }
            if (noEvaluado) {
                debugger;
                let arg1 = expresion[i - 1];
                let arg2 = expresion[i + 1];
                let i_arg1 = i - 1;
                let i_arg2 = i + 1;
                for (let index = evaluados.length-1; index >= 0 ; index--) {
                    if (i_arg1 == evaluados[index][1]) {
                        i_arg1 = evaluados[index][0];
                        arg1 = `(${evaluados[index][2]})`;
                    }
                    if (i_arg2 == evaluados[index][0]) {
                        i_arg2 = evaluados[index][1];
                        arg2 = `(${evaluados[index][2]})`;
                    }
                }
                table_tripos.insertRow(-1).innerHTML = `<td>(${it})</td><td>${expresion[i]}</td><td>${arg1}</td><td>${arg2}</td>`;
                evaluados.push([i_arg1, i_arg2, it]);
                it++;
            }
        }
    }

    for (let i = inicio; i < fin; i++) {
        if (expresion[i] == '=') {
            table_tripos.insertRow(-1).innerHTML = `<td>(${it})</td><td>${expresion[i]}</td><td>${expresion[i-1]}</td><td>(${it-1})</td>`;
            evaluados.push([i-1, i+1, it]);
            it++;

        }
    }
    
    evaluados.push([inicio, fin, it-1])
    return [it, i_inicio];
}

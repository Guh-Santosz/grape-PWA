let db = null;

function abrirBanco()
{
    const banco = indexedDB.open("DadosPassagens", 1);

   banco.onsuccess = (event) =>
   {
        db = event.target.result;
   }
}

function atualizarSaldos(id, saldo)
{
  
    const transacao = db.transaction("Empresas", "readwrite");
    const store = transacao.objectStore("Empresas");
    const dados = store.get(id);

    dados.onsuccess = (event) =>
    {
        const empresa = dados.result;
        empresa.passagem.saldo = saldo;
        const uptadeRequest = store.put(empresa);
        uptadeRequest.onsuccess = (event) => window.alert(`Saldo da empresa ${empresa.nome} foi alterado com sucesso`);
    }

}

document.getElementById("botaoSOULimeira").onclick = function()
{
    if(!db) 
    {
        window.alert("Aguarde um momento");
        return;
    }

    let numero = document.getElementById("saldoSOULimeira").value.trim();

    if(numero == '' || isNaN(Number(numero))) window.alert("Digite um saldo válido");
    else 
    {
        numero = Number(numero);
        atualizarSaldos(1, numero);
    }
}
document.getElementById("botaoSOUAmericana").onclick = function()
{
    if(!db) 
    {
        window.alert("Aguarde um momento");
        return;
    }

    let numero = document.getElementById("saldoSOUAmericana").value.trim();

    if(numero == '' || isNaN(Number(numero))) window.alert("Digite um saldo válido");
    else 
    {
        numero = Number(numero);
        atualizarSaldos(2, numero);
    }
}
document.getElementById("botaoPiracicabana").onclick = function() 
{
    if(!db) 
    {
        window.alert("Aguarde um momento");
        return;
    }
    
    let numero = document.getElementById("saldoPiracicabana").value.trim();

    if(numero == '' || isNaN(Number(numero))) window.alert("Digite um saldo válido");
    else 
    {
        numero = Number(numero);
        atualizarSaldos(3, numero);
    }
}

window.onload = abrirBanco;
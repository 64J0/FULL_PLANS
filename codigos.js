function mudaEmpresa(valor) {
    let campo = document.getElementById('nomeDaEmpresa');
    console.log('Valor: ' + valor);

    if (valor == 'A') {
        campo.value = 'Empresa A';
    } else if (valor == 'B') {
        campo.value = 'Empresa B';
    } else if (valor == 'C') {
        campo.value = 'Empresa C';
    }
}
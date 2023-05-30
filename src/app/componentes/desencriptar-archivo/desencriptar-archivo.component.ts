import { Component } from '@angular/core';

@Component({
  selector: 'app-desencriptar-archivo',
  templateUrl: './desencriptar-archivo.component.html',
  styleUrls: ['./desencriptar-archivo.component.scss']
})
export class DesencriptarArchivoComponent {
  ArchivoDesencriptado: string = '';
  ClaveLeido: string = '';

  desencriptarArchivo(event: any) {
    const archivoSeleccionado = event.target.files[0];
    const lector = new FileReader();
    lector.onload = (e: any) => {
      this.ArchivoDesencriptado = e.target.result;
      this.desencriptar();
    };
    lector.readAsText(archivoSeleccionado);
  }

  leerClave(event: any) {
    const archivoSeleccionado = event.target.files[0];
    const lector = new FileReader();
    lector.onload = (e: any) => {
      this.ClaveLeido = e.target.result;
    };
    lector.readAsText(archivoSeleccionado);
  }


  desencriptar(){
  const clave = this.ClaveLeido;
  const archivoCifrado = this.ArchivoDesencriptado;
  const arreglo1 = archivoCifrado.split('');
  const arreglo2 = clave.split('');
  const longitudArreglo1 = arreglo1.length;
  const longitudArreglo2 = arreglo2.length;

  let archivoDesencriptado = '';
  if(longitudArreglo1 < longitudArreglo2 ){
    alert("Arreglo 1 menor que el 2");
    return;
  }
  for (let i = 0; i < longitudArreglo1; i++) {
    const indice = i % longitudArreglo2;
    const valorASCII1 = arreglo1[i].charCodeAt(0);
    const valorASCII2 = arreglo2[indice].charCodeAt(0);
    const resultadoXOR = valorASCII1 ^ valorASCII2;
    const caracterDesencriptado = String.fromCharCode(resultadoXOR);
    archivoDesencriptado += caracterDesencriptado;
  }
  console.log(archivoDesencriptado);
  this.guardarArchivoCifrado(archivoDesencriptado)
  return archivoDesencriptado;
}

 

  guardarArchivoCifrado(archivoCifrado: string) {
    const nombreOriginal = 'archivo-original.txt'; // Nombre del archivo original
    const nombreCifrado = nombreOriginal.replace('.txt', '.txt');
    const element = document.createElement('a');
    const file = new Blob([archivoCifrado], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = nombreCifrado;
    if (document.body) {
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }
  
  
}
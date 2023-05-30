import { Component } from '@angular/core';

@Component({
  selector: 'app-leer-archivo',
  templateUrl: './leer-archivo.component.html',
  styleUrls: ['leer-archivo.component.scss']
})
export class LeerArchivoComponent {
  ArchivoLeido: string = "";
  ClaveLeido:string = "";
  NombreArchivoGuardar:string="";

  leerArchivo(event: any) {
    const archivoSeleccionado = event.target.files[0];
    this.NombreArchivoGuardar = archivoSeleccionado.name; 
    const lector = new FileReader();
    lector.onload = (e: any) => {
      this.ArchivoLeido = e.target.result;
      this.encriptar();
    };
    lector.readAsBinaryString(archivoSeleccionado);
  }

  leerClave(event: any) {
    const archivoSeleccionado = event.target.files[0];
    const lector = new FileReader();
    lector.onload = (e: any) => {
      this.ClaveLeido = e.target.result;
    };
    lector.readAsBinaryString(archivoSeleccionado);
  }
  
  
  encriptar() {
    const archivoOriginal = this.ArchivoLeido;
    const clave = this.ClaveLeido;
    const arreglo1 = archivoOriginal.split('');
    const arreglo2 = clave.split('');
    const longitudArreglo1 = arreglo1.length;
    const longitudArreglo2 = arreglo2.length;
    
    let archivoCifrado = '';
    if(longitudArreglo1 < longitudArreglo2 ){
      alert("Arreglo 1 menor que el 2");
      return;
    }
  
    for (let i = 0; i < longitudArreglo1; i++) {
      const indice = i % longitudArreglo2;
      const valorASCII1 = arreglo1[i].charCodeAt(0);
      const valorASCII2 = arreglo2[indice].charCodeAt(0);
      const resultadoXOR = valorASCII1 ^ valorASCII2;
      const caracterCifrado = String.fromCharCode(resultadoXOR);
      archivoCifrado += caracterCifrado;
    }
  
    archivoCifrado;
    this.guardarArchivoCifrado(archivoCifrado);
  }

  guardarArchivoCifrado(archivoCifrado: string) {
    const nombreOriginal = this.NombreArchivoGuardar; // Nombre del archivo original
    const nombreCifrado = nombreOriginal.replace('.txt', '.des');
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(archivoCifrado));
    element.setAttribute('download', nombreCifrado);
    if (document.body) {
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }
  
}

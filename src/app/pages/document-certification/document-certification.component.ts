import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadDocService } from 'src/app/services/upload-doc.service';

@Component({
  selector: 'app-document-certification',
  templateUrl: './document-certification.component.html',
  styleUrls: ['./document-certification.component.css']
})
export class DocumentCertificationComponent implements OnInit{
  showModal = false;
  searchText: string = '';
  filteredDocumentos: any = []; // Almacena los datos filtrados
  public documentos: any = [];
  currentPage:number =1;
  totalDocumentos: number = this.documentos.length;
  constructor( 
      private documentService: UploadDocService,
      private router: Router,
      private route: ActivatedRoute){}
  ngOnInit(): void {
    this.showModal=!this.showModal;
    this.obtenerDocumentos();
  }
  filterTableData() {
      if (this.searchText) {
        // Filtra la tabla solo si hay un término de búsqueda
        this.filteredDocumentos = this.documentos.filter((documento:any) => {
          return documento.rutClient.toLowerCase().includes(this.searchText.toLowerCase());
        });
      } else {
        // Si no hay texto de búsqueda, muestra los datos originales
        this.filteredDocumentos = this.documentos;
      }
  }
  obtenerDocumentos(){
    this.documentService.obtenerDatos().subscribe((data)=>{
      this.documentos = data.filter((documento:any) =>
      documento.state === 'Pendiente Certificación',
    )
    this.showModal = !this.showModal;
    });

  }
  getPaginationClass(page: number): string {
    // Aquí puedes definir la lógica para asignar clases según tu diseño
    // Por ejemplo, puedes tener una lógica para resaltar la página actual
    return `flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition duration-300 ease-in-out ${page === this.currentPage ? 'font-bold' : ''}`;
  }
  cambiarPagina(page: number): void {
    this.currentPage = page;
  }
  idDoc(id:string){
    this.router.navigate(['/document-certification-action',id])
  }
}


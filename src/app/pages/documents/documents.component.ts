import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UploadDocService } from 'src/app/services/upload-doc.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit{
  showModal = false;
  selectedFilter: string ='';
  searchText: string = '';
  filteredDocumentos: any = []; // Almacena los datos filtrados
  public documentos: any = []
  currentPage: number = 1;
  totalDocumentos: number = this.documentos.length;
  searchForm: FormGroup;
  lastDay: string = 'lastDay';
  last7Days: string = 'last7Days';
  last30Days: string = 'last30Days';
  lastMonth: string = 'lastMonth';
  lastYear: string = 'lastYear';  
  constructor( 
      private documentService: UploadDocService,
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder){
        this.searchForm = this.formBuilder.group({
          rutClient: ['']
        });

      }
  ngOnInit(): void {
    this.showModal=!this.showModal;
    this.obtenerDocumentos();
  }


  getPaginationClass(page: number): string {
    // Aquí puedes definir la lógica para asignar clases según tu diseño
    // Por ejemplo, puedes tener una lógica para resaltar la página actual
    return `flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition duration-300 ease-in-out ${page === this.currentPage ? 'font-bold' : ''}`;
  }
  cambiarPagina(page: number): void {
    this.currentPage = page;
  }
  filterTableData() {
    this.searchForm.valueChanges.subscribe(() => {
      this.searchText = this.searchForm.value.rutClient;
      this.filteredDocumentos = this.documentos.filter((documento: any) => {
        return documento.rutClient.toLowerCase().includes(this.searchText.toLowerCase());
      });
    });
  }
  obtenerDocumentos(){
    this.documentService.obtenerDatos().subscribe((data)=>{
      this.documentos = data.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.filteredDocumentos=this.documentos;
      this.showModal = !this.showModal;
    });
  }
  onFilterChange() {
    // Este método se llama cuando cambia el filtro seleccionado
    // Implementa la lógica de filtrado según el filtro seleccionado
    this.filteredDocumentos = this.filterDocumentsByDateRange(this.selectedFilter);
}

filterDocumentsByDateRange(selectedFilter: string): any[] {
    // Implementa la lógica de filtrado según el filtro seleccionado
    // Aquí puedes usar bibliotecas como moment.js para manejar fechas
    // La lógica siguiente es un ejemplo básico, debes adaptarla según tus necesidades

    const currentDate = new Date();
    console.log('Selected Filter:', selectedFilter);
    switch (selectedFilter) {
        case 'lastDay':
            return this.documentos.filter((doc:any) => this.isDateWithinRange(doc.createdAt, currentDate, -1));
        case 'last7Days':
            return this.documentos.filter((doc:any) => this.isDateWithinRange(doc.createdAt, currentDate, -7));
        case 'last30Days':
            return this.documentos.filter((doc:any) => this.isDateWithinRange(doc.createdAt, currentDate, -30));
        // Agrega más casos según sea necesario para otros filtros
        default:
            return this.documentos; // Filtro por defecto, mostrar todos los documentos
    }
}

isDateWithinRange(documentDate: Date, currentDate: Date, daysRange: number): boolean {
    // Método para verificar si una fecha está dentro del rango de días
    const documentDateTime = documentDate.getTime();
    const currentDateWithoutTime = new Date(currentDate.toDateString()).getTime();
    const differenceInDays = Math.floor((currentDateWithoutTime - documentDateTime) / (24 * 60 * 60 * 1000));

    return differenceInDays >= 0 && differenceInDays <= daysRange;
}
  idDoc(id:string){
    this.router.navigate(['/document-detail',id])
  }
}

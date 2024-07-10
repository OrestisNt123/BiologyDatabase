import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneProteinService } from 'src/app/services/gene-protein.service';
import { GeneService } from 'src/app/services/gene.service';
import { PathwayService } from 'src/app/services/pathway.service';
import { ProteinPathwayService } from 'src/app/services/protein-pathway.service';
import { ProteinService } from 'src/app/services/protein.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchForm: FormGroup;
  databases: string[] = ['genes_protein', 'genes', 'pathways', 'protein_pathway', 'proteins'];
  fieldOptions: string[] = [];
  logicalOperators: string[] = ['AND', 'OR', 'NOT'];
  firstFieldOption: string[] = ['', 'NOT'];
  data: any[] = [];
  filteredData: any;

  constructor(
    private fb: FormBuilder,
    private geneService: GeneService, 
    private proteinService: ProteinService, 
    private pathwayService: PathwayService, 
    private geneProteinService: GeneProteinService, 
    private proteinPathwayService: ProteinPathwayService,
  ) {
    this.searchForm = this.fb.group({
      selectedDatabase: ['', Validators.required],
      fields: this.fb.array([this.createFieldGroup(true)])
    });
  }

  ngOnInit(): void {}

  get fields(): FormArray {
    return this.searchForm.get('fields') as FormArray;
  }

  createFieldGroup(firstField: boolean = false): FormGroup {
    const group: any = {
      fieldType: ['', Validators.required],
      fieldValue: ['', Validators.required]
    };
  
    if (firstField){
      group.operator = [''];
    } 
    else {
      group.operator = ['AND'];
    }
  
    return this.fb.group(group);
  }

  addField(): void {
    this.fields.push(this.createFieldGroup());
  }

  removeField(index: number): void {
    this.fields.removeAt(index);
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      const filters = this.searchForm.value.fields;
      if (filters.length === 0) {
        this.filteredData = this.data;
        return;
      }
  
      this.filteredData = this.data.filter(item => {
        let filterPassed = false;
        return filters.every((filter: { fieldType: any; fieldValue: any; operator: any; }, index: number) => {
          let { fieldType, fieldValue, operator } = filter;
  
          if (operator === 'NOT') {
            filterPassed = !this.applyFilter(item, fieldType, fieldValue);
          } else if (index === 0 || !operator) {
            filterPassed = this.applyFilter(item, fieldType, fieldValue);
          } else if (operator === 'AND') {
            filterPassed = filterPassed && this.applyFilter(item, fieldType, fieldValue);
          } else if (operator === 'OR') {
            filterPassed = filterPassed || this.applyFilter(item, fieldType, fieldValue);
          }

          return filterPassed;
        });
      });
    } else {
      console.log('Form is invalid');
    }
  }

  applyFilter(item: any, fieldType: string, fieldValue: string): boolean {
    if (item.hasOwnProperty(fieldType)) {
      let fieldToCheck: any = item[fieldType];
      
      if (fieldType === 'gene' || fieldType === 'protein' || fieldType === 'pathway') {
        if (fieldToCheck.hasOwnProperty('id')) {
          return fieldToCheck.id.toString().includes(fieldValue.toString());
        } else {
          return false;
        }
      } else {
        return fieldToCheck.toString().includes(fieldValue.toString());
      }
    }
    return true;
  }
  

  updateFieldOptionsAndFetchData(): void {
    this.filteredData = [];
    const selectedDatabase = this.searchForm.get('selectedDatabase')?.value;
    const serviceMap: { [key: string]: () => any } = {
      'genes': () => this.geneService.getGenes(),
      'pathways': () => this.pathwayService.getPathway(),
      'proteins': () => this.proteinService.getProteins(),
      'genes_protein': () => this.geneProteinService.getGeneProteins(),
      'protein_pathway': () => this.proteinPathwayService.getProteinPathways()
    };

    if (selectedDatabase && serviceMap[selectedDatabase]) {
      serviceMap[selectedDatabase]().subscribe(
        (data: any) => {
          this.data = data;
          this.fieldOptions = Object.keys(data[0]);
          if (selectedDatabase === 'genes_protein' || selectedDatabase === 'protein_pathway'){
            this.fieldOptions.shift();
          }
        },
        (error: any) => {
          console.error('Error fetching data:', error);
          this.fieldOptions = [];
        }
      );
    } else {
      console.error('No service method found for path:', selectedDatabase);
      this.fieldOptions = [];
    }
  }
}

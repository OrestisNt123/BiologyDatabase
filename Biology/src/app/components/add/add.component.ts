import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Gene, Protein, Pathway, GeneProtein, ProteinPathway } from 'src/app/interfaces';
import { GeneProteinService } from 'src/app/services/gene-protein.service';
import { GeneService } from 'src/app/services/gene.service';
import { PathwayService } from 'src/app/services/pathway.service';
import { ProteinPathwayService } from 'src/app/services/protein-pathway.service';
import { ProteinService } from 'src/app/services/protein.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  
  form!: FormGroup;
  columnData: any;
  previousRoute: string | null = '';
  columns: string[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private geneService: GeneService,
    private proteinService: ProteinService,
    private pathwayService: PathwayService,
    private geneProteinService: GeneProteinService,
    private proteinPathwayService: ProteinPathwayService,
  ) {}

  ngOnInit(): void {
    const state = window.history.state;

    this.columnData = state.columnData;
    this.previousRoute = state.previousRoute;

    this.columns = this.columnData.filter((column: string) => this.shouldIncludeField(column));
    this.createForm();
  }

  createForm(): void {
    const formGroup: any = {};
    this.columns.forEach(column => {
      formGroup[column] = [''];
    });
    this.form = this.fb.group(formGroup);
  }
  
  shouldIncludeField(column: string): boolean {
    if (column.toLowerCase() === 'id') {
      return false;
    }
    if (this.previousRoute === 'genes' || this.previousRoute === 'pathways' || this.previousRoute === 'proteins') {
      if (this.previousRoute === 'proteins'){
        return (column.toLowerCase().includes('gene.id') || (!column.includes('.') && column.toLowerCase() !== 'id'));
      }
      else{
        return !((column.toLowerCase() === 'id') || column.includes('.'));
      }
     
    } else if (this.previousRoute === 'protein-pathways' || this.previousRoute === 'gene-proteins') {
      return column.includes('id.');
    }
    return true; // Include all fields for other routes
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.addRow(formData);
    } else {
      console.error('Form is invalid');
    }
  }

  extractKeysAndValues(obj: any, parentKey = '') {
    for (let key in obj) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.extractKeysAndValues(obj[key], newKey);
      } else {
        if (!this.columns.includes(newKey)) {
          this.columns.push(newKey);
        }
      }
    }
  }

  getInputType(column: string): string {
    const numberFields = ['molecularWeight', 'aminoAcid', 'pathwayId', 'id.proteinId', 'id.geneId', 'id.pathwayId', 'gene.id'];
    return numberFields.includes(column) ? 'number' : 'text';
  }

  addRow(row: any) {
    const serviceMap: { [key: string]: () => any } = {
      'genes': () => this.geneService.addGenes(this.formatGene(row)),
      'pathways': () => this.pathwayService.addPathway(this.formatPathway(row)),
      'proteins': () => this.proteinService.addProtein(this.formatProtein(row)),
      'gene-proteins': () => this.geneProteinService.addGeneProteins(this.formatGeneProtein(row)),
      'protein-pathways': () => this.proteinPathwayService.addProteinPathways(this.formatProteinPathway(row))
    };

    if (this.previousRoute && serviceMap[this.previousRoute]) {
      serviceMap[this.previousRoute]().subscribe(
        (response: any) => {
          console.log('Add successful', response);
          this.router.navigate([this.previousRoute]);
        },
        (error: any) => console.error('Add failed', error)
      );
    } else {
      console.error('No service method found for path:', this.previousRoute);
    }
  }

formatGene(row: any): Gene {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    geneType: row.geneType
  };
}

formatProtein(row: any): Protein {
  return {
    id: row.id,
    name: row.name,
    molecularWeight: parseFloat(row.molecularWeight),  // Ensure molecularWeight is parsed as a number
    aminoAcid: parseInt(row.aminoAcid),
    gene: {
      id: parseInt(row['gene.id']), // Parse gene.id as an integer
      name: '',
      description: '',
      geneType: ''
    }
  };
}

formatPathway(row: any): Pathway {
  return {
    id: row.id,
    name: row.name,
    description: row.description
  };
}
formatGeneProtein(row: any): GeneProtein {
  return {
    id: {
      geneId: row['id.geneId'],
      proteinId: row['id.proteinId']
    },
    gene: {
      id: row['id.geneId'],
      name: row['gene.name'],
      description: row['gene.description'],
      geneType: row['gene.geneType']
    },
    protein: {
      id: row['id.proteinId'],
      name: row['protein.name'],
      molecularWeight: row['protein.molecularWeight'],
      aminoAcid: row['protein.aminoAcid'],
      gene: {
        id: row['id.geneId'],
        name: row['gene.name'],
        description: row['gene.description'],
        geneType: row['gene.geneType']
      }
    }
  };
}

formatProteinPathway(row: any): ProteinPathway {
  return {
    id: {
      proteinId: row['id.proteinId'],
      pathwayId: row['id.pathwayId']
    },
    protein: {
      id: row['id.proteinId'],
      name: row['protein.name'],
      molecularWeight: row['protein.molecularWeight'],
      aminoAcid: row['protein.aminoAcid'],
      gene: {
        id: row['gene.id'],
        name: row['gene.name'],
        description: row['gene.description'],
        geneType: row['gene.geneType']
      }
    },
    pathway: {
      id: row['id.pathwayId'],
      name: row['pathway.name'],
      description: row['pathway.description']
    }
  };
}
}

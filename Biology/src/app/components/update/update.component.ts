import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gene, Protein, Pathway, GeneProtein, ProteinPathway } from 'src/app/interfaces';
import { GeneProteinService } from 'src/app/services/gene-protein.service';
import { GeneService } from 'src/app/services/gene.service';
import { PathwayService } from 'src/app/services/pathway.service';
import { ProteinPathwayService } from 'src/app/services/protein-pathway.service';
import { ProteinService } from 'src/app/services/protein.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  data: any;
  previousRoute: string | null = '';
  columns: string[] = [];
  rows: any[] = [];

  constructor(
    private router: Router,
    private geneService: GeneService, 
    private proteinService: ProteinService, 
    private pathwayService: PathwayService, 
    private geneProteinService: GeneProteinService, 
    private proteinPathwayService: ProteinPathwayService,
  ) {}

  ngOnInit(): void {
    const state = window.history.state;

    this.data = state.rowData;
    this.previousRoute = state.previousRoute;

    this.processData(this.data);

    if (this.previousRoute === 'genes' || this.previousRoute === 'pathways' || this.previousRoute === 'proteins'){
      this.columns.forEach(column => {
        if (column.toLowerCase() === 'id' || column.includes('.')) {
          this.disableColumn(column);
        }
      });
    }

    else if (this.previousRoute === 'protein-pathways' || this.previousRoute === 'gene-proteins'){
      this.columns.forEach(column => {
        if (!column.includes('id.')) {
          this.disableColumn(column);
        }
      });
    }
  }

  disableColumn(column: string): void {
    this.rows.forEach(row => {
      if (row.hasOwnProperty(column)) {
        row[`${column}Disabled`] = true;
      }
    });
  }

  processData(data: any) {
    const dataArray = Array.isArray(data) ? data : [data];
  
    this.rows = [];
    this.columns = [];
  
    dataArray.forEach(item => {
      const row: any = {};
      this.extractKeysAndValues(item, row);
      this.rows.push(row);
    });
  }

  extractKeysAndValues(obj: any, row: any, parentKey = '') {
    for (let key in obj) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.extractKeysAndValues(obj[key], row, newKey);
      } else {
        row[newKey] = obj[key];
        if (!this.columns.includes(newKey)) {
          this.columns.push(newKey);
        }
      }
    }
  }

  updateRow(row: any) {
    const serviceMap: { [key: string]: () => any } = {
      'genes': () => this.geneService.updateGenes(row.id, this.formatGene(row)),
      'pathways': () => this.pathwayService.updatePathway(row.id, this.formatPathway(row)),
      'proteins': () => this.proteinService.updateProtein(row.id, this.formatProtein(row)),
      'gene-proteins': () => this.geneProteinService.updateGeneProteins(
        row["gene.id"], 
        row["protein.id"], 
        this.formatGeneProtein(row)
      ),
      'protein-pathways': () => this.proteinPathwayService.updateProteinPathways(
        row["protein.id"], 
        row["pathway.id"], 
        this.formatProteinPathway(row)
      )
    };

    
    if (this.previousRoute && serviceMap[this.previousRoute]) {
      serviceMap[this.previousRoute]().subscribe(
        (response: any) => {
          console.log('Update successful', response);
          this.router.navigate([this.previousRoute]);
        },
        (error: any) => console.error('Update failed', error)
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
    molecularWeight: row.molecularWeight,
    aminoAcid: row.aminoAcid,
    gene: this.formatGene(row.gene || {})
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

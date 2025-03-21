import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { CountryService } from '../../services/country.service';

interface Country {
  searchFilter: FormControl<string>;
}

@Component({
    selector: 'app-solution4',
    standalone: true,
    imports: [CommonModule, FilterPipe, FormsModule, ReactiveFormsModule, MatInputModule],
    template: `
     <h3>{{ title }}</h3>

     <div class="container">
      <!-- binds the <form> element to a FormGroup instance called filterForm -->
      <!-- As the user types in the input field, the "searchFilter" form control value is updated automatically by Reactive Forms -->
     
      <form [formGroup]="filterForm">
          <input 
            matInput    
            formControlName="searchFilter"        
            type="text"
            class="form-control" 
            placeholder="{{ title }}" />
      </form>

      <ng-container> 
         @for(country of countries$ | async | filter: filterForm.get('searchFilter')?.value | slice:0:5; track country.idd) {
           <div class="todo-item">
              <img src="{{ country.flags.svg }}" alt="Flag of {{ country.name.official }}" class="country-flag" />
              <div class="d-flex align-items-center ms-3">
                <i class="fas fa-search me-2"></i>
                <p class="country-name mb-0">{{ country.name.official }}</p>
              </div>
          </div>
         }
      </ng-container>

    </div>`,
    styles: [`
      .list-container {
        padding: 25px;
      }

      .todo-item {
        padding: 10px;
      }
      .even-todo-item {
        background-color: red;
      }
      .odd-todo-item {
        background-color: lightblue;
      }
  `]
})
export class Solution4Component implements OnInit  {
  title = '4- Pipe + Material + Reactive forms: FormGroup, formControlName (directly bind to specific input element within the template) + .get() + takeUntilDestroyed';
  countries$!: Observable<any[]> | undefined;
  filterFormSubscription?: Subscription = new Subscription(); 

  countryService = inject(CountryService);
  private destroyRef = inject(DestroyRef);
  
  // Direct Instantiation Approach: Connect filter form value changes to searchFilter
  filterForm: FormGroup = new FormGroup<Country>({
      searchFilter: new FormControl<string>('', { nonNullable: true })
  });
     
  ngOnInit() {
    this.filterFormSubscription = this.filterForm.get('searchFilter')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        return this.countryService.searchCountries(searchTerm);
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((filteredData) => {
      this.countries$ = of(filteredData);
    });
  }

}

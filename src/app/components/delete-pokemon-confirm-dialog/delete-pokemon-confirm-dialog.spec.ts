import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePokemonConfirmDialog } from './delete-pokemon-confirm-dialog';

describe('DeletePokemonConfirmDialog', () => {
  let component: DeletePokemonConfirmDialog;
  let fixture: ComponentFixture<DeletePokemonConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePokemonConfirmDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePokemonConfirmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

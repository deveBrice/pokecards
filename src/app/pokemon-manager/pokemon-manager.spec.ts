import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonManager } from './pokemon-manager';

describe('PokemonManager', () => {
  let component: PokemonManager;
  let fixture: ComponentFixture<PokemonManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

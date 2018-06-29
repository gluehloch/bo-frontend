/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { Login } from './authentication/authentication.service';
import { USERROLE } from './user-role.enum';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppModule,
        AppComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));

  it('class authentication is accessible', async(() => {
    const froschAuthentication = { nickname: 'Frosch', password: 'password' };
    expect(froschAuthentication.nickname).toEqual('Frosch');
    expect(froschAuthentication.password).toEqual('password');
    expect("Frosch").toEqual("Frosch");
  }));
});

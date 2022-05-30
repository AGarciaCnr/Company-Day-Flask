import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss']
})
export class CtaComponent implements OnInit {

  constructor(private router: Router) {
  }
  buttonDisabled_empresa: boolean;
  buttonDisabled_alumnos: boolean;

  ngOnInit() {
    var type_user = localStorage.getItem("Type");
    this.buttonDisabled_empresa = false;
    this.buttonDisabled_alumnos = false;
    if (type_user == "Empresa")
      this.buttonDisabled_empresa = true;
    if (type_user == "Alumnos")
      this.buttonDisabled_alumnos = true;
    
  }
  
  signUpEmpresa() {
  }
  signUpStudent() {
    this.router.navigate(['/SignUp']);
  }
}

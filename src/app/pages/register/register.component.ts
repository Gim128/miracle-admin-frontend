import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientApiService} from '../../api-services';
import {GuardService} from '../../app-core-module/services';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register-cmp',
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  public regForm: FormGroup;
  public submitted = false;


  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

  constructor(
    private clientApiSev: ClientApiService, private toastr: ToastrService, private router: Router,
    private guardSev: GuardService, private fb: FormBuilder
  ) {}

  ngOnInit() {
      this.initForm();
      /*this.chartColor = '#FFFFFF';

      this.canvas = document.getElementById('chartHours');
      this.ctx = this.canvas.getContext('2d');

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {},
        options: {}
      });


      this.canvas = document.getElementById('chartEmail');
      this.ctx = this.canvas.getContext('2d');
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: [1, 2, 3],
          datasets: [{
            label: 'Emails',
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#e3e3e3',
              '#4acccd',
              '#fcc468',
              '#ef8157'
            ],
            borderWidth: 0,
            data: [342, 480, 530, 120]
          }]
        },

        options: {

          legend: {
            display: false
          },

          pieceLabel: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: 'transparent',
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: 'transparent'
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
      });

      var speedCanvas = document.getElementById('speedChart');

      var dataFirst = {
        data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      var dataSecond = {
        data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
        fill: false,
        borderColor: '#51CACF',
        backgroundColor: 'transparent',
        pointBorderColor: '#51CACF',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var speedData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [dataFirst, dataSecond]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });*/
    }

  initForm() {
    this.regForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      userName: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      department: [''],
    });
  }

  regUser(form: FormGroup) {
    console.log('Email', form.value.email);
    if (this.regForm.valid) {
      this.submitted = true;
      this.clientApiSev
        .customerRegister(form || {})
        .then((data: any) => {
          console.log(data);
          this.submitted = false;
          this.regForm.reset();
          this.toastr.success('Registered Successfully', '', {});
          this.guardSev.authorized(data || {});
          this.router.navigate(['login']);
        })
        .catch((error: any) => {
          console.log(error);
          this.submitted = false;
        });
    } else {
      this.validateAllFormFields(this.regForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
